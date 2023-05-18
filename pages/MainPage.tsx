import React, {useCallback, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faArrowUpRightFromSquare,
  faCopy,
  faDownload,
  faHeart,
  faPaperPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {Tooltip as ReactTooltip} from "react-tooltip";

import {Heading} from "../components/heading/Heading";
import {Small} from "../components/text/small/Small";
import {SimpleButton} from "../components/button/SimpleButton";
import {Content} from "../components/layout/StandardLayout/Content";
import {SimpleInput} from "../components/input/SimpleInput";
import {StandardLayout} from "../components/layout/StandardLayout/StandardLayout";
import {MutedSmall} from "../components/text/small/MutedSmall";
import {RadioButtons} from "../components/input/RadioButtons";
import {SubHeading} from "../components/heading/SubHeading";
import {SideMenu} from "../components/layout/StandardLayout/SideMenu";
import {FileInputArea} from "../components/input/FileInputArea";
import {SampleRecentGalleryImages} from "../components/images/gallery/SampleRecentGalleryImages";
import {AnimatedSimpleInput} from "../components/input/AnimatedSimpleInput";
import {Header} from "../components/header/Header";
import {AuthModal} from "../components/login-register/AuthModal";
import {SampleCommunityGalleryImages} from "../components/images/gallery/SampleCommunityGalleryImages";
import {IconButton} from "../components/button/IconButton";
import Carousel, {Modal, ModalGateway} from "react-images";
import {GeneratedImageModalFooter} from "../components/images/gallery/GeneratedImageModalFooter";
import {useAxios} from "../hooks/useAxios";
import useAuth from "../hooks/auth/useAuth";
import toast, {Toaster} from "react-hot-toast";
import {useAuthGlobalDispatch} from "../globals/auth/authHooks";
import {authGlobalInitiate} from "../globals/auth/functions/authGlobalInitiate";
import {StyleSuggestionPills} from "../constants/StyleSuggestionPills";
import {ShuffleArray} from "../constants/ShuffleArray";
import {DynamicObject} from "../constants/DynamicObject";
import {GetBase64} from "../constants/GetBase64";
import {ImageWithFallback} from "../components/images/ImageWithFallback";
import {ForceDownload} from "../constants/ForceDownload";
import {imagesGlobal, imagesGlobalStore} from "../globals/images/images";
import useAsTheme from "../hooks/themes/useAsTheme";
import {UseAsThemeFlatLogo} from "../assets/svg/UseAsThemeFlatLogo";
import {SubscriptionModal} from "../components/subscription/SubscriptionModal";
import useSubscription from "../hooks/subscription/useSubscription";

export default function MainPage() {
  const {GET, FILEPOST, POST, PATCH} = useAxios()
  const {userData, decrementCreditBalance, isLoggedIn, toggleModal, changeSection} = useAuth()
  const {themes, addImage, removeImage} = useAsTheme()
  const { toggleModal: subscriptionToggleModal } = useSubscription()
  const [galleryOrderBy, setGalleryOrderBy] = useState(0);
  const [themeSelectToggle, setThemeSelectToggle] = useState(false);
  const [loaderShow, setLoaderShow] = useState(false);
  const [resulted, setResulted] = useState(false);
  const [resultData, setResultData] = useState({} as DynamicObject);
  const [selectedResult, setSelectedResult] = useState({} as { url: string, id: string, index: number });
  const [showStyleSuggestionPills, setShowStyleSuggestionPills] = useState(false);
  const [roomType, setRoomType] = useState("")
  const [roomStyle, setRoomStyle] = useState("")
  const [publishDescription, setPublishDescription] = useState("")
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageObject, setSelectedImageObject] = useState({} as DynamicObject);
  const [publisheds, setPublisheds] = useState([] as String[]);

  const [styleSuggestionPills, setStyleSuggestionPills] = useState(StyleSuggestionPills);

  const dispatch = useAuthGlobalDispatch()

  // IMAGE FILTER
  const [images, setImages] = useState([] as any[]);
  const [recentImages, setRecentImages] = useState([] as any[]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [search, setSearch] = useState("");
  const [searchTemp, setSearchTemp] = useState("");
  const [paginationData, setPaginationData] = useState({
    query: null,
    pageIndex: 0,
    pageSize: 20,
    orderBy: galleryOrderBy == 0 ? 'upvoteCount' : 'createdAt'
  });

  useEffect(() => {
    setImages([])

    let tempPaginationData = paginationData;
    tempPaginationData.pageIndex = 0
    tempPaginationData.query = search as any || null
    setPaginationData({...tempPaginationData})
  }, [search]);

  useEffect(() => {
    setImages([])

    let tempPaginationData = paginationData;
    tempPaginationData.orderBy = galleryOrderBy == 0 ? 'upvoteCount' : 'createdAt'
    setPaginationData({...tempPaginationData})
  }, [galleryOrderBy]);


  useEffect(() => {
    async function fetchImages() {
      setLoadingImages(true)
      let recentImagesResponse = await GET("image/filter", { query: null, pageIndex: 0, pageSize: 6, orderBy: "createdAt" })
      setRecentImages(recentImagesResponse.items)

      let data = await GET("image/filter", paginationData)
      let newImages = [...(images), ...(data.items)]
      setImages([...newImages])
      setLoadingImages(false)
    }

    fetchImages()
  }, [paginationData]);

  useEffect(() => {
    dispatch(authGlobalInitiate({}))
    setStyleSuggestionPills(ShuffleArray(styleSuggestionPills))
  }, []);

  useEffect(() => {
    if (userData?.token) {
      dispatch(authGlobalInitiate({}))
    }
  }, [userData])

  async function renderProcess(createVariants: boolean = false) {
    setResulted(false)
    setLoaderShow(true)

    let generateImageFormData = new FormData();
    generateImageFormData.append("file", selectedImageObject as File)
    generateImageFormData.append("roomType", roomType)
    generateImageFormData.append("roomStyle", `${roomStyle}, ${themes.map((v) => v.style).join(", ")}`)

    if (createVariants) {
      generateImageFormData.append("imageId", selectedResult.id || resultData.id)
    }

    let response = await FILEPOST((userData?.subscription?.isActive) ? "generate-image/premium" : "generate-image", generateImageFormData)

    decrementCreditBalance()

    // let response = {
    //   "referenceId": "865ffaf0-a99b-a286-18da-fc9a3aba12e2",
    //   "images": ["5ca5c320-3107-4557-a2d9-869f275d8438", "65b2f26a-5230-40ab-9058-102c5c16ac23", "ade28c9b-aaba-4e31-9b55-32e5af9f9711", "0b1db891-40ee-49c1-b8d7-e07eed28201d"]
    // } as any

    setResultData(response)

    imagesGlobalStore.dispatch(imagesGlobal.actions.changeGeneratedImages({
      images: [...
        response.id ?
          [{src: `https://cdn.designera.app/generated/${response.id}`, id: response.id, style: roomStyle}] :
          response.images ? response.images.map((v: any) => {
            return {src: `https://cdn.designera.app/generated/${v}`, id: v, style: roomStyle}
          }) : []
      ]
    }))

    if (response.images) {
      setSelectedResult({
        id: response.images[0],
        url: "https://cdn.designera.app/generated/" + response.images[0],
        index: 1
      })
    } else {
      setSelectedResult({
        id: response.id,
        url: "https://cdn.designera.app/generated/" + response.id,
        index: 1
      })
    }

    setLoaderShow(false)
    setResulted(true)
  }

  // MODAL
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  // @ts-ignore
  const openLightbox = useCallback((event, {photo, index}) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  async function selectImage(files: FileList | undefined) {
    if (files) {
      let photo = await GetBase64(files[0])
      setSelectedImageObject(files[0])
      setSelectedImage(photo)
    }
  }

  function switchImage(id: string, e: React.MouseEvent<HTMLDivElement>, index: number) {
    setSelectedResult({
      id: id,
      url: (e.target as DynamicObject)["data-loaded-src"],
      index: (e.target as DynamicObject)["data-loaded-src"].includes('reference') ? 0 : index - 1
    })
  }

  async function publish() {
    try {
      const response = await POST('image/publish', {
        "id": selectedResult.id,
        "description": publishDescription
      })

      toast.success("Successfuly published.")
      setPublisheds([...publisheds, selectedResult.id])
    } catch (err) {
      toast.error("Can not publish.")
    }
  }

  async function vote(isLike: boolean) {
    try {
      const response = await PATCH('image/vote', {
        "id": selectedResult.id,
        "type": Number(isLike)
      })

      toast.success("Vote successful.")
    } catch (err) {
      toast.error("Can not vote.")
    }
  }

  async function upscale() {
    setLoaderShow(true)
    setResulted(false)
    setResultData({})

    try {
      const response = await POST('generate-image/upscale-images', {
        "images": [
          selectedResult.id
        ]
      })

      setResultData(response[0])
      setResulted(true)
      setLoaderShow(false)
      toast.success("Upscale successful.")
    } catch (err) {
      toast.error("Can not upscale.")
    }
  }

  function closeLB() {
    closeLightbox()
  }

  return (
    <main className="flex flex-col" id={"MainPage"}>
      <Header/>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-4/5 flex flex-col items-center">
          <Heading>
            <div className={"hidden md:block mb-6"}>Design your <span className="text-[#FF9900]">own</span> interior in{" "}
            seconds</div>
          </Heading>
          <div className="w-full">
            <StandardLayout>
              <SideMenu>
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <SubHeading>Your Current Space</SubHeading>
                    <FileInputArea
                      body=
                        {
                          selectedImage ?
                            <img src={selectedImage} alt={"Chosen Image"}
                                 style={{objectFit: "contain"}}
                                 width={"480"}/> :
                            <span
                              className="text-xs text-white text-center block designera-text-shadow lg:text-md"
                            >
                              Drop your image, Tap to select or
                              <br/>
                              Take a photo!
                            </span>
                        }

                      onValueChange={(files) => selectImage(files)}
                      id={"fileupload1"}
                    />
                    <Small>
                      Make sure it shows the entire room in a 90° straight
                      angle facing walls, not from a corner or angled.
                      Ultra-wide angle lenses not recommended.
                    </Small>
                    <SimpleInput
                      labelText={"Room Type"}
                      labelTagShow={false}
                      className={"placeholder-white"}
                      value={roomType}
                      onValueChange={(e) => {
                        setRoomType(e)
                      }}
                    />
                    <MutedSmall>
                      *Please indicate what type of room you want to design
                      here. To get the best result, present and indicated room
                      types must be the same
                    </MutedSmall>
                    <div className="flex flex-row justify-between">
                      <SimpleInput labelText={"Style"} labelTagShow={false} value={roomStyle} onValueChange={(e) => {
                        setRoomStyle(e)
                      }}
                                   onFocus={() => {
                                     setShowStyleSuggestionPills(true)
                                   }}
                                   className={"placeholder-white"}/>
                      <button
                        className="bg-[#3E3E3E] text-stone-400 p-2.5 font-semibold hover:text-white border border-stone-500 designera-rounded ml-2 flex items-center justify-center"
                        style={{height: 42, width: 42}}
                        onClick={() => {
                          setThemeSelectToggle(!themeSelectToggle);
                        }}
                      >
                        <UseAsThemeFlatLogo/>
                      </button>
                    </div>
                    {themeSelectToggle ? (
                      <div className="flex flex-row justify-between my-2 gap-3 px-2">
                        {[themes[0] || undefined, themes[1] || undefined, themes[2] || undefined].map((v, i) => {
                          return (
                            v?.url ? (
                              <div
                                key={i}
                                onClick={(e) => {
                                  removeImage(i)
                                }}
                                className="w-1/3 h-24 bg-transparent designera-rounded cursor-pointer"
                                style={{ backgroundImage: `url("https://cdn.designera.app/generated/${v.url}")`, backgroundSize: "cover", backgroundPosition: 'center' }}
                              >
                              </div>
                            ) : (
                              <div
                                key={i}
                                onClick={(e) => {
                                }}
                                className="w-1/3 flex items-center text-center bg-stone-600 h-24 designera-rounded cursor-not-allowed justify-center">
                                <FontAwesomeIcon icon={faPlus} color={"#AAA7A5"}
                                                 style={{
                                                   width: 50,
                                                   height: 50,
                                                   color: "#AAA7A5"
                                                 }}/>
                              </div>
                            )
                          )
                        })}
                      </div>
                    ) : (
                      <div>
                        <div id="StyleDescription" className={"h-28 flex justify-center"}>
                          {
                            !showStyleSuggestionPills ?
                              <MutedSmall>
                                *Please describe what theme you want tour space to
                                be designed of. You can be creative. General terms
                                are advised.
                              </MutedSmall>
                              :
                              <div
                                id="keywords"
                                className="flex flex-row flex-wrap gap-x-1.5 gap-y-1 max-w-full my-2 h-24 items-center justify-center font-thin"
                              >
                                {styleSuggestionPills.map((v, i) => {
                                  return (
                                    <div key={i}>
                                      <div id={`suggestion-${i}`}
                                           className="bg-[#515151] rounded px-1 text-stone-100 designera-box-shadow cursor-pointer Font-ExtraLight select-none"
                                           style={{ fontSize: "0.850rem" }}
                                           onClick={(e) => {
                                             setRoomStyle(roomStyle.length > 0 ? roomStyle + ", " + v.name : v.name)
                                           }}
                                      >
                                        {v.name}
                                      </div>
                                      <ReactTooltip
                                        anchorId={`suggestion-${i}`}
                                        place="bottom"
                                        content={v.description}
                                      />
                                    </div>
                                  )
                                })}
                              </div>
                          }
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {isLoggedIn ?
                      (
                        <div className={"flex flex-row gap-3"}>
                          {!userData.subscription &&
                              <div
                                  className={"flex flex-row bg-stone-700 text-white designera-rounded designera-box-shadow items-center justify-center gap-2 p-2 h-16 w-fit"}>
                                  <div
                                      className="flex justify-center items-center font-bold text-4xl select-none">
                                      <span
                                          className={"h-max"}>{userData?.credits ? userData?.credits[0].balance : 0}</span>
                                  </div>
                                  <div
                                      className="flex justify-center items-center text-sm pt-1 leading-4 text-xs font-thin select-none">Credits<br/>Available
                                  </div>
                              </div>
                          }
                          <div className={"w-full"}>
                            <SimpleButton
                              disabled={!selectedImage || !selectedImageObject || !(roomType.length > 2 && roomType.length < 1024) || !(roomStyle.length > 2 && roomStyle.length < 1024)}
                              text={"Run Designera"}
                              type={"primary"}
                              onClick={(e) => {
                                renderProcess()
                              }}
                              className={"h-16 text-lg lg:text-sm select-none"}
                            />
                          </div>
                        </div>
                      )
                      :
                      (<SimpleButton
                        text={"Login to Run Designera"}
                        type={"primary"}
                        onClick={(e) => {
                          changeSection("login")
                          toggleModal(true)
                        }}
                        className={"h-16 text-xl"}
                      />)
                    }
                  </div>
                </div>

              </SideMenu>
              <Content>
                <div className={"hidden md:block"}>
                  <SubHeading>Recent Designs</SubHeading>
                </div>
                <div className={"block mt-2 md:hidden"}>
                  <SubHeading>Generated Image</SubHeading>
                </div>
                {resulted ?
                  <div
                    className={"w-full h-96 flex-col font-semibold overflow-hidden bg-contain bg-no-repeat bg-center bg-stone-600 designera-rounded text-white sm:bg-cover md:flex md:h-full md:bg-contain md:bg-no-repeat md:bg-center lg:bg-cover"}
                    style={{
                      backgroundImage: resultData.id ? `url("https://cdn.designera.app/generated/${resultData.id}")` : `url("${selectedResult.url}")`,
                    }}
                    onClick={(e: any) => {
                      if ([...e.target.classList].includes("black-zone")) return openLightbox(e, {
                        photo: selectedResult.url,
                        index: 0
                      })
                    }}
                  >
                    <div
                      className={"h-full w-full opacity-0 hover:opacity-100 transition duration-300 ease-in-out"}>
                      <div className={"black-zone h-1/2"}>
                        <div className={"overflow-x-scroll md:overflow-x-hidden"}>
                          {!selectedResult?.url?.includes("reference") &&
                              <div
                                  className={"w-fit flex flex-row items-start justify-center sm:w-full md:justify-start md:flex-col md:items-end gap-4 p-4"}>
                                  <IconButton
                                      icon={<FontAwesomeIcon icon={faDownload} color={"#AAA7A5"}
                                                             size={"xl"}
                                                             style={{width: 25, height: 25}}/>} onClick={() => {
                                    ForceDownload(selectedResult.url, "designera-" + selectedResult.id)
                                  }}/>
                                  <IconButton
                                      icon={<FontAwesomeIcon icon={faHeart} color={"#AAA7A5"}
                                                             size={"xl"}
                                                             style={{width: 25, height: 25}}/>} onClick={() => {
                                    vote(true)
                                  }}/>
                                  <IconButton
                                      icon={<UseAsThemeFlatLogo/>} onClick={() => addImage({ id: selectedResult.id, url: selectedResult.id, style: roomStyle })}/>
                                  <IconButton
                                      icon={<FontAwesomeIcon icon={faArrowUpRightFromSquare}
                                                             color={"#AAA7A5"} size={"xl"}
                                                             style={{width: 25, height: 25}}/>}
                                      onClick={() => {
                                        upscale()
                                      }}
                                  />
                                  <IconButton
                                      icon={<FontAwesomeIcon icon={faArrowRotateLeft}
                                                             color={"#AAA7A5"} size={"xl"}
                                                             style={{width: 25, height: 25}}/>}
                                      onClick={() => {
                                        renderProcess()
                                      }}
                                  />
                                  <IconButton
                                      icon={<FontAwesomeIcon icon={faCopy} color={"#AAA7A5"}
                                                             size={"xl"}
                                                             style={{width: 25, height: 25}}/>}
                                      onClick={() => {
                                        renderProcess(true)
                                      }}
                                  />
                              </div>
                          }
                        </div>
                      </div>
                      <div
                        className={"black-zone h-1/2 w-full flex flex-col justify-end items-center"}>
                        {!(selectedResult?.url?.includes("reference") || publisheds.includes(selectedResult.id)) &&
                            <div className={"w-11/12 xl:w-2/3 flex justify-center"}>
                                <AnimatedSimpleInput
                                    labelText={"Give your design a name"}
                                    className={"w-10/12 xl:w-11/12"}
                                    labelClassname={"ml-5 text-white text-base"}
                                    inputClassname={"bg-[#1E1E1E] hover:bg-[#242424] focus:bg-[#242424] opacity-90 pl-7 pt-6"}
                                    value={publishDescription}
                                    onValueChange={(text) => {
                                      setPublishDescription(text)
                                    }}
                                />
                                <button
                                    onClick={() => {
                                      if ((userData?.subscription?.isActive)) {
                                        publish()
                                      } else {
                                        subscriptionToggleModal(true)
                                      }
                                    }}
                                    disabled={publishDescription.length < 6 || publishDescription.length > 50}
                                    className="xl:w-1/12 block text-stone-400 p-2 bg-[#1E1E1E] hover:bg-[#242424] focus:bg-[#242424] opacity-90 border border-[#6F6B6A] font-semibold hover:text-white designera-rounded ml-2 flex items-center justify-center"
                                    style={{height: 56, width: 56}}
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} color={"#AAA7A5"} size={"xl"} style={{ paddingRight: 2 }}/>
                                </button>
                            </div>
                        }
                        <div
                          className={"w-full overflow-x-scroll xl:overflow-x-hidden xl:flex xl:justify-center"}>
                          <div
                            className="px-4 w-fit flex flex-row flex-nowrap justify-between my-2 gap-3 xl:px-0 xl:w-11/12 2xl:w-2/3">

                            {resultData.images && [resultData.referenceId, ...resultData.images].map((v, i) => {
                              return (
                                <div key={i} onClick={(e) => {
                                  switchImage(v, e, i)
                                }}
                                     className="w-32 xl:w-1/6 flex items-center text-center bg-stone-600 h-20 designera-rounded designera-box-shadow border-2 border-transparent hover:border-white cursor-pointer overflow-hidden">
                                  <ImageWithFallback
                                    className="w-full h-full"
                                    src={`https://cdn.designera.app/generated/${v}`}
                                    alt={`Generated Image`}
                                    width={100}
                                    height={100}
                                    fallbackUrl={`https://cdn.designera.app/reference/${v}`}
                                  />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  : loaderShow ?
                    <div
                      className={"w-full flex items-center justify-center font-semibold bg-stone-600 designera-rounded text-white h-96 md:h-full"}
                    >Rendering...</div>
                    :
                    <div className={"h-full"}>
                      <div className={"h-full hidden md:block"}>
                        <SampleRecentGalleryImages images={recentImages}/>
                      </div>
                      <div
                        className={"w-full h-96 flex items-center justify-center font-semibold bg-stone-600 designera-rounded text-white md:hidden"}>
                        Waiting for the prompt...
                      </div>
                    </div>
                }
              </Content>
            </StandardLayout>
          </div>
        </div>
      </div>

      <div className="flex justify-center min-h-screen">
        <div className="w-4/5 flex flex-col items-center">
          <Heading>
            Get <span className="text-[#FF0000]">inspired</span> by the community
            of <span className="text-[#FF9900]">Designera</span>
          </Heading>
          <div className="w-full flex justify-center mb-4">
            <AnimatedSimpleInput
              labelText={"Search Designs"}
              placeholderText={"Ex. Ikea, Scandinavian, Cyberpunk, Batcave"}
              className={"w-full md:w-4/5 lg:w-3/5 xl:w-2/5"}
              inputClassname={"bg-[#1E1E1E] hover:bg-[#242424] focus:bg-[#242424] pl-7 pt-6 rounded-full"}
              labelClassname={"ml-5 text-white text-base"}
              onValueChange={(text) => text.length < 1 ? setSearch("") : setSearchTemp(text)}
              onSubmit={() => setSearch(searchTemp)}
            />
          </div>
          <div className="w-4/5 sm:w-3/5 md:w-2/5 xl:w-1/6">
            <RadioButtons
              title={"Tabs"}
              choices={["Most Liked", "Recent"]}

              active={galleryOrderBy}
              titleShow={false}
              column={2}
              onValueChange={(value, index) => {
                setGalleryOrderBy(index);
              }}
            />
          </div>
          <div className="w-full designera-rounded-lg mt-10">
            <SampleCommunityGalleryImages images={images}/>
          </div>
          {/*<div
                        className="h-15 pt-2 w-full designera-rounded-lg flex justify-center items-center bg-gray-700 block text-white font-bold designera-box-shadow cursor-pointer mb-10"
                        onClick={() => {
                            setLoadMoreCounter(loadMoreCounter + 1);
                        }}
                    >
                        <SubHeading>Load More...</SubHeading>
                    </div>*/}
        </div>
      </div>


      { /* @ts-ignore */}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              // @ts-ignore
              views={[...
                resultData.id ?
                  [{src: `https://cdn.designera.app/generated/${resultData.id}`, id: resultData.id}] :
                  resultData.images ? resultData.images.map((v: any) => {
                    return {src: `https://cdn.designera.app/generated/${v}`, id: v}
                  }) : []
              ]}
              components={{
                // @ts-ignore
                Footer: (props, context) => GeneratedImageModalFooter(props, closeLB)
              }}
            />
          </Modal>
        ) : null}
      </ModalGateway>

      <AuthModal/>
      <SubscriptionModal/>
      <Toaster containerStyle={{zIndex: 999999}} toastOptions={{ style: { backgroundColor: "#2F2F2F", color: "#fff" } }}/>
    </main>
  );
}
