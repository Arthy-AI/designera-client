import {useRouter} from "next/router";
import Head from "next/head";
import React, {DependencyList, useEffect, useRef, useState} from "react";
import {authGlobalInitiate} from "../../globals/auth/functions/authGlobalInitiate";
import {useAuthGlobalDispatch} from "../../globals/auth/authHooks";
import useAuth from "../../hooks/auth/useAuth";
import {SampleProfileGalleryImages} from "../../components/images/gallery/SampleProfileGalleryImages";
import {DesigneraTitleLarge} from "../../assets/svg/DesigneraTitleLarge";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faCircleDown, faHeart, faSearch, faWandMagicSparkles} from "@fortawesome/free-solid-svg-icons";
import {Header} from "../../components/header/Header";
import ReactCrop, {centerCrop, convertToPixelCrop, type Crop, makeAspectCrop, PixelCrop} from 'react-image-crop'
import {useAxios} from "../../hooks/useAxios";
import toast, {Toaster} from "react-hot-toast";
import Gallery from "react-photo-gallery";
import {Tooltip as ReactTooltip} from "react-tooltip";
import {GetMeta} from "../../constants/GetMeta";

const TO_RADIANS = Math.PI / 180

export default function ItemSearch() {
  const router = useRouter()
  const dispatch = useAuthGlobalDispatch()
  const {userData} = useAuth()
  const {POST} = useAxios()
  const [profileGalleryTab, setProfileGalleryTab] = useState({
    tab: "Images",
    trigger: Date.now()
  })
  const [selectedPhoto, setSelectedPhoto] = useState({} as any);
  const [results, setResults] = useState([] as any);
  const [images, setImages] = useState([] as any);
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [boundingBoxes, setBoundingBoxes] = useState([] as any);
  const [currentDimensions, setCurrentDimensions] = useState({} as { width: number, height: number });

  const [isSearching, setIsSearching] = useState<boolean>(false)

  useEffect(() => {
    let tempProfileGalleryTab = profileGalleryTab
    tempProfileGalleryTab.trigger = Date.now()
    setProfileGalleryTab({...tempProfileGalleryTab})
  }, [userData]);

  useEffect(() => {
    if (!localStorage.getItem('token')) router.push("/")
    dispatch(authGlobalInitiate({}))
  }, []);

  useEffect(() => {
    async function formatImages() {
      let data = []
      for await (let image of images) {
        let photo = await GetMeta(image.thumbnail) as HTMLImageElement
        data.push({
          src: image.thumbnail,
          width: photo.width,
          height: photo.height,
          data: {
            ...image
          }
        })
      }

      setResults([...data])
    }

    formatImages()
  }, [images])

  function changeTab(tab: string) {
    let tempProfileGalleryTab = profileGalleryTab
    tempProfileGalleryTab.tab = tab
    setProfileGalleryTab({...tempProfileGalleryTab})
  }

  function selectPhoto(photo: any) {
    setSelectedPhoto(photo)
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  async function imageSearch() {
    if (!previewCanvasRef.current) {
      toast.error('Crop canvas does not exist.')
    }

    previewCanvasRef.current?.toBlob(async (blob) => {
      if (!blob) {
        throw new Error('Failed to create blob')
      }

      let formData = new FormData()
      formData.append("file", blob)

      setIsSearching(true)
      const data = await POST("image/search-item", formData)
      setImages(data)
      setIsSearching(false)
    })
  }

  async function detectObjects() {
    const labels = await POST(`image/detect-labels/${selectedPhoto.data.id}`, {})

    let data = [] as any;

    for await (let item of labels as any[]) {
      let dataObject = {
        name: item.name,
        boundingBox: {} as any
      }

      Object.keys(item.boundingBox).forEach((key, i) => {
        dataObject.boundingBox[key] = ["top", "height"].includes(key) ? imgRef.current?.height as number * item.boundingBox[key] : imgRef.current?.width as number * item.boundingBox[key]
      })

      data.push(dataObject)
    }

    setBoundingBoxes(data.sort(
      (a: any, b: any) => ((
        (b.boundingBox["height"] * b.boundingBox["width"]) -
        (a.boundingBox["height"] * a.boundingBox["width"])
      ))
    ).map((v: any, index: number) => {
      v.zIndex = index
      return v;
    }))
  }

  useEffect(() => {
    if (Object.keys(selectedPhoto).length < 1) return;

    async function photoSelection() {
      await new Promise((r) => setTimeout(r, 500))
      setCurrentDimensions({
        height: imgRef.current?.height as number,
        width: imgRef.current?.width as number
      })

      let data = [] as any

      for await (let item of selectedPhoto.data.detectedItems) {
        let dataObject = {
          name: item.name,
          boundingBox: {} as any
        }

        Object.keys(item.boundingBox).forEach((key, i) => {
          dataObject.boundingBox[key] = ["top", "height"].includes(key) ? imgRef.current?.height as number * item.boundingBox[key] : imgRef.current?.width as number * item.boundingBox[key]
        })

        data.push(dataObject)
      }

      setBoundingBoxes(data.sort(
        (a: any, b: any) => ((
          (b.boundingBox["height"] * b.boundingBox["width"]) -
          (a.boundingBox["height"] * a.boundingBox["width"])
        ))
      ).map((v: any, index: number) => {
        v.zIndex = index
        return v;
      }))
    }

    photoSelection()
  }, [selectedPhoto])

  useEffect(() => {
    //for debug
    console.log(results[0]?.data)
  }, [results]);

  return (
    <main className="flex flex-col bg-[#212121] overflow-hidden" id={"CheckoutPage"}>
      <Head>
        <title>Designera | Create AI-Powered Design Ideas in Seconds</title>
        <meta name="description"
              content="Experience AI-generated personalized design ideas for any room. Explore unique home decor inspirations in seconds, and effortlessly create the dream space tailored to you."/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://designera.app/"/>
        <meta property="og:title"
              content="Designera | Create AI-Powered Design Ideas in Seconds"/>
        <meta property="og:description"
              content="Experience AI-generated personalized design ideas for any room. Explore unique home decor inspirations in seconds, and effortlessly create the dream space tailored to you."/>
        <meta property="og:image"
              content="/assets/site/icon.png"></meta>
        <link rel="shortcut icon" href="/assets/site/favicon.ico"/>
        <meta name="theme-color" content="#FF9900"/>
      </Head>

      <div className={"flex flex-col min-h-screen"}>
        <div className={"h-24 flex flex-col justify-end"}>
          <Header/>
          <div className={"flex w-full h-1/2 px-4"}>
            <div className={"w-5/12 h-full flex items-center justify-start"}>
              <div
                className={"group flex flex-row gap-2 items-center cursor-pointer"}
                onClick={() => {
                  router.push("/")
                }}>
                <button className={"bg-transparent block"}>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    color={"#AAA7A5"}
                    size={"xl"}
                    style={{width: 20, height: 20}}/>
                </button>
                <h1
                  className={"select-none text-[#AAA7A5] opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-150"}>Back</h1>
              </div>
            </div>
            <div className={"w-7/12 h-full flex justify-center items-center"}>
              <h1 className={"select-none text-[#AAA7A5]"}>Results</h1>
            </div>
          </div>
        </div>
        <div className={"flex"}>
          <div className={"flex w-5/12 p-5"}>
            <div
              className={"w-full flex flex-col gap-2 h-full bg-[#212121] designera-rounded border border-black text-white overflow-hidden"}>
              <div className={"h-fit flex flex-col p-3"}>
                <div className={"flex justify-between pb-4"}>
                  <div className={"flex items-center justify-between text-[#979797] gap-1"}><DesigneraTitleLarge/><span
                    className={"mb-1"}>Search</span></div>
                  <div className={"flex gap-2"}>
                    {
                      Object.keys(selectedPhoto).length > 0 && !selectedPhoto?.data?.hasDetectedLabels &&
                        <button onClick={() => detectObjects()} className={"p-2 bg-[#5D5D5D] rounded-full text-sm"}>
                            Detect Objects
                        </button>
                    }
                    <button onClick={() => imageSearch()}
                            className={"p-2 bg-[#5D5D5D] rounded-full flex justify-center items-center"}>
                      <FontAwesomeIcon icon={faSearch} color={"#D9D9D9"}
                                       style={{
                                         width: 20,
                                         height: 20,
                                         color: "#D9D9D9"
                                       }}/>
                    </button>
                  </div>
                </div>
                <div
                  className={"flex justify-center items-center bg-stone-600 designera-rounded-2"}
                  style={{
                    minHeight: 425
                  }}
                >
                  {selectedPhoto?.src &&
                      <ReactCrop
                          crop={crop}
                          maxWidth={500}
                          maxHeight={500}
                          minHeight={40}
                          minWidth={40}
                          onChange={(_, percentCrop) => setCrop(_)}
                          onComplete={(c) => setCompletedCrop(c)}
                      >
                          <div>
                              <div className={"absolute select-none"} style={{
                                width: currentDimensions.width,
                                height: currentDimensions.height,
                              }}>{
                                boundingBoxes.map((v: any, i: number) => {
                                  console.log(v)
                                  return (
                                    <>
                                      <ReactTooltip
                                        anchorId={String(i)}
                                        place="top"
                                        content={v.name}
                                        delayShow={500}
                                      />
                                      <div
                                        id={String(i)}
                                        key={i}
                                        className={"absolute"}
                                        style={{
                                          top: v.boundingBox.top,
                                          left: v.boundingBox.left,
                                          height: v.boundingBox.height,
                                          width: v.boundingBox.width,
                                          zIndex: v.zIndex,
                                          border: `2px solid ${v.zIndex % 2 == 0 ? "cyan" : "#FF9900"}`,
                                          borderRadius: 5,
                                          cursor: "pointer"
                                        }}
                                      >
                                      </div>
                                    </>
                                  )
                                })
                              }</div>
                              <img crossOrigin="anonymous" ref={imgRef} className={"block object-cover"}
                                   src={selectedPhoto?.src} alt={"cropImage"}/>
                          </div>
                      </ReactCrop>
                  }
                  {Object.keys(selectedPhoto).length < 1 && "Select an Image"}
                </div>
              </div>
              <div className={"h-1/2 pt-5 designera-rounded overflow-y-scroll"} style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)"
              }}>
                <div className={"flex flex-row justify-center items-center gap-2"}>
                                            <span className={"cursor-pointer font-semibold"}
                                                  style={{color: profileGalleryTab.tab == "Images" ? "white" : "#333333"}}
                                                  onClick={() => {
                                                    changeTab("Images")
                                                  }}>
                                                Images
                                            </span>
                  <span className={"cursor-pointer font-semibold"}
                        style={{color: profileGalleryTab.tab == "Likes" ? "white" : "#333333"}}
                        onClick={() => {
                          changeTab("Likes")
                        }}>
                                                Likes
                                            </span>
                  <span className={"cursor-pointer font-semibold"}
                        style={{color: profileGalleryTab.tab == "Publishes" ? "white" : "#333333"}}
                        onClick={() => {
                          changeTab("Publishes")
                        }}>
                                                Publishes
                                            </span>
                </div>
                <hr className={"bg-stone-400 border-none h-px"}/>
                <div className={"flex flex-row flex-wrap p-5 gap-6 justify-center"}>
                  <SampleProfileGalleryImages tab={profileGalleryTab.tab} trigger={profileGalleryTab.trigger} large
                                              onClick={selectPhoto}/>
                </div>
              </div>
            </div>
          </div>
          <div className={"w-7/12 min-h-screen p-5"}>
            {isSearching && (
                <div className={'animate-pulse w-full h-screen grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4'}>
                  {[...Array(10).keys()].map(() =>(
                      <div className={'w-full h-full bg-gray-200 rounded-xl'}></div>
                  ))}
                </div>
            )}
            {results.length &&
                <Gallery
                    photos={results.length ? results : null} direction={"column"} margin={5}
                    renderImage={({index, left, top, photo}) => {
                      return <div
                        onClick={() => {
                          console.log(photo.src)
                          window.open(results[index].data.link, '_blank');
                        }}
                        className={"cursor-pointer group/bg"}
                        key={index}
                        style={{
                          position: "absolute",
                          left: left,
                          top: top,
                          borderRadius: "10px",
                          overflow: "hidden",
                          height: photo.height,
                          width: photo.width
                        }}>
                        <div className={'w-full h-[80%]'}>
                          <img src={photo.src} className={'w-full h-full object-cover transition-transform group-hover/bg:scale-110 duration-500'} alt={results[index].data.title} />
                        </div>
                        {
                          results[index].data.price && (
                              <div className={'absolute top-5 left-5 rounded-xl bg-black group/price hover:bg-white transition-colors duration-300'}>
                                <h6 className={'text-white transition-colors duration-300 group-hover/price:text-black py-1 px-2'}>{results[index].data?.price.value}</h6>
                              </div>
                          )
                        }
                        <div className={'flex flex-row items-center w-full min-h-[20%] bg-white absolute bottom-0 border-t-[1px] border-t-gray-800'}>
                          <img src={results[index].data?.source_icon ?? ''} className={'w-10 h-10 mx-5'} />
                          <h6 className={"text-center line-clamp-2"}>{results[index].data.title}</h6>
                        </div>
                      </div>
                    }}
                />
            }
          </div>
        </div>
      </div>

      <Toaster containerStyle={{zIndex: 999999}} toastOptions={{style: {backgroundColor: "#2b2b2b", color: "#fff"}}}/>

      <div className={"h-0 w-0"}>
        <canvas
          ref={previewCanvasRef}
          style={{
            border: '1px solid black',
            objectFit: 'contain',
            width: completedCrop?.width,
            height: completedCrop?.height,
          }}
        />
      </div>
    </main>
  );
}

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList,
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps as any)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}

export async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0,
) {
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height

  const pixelRatio = window.devicePixelRatio

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  const rotateRads = rotate * TO_RADIANS
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY)
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY)
  // 3) Rotate around the origin
  ctx.rotate(rotateRads)
  // 2) Scale the image
  ctx.scale(scale, scale)
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY)
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  )

  ctx.restore()
}
