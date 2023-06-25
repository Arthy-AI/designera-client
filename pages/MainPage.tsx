import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCircleDown,
  faHeart,
  faPaperPlane,
  faPlus, faWandMagicSparkles,
  faUpRightAndDownLeftFromCenter, faArrowsRotate, faArrowUpFromBracket,
  faMagnifyingGlassDollar
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip as ReactTooltip } from "react-tooltip";
import * as Scroll from 'react-scroll';

import { Heading } from "../components/heading/Heading";
import { Small } from "../components/text/small/Small";
import { SimpleButton } from "../components/button/SimpleButton";
import { Content } from "../components/layout/StandardLayout/Content";
import { SimpleInput } from "../components/input/SimpleInput";
import { StandardLayout } from "../components/layout/StandardLayout/StandardLayout";
import { MutedSmall } from "../components/text/small/MutedSmall";
import { RadioButtons } from "../components/input/RadioButtons";
import { SubHeading } from "../components/heading/SubHeading";
import { SideMenu } from "../components/layout/StandardLayout/SideMenu";
import { FileInputArea } from "../components/input/FileInputArea";
import { SampleRecentGalleryImages } from "../components/images/gallery/SampleRecentGalleryImages";
import { AnimatedSimpleInput } from "../components/input/AnimatedSimpleInput";
import { Header } from "../components/header/Header";
import { AuthModal } from "../components/login-register/AuthModal";
import { SampleCommunityGalleryImages } from "../components/images/gallery/SampleCommunityGalleryImages";
import { IconButton } from "../components/button/IconButton";
import Carousel, { Modal, ModalGateway } from "react-images";
import { GeneratedImageModalFooter } from "../components/images/gallery/GeneratedImageModalFooter";
import { useAxios } from "../hooks/useAxios";
import useAuth from "../hooks/auth/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { useAuthGlobalDispatch } from "../globals/auth/authHooks";
import { authGlobalInitiate } from "../globals/auth/functions/authGlobalInitiate";
import { StyleSuggestionPills } from "../constants/StyleSuggestionPills";
import { ShuffleArray } from "../constants/ShuffleArray";
import { DynamicObject } from "../constants/DynamicObject";
import { GetBase64 } from "../constants/GetBase64";
import { ImageWithBlur } from "../components/images/ImageWithBlur";
import { ForceDownload } from "../constants/ForceDownload";
import { imagesGlobal, imagesGlobalStore } from "../globals/images/images";
import useAsTheme from "../hooks/themes/useAsTheme";
import { UseAsThemeFlatLogo } from "../assets/svg/UseAsThemeFlatLogo";
import { SubscriptionModal } from "../components/subscription/SubscriptionModal";
import useSubscription from "../hooks/subscription/useSubscription";
import { Box, CircularProgress } from "@chakra-ui/react";
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark } from "@chakra-ui/react";
import { orange } from "@mui/material/colors";
import { useBottomScrollListener } from "react-bottom-scroll-listener";



export default function MainPage() {
  const { GET, FILEPOST, POST, PATCH } = useAxios()
  const { userData, decrementCreditBalance, isLoggedIn, toggleModal, changeSection, upvoteImageUpdate } = useAuth()
  const { themes, addImage, removeImage, themesSectionShow, themesSectionToggle, removeImageById } = useAsTheme()
  const { toggleModal: subscriptionToggleModal } = useSubscription()
  const [galleryOrderBy, setGalleryOrderBy] = useState(0);
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
  const [imageDependency, setImageDependency] = useState(0.55);
  const [blockPagination, setBlockPagination] = useState(false);

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
    setPaginationData({ ...tempPaginationData })
  }, [search]);

  useEffect(() => {
    setImages([])

    let tempPaginationData = paginationData;
    tempPaginationData.orderBy = galleryOrderBy == 0 ? 'upvoteCount' : 'createdAt'
    setPaginationData({ ...tempPaginationData })
    setBlockPagination(false)
  }, [galleryOrderBy]);


  useEffect(() => {
    async function fetchImages() {
      if (blockPagination) return;
      setLoadingImages(true)
      let recentImagesResponse = await GET("image/filter", {
        query: null,
        pageIndex: 0,
        pageSize: 6,
        orderBy: "createdAt"
      })
      setRecentImages(recentImagesResponse.items)


      let data = await GET("image/filter", paginationData)
      if (data.items.length < 20) {
        setBlockPagination(true)
      }
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
    generateImageFormData.append("initImageStrength", String(imageDependency))

    if (createVariants) {
      generateImageFormData.append("imageId", selectedResult.id || resultData.id)
    }

    try {
      var response = await FILEPOST("generate-image", generateImageFormData)
    } catch (err: any) {
      setResulted(false)
      setLoaderShow(false)
      return toast.error(err?.response?.status ? err?.response?.status + " - " + err?.response?.data?.message : "An error occurred.")
    }

    decrementCreditBalance()
    setResultData(response)

    imagesGlobalStore.dispatch(imagesGlobal.actions.changeGeneratedImages({
      images: [...
        response.id ?
          [{ src: `https://cdn.designera.app/generated/${response.id}`, id: response.id, style: roomStyle }] :
          response.images ? response.images.map((v: any) => {
            return { src: `https://cdn.designera.app/generated/${v}`, id: v, style: roomStyle }
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
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  async function selectImage(files: FileList | undefined) {
    if (files) {
      if (!["png", "jfif", "jpg", "jpeg", "pjpeg"].includes(String(files[0]?.name?.split(".")?.pop()))) {
        return toast.error("Please just upload images.")
      }
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

  const [voteLoading, setVoteLoading] = useState(false)

  async function vote(isLike: boolean) {
    let vote;
    if (voteLoading) return;

    const photoObject = {
      "id": selectedResult.id,
    }

    try {
      if (userData?.upvotedImages?.findIndex((v: any) => v.id == selectedResult.id) == -1) {
        vote = true
        upvoteImageUpdate(photoObject, "vote")
        setVoteLoading(true)
        const response = await PATCH('image/vote', {
          "id": selectedResult.id,
          "type": 1
        })
        setVoteLoading(false)
      } else {
        upvoteImageUpdate(photoObject, "unvote")
        vote = false

        setVoteLoading(true)
        const response = await PATCH('image/vote', {
          "id": selectedResult.id,
          "type": 0
        })
        setVoteLoading(false)
      }
    } catch (err) {
      toast.error(`Can not ${vote ? "vote" : "unvote"}.`)
      upvoteImageUpdate(photoObject, vote ? "unvote" : "vote")
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

  const scrollRef = useBottomScrollListener((...args) => {
    if (loadingImages) return;
    let tempPaginationData = paginationData
    tempPaginationData.pageIndex += 1
    setPaginationData({ ...tempPaginationData })
  });

  //Credits Suffixes
  function formatCredits(credits: number): string {
    const suffixes = ["", "K", "M", "B", "T"]; // Add more suffixes if needed
    const suffixIndex = Math.floor(Math.log10(credits) / 3);
    const scaledValue = credits / Math.pow(10, suffixIndex * 3);
    const formattedValue = scaledValue.toFixed(1);

    return formattedValue + suffixes[suffixIndex];
  }

  return (
    <main className="flex flex-col" id={"MainPage"}>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-4/5 flex flex-col items-center">
          <div className="w-full">
          <Heading>
            <div className={"hidden  md:block mt-2 mb-0"}><span className="text-[#FF9900]">Design</span> your interior
              in <span className="text-[#ff9900]">seconds</span>
              <div>
                with <span className="text-[#FF0000]">AI</span> 🏠
              </div> 
            </div>
              
          </Heading>
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
                            style={{ objectFit: "contain" }}
                            width={"480"} /> :
                          <div className={"flex flex-col items-center gap-2"}>
                            <FontAwesomeIcon icon={faArrowUpFromBracket} style={{ height: 30, width: 30 }}
                              color={"#fff"} />
                            <span
                              className="text-sm text-white text-center block designera-text-shadow lg:text-md"
                            >
                              Drop your image, Tap to select or
                              <br />
                              Take a photo!
                            </span>
                          </div>
                      }

                      onValueChange={(files) => selectImage(files)}
                      id={"fileupload1"}
                    />
                    <Small className={"py-2"}>
                      Make sure it shows the entire room in a 90° straight
                      angle facing walls, not from a corner or angled.
                      Ultra-wide angle lenses not recommended.
                    </Small>
                    <SimpleInput
                      labelText={"Room Type"}
                      labelTagShow={false}
                      className={"placeholder-white"}
                      secondaryPlaceholderText={" Ex. Living Room, Kitchen, Office..."}
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
                      <div className="relative flex-grow">
                        <SimpleInput
                          labelText={"Style"}
                          labelTagShow={false}
                          value={roomStyle}
                          onValueChange={(e) => {
                            setRoomStyle(e);
                          }}
                          secondaryPlaceholderText={" Ex. Minimalist, Red, 70’s, Wood, Decorated..."}
                          onFocus={() => {
                            setShowStyleSuggestionPills(true);
                          }}
                          className={"placeholder-white"}
                        />
                        <div className="absolute right-0 top-0 bottom-0 flex items-center pr-1">
                          <button
                            className="svg-change font-semibold hover:text-white designera-rounded ml-1.5 flex justify-center items-center"
                            style={{ minHeight: "30px", minWidth: "30px" }}
                            onClick={() => {
                              themesSectionToggle();
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faWandMagicSparkles}
                              color={themesSectionShow ? "#61A0FF" : "#AAA7A5"}
                              size={"xs"}
                              style={{ width: 20, height: 20 }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    {themesSectionShow ? (
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
                                style={{
                                  backgroundImage: `url("https://cdn.designera.app/generated/${v.url}")`,
                                  backgroundSize: "cover",
                                  backgroundPosition: 'center'
                                }}
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
                                  }} />
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
                                <div>
                                  <div id={`suggestion-refresh`}
                                    className="bg-[#515151] p-0.5 rounded px-1 text-stone-100 designera-box-shadow cursor-pointer Font-ExtraLight select-none"
                                    style={{ fontSize: "0.850rem" }}
                                    onClick={(e) => {
                                      setStyleSuggestionPills([...ShuffleArray(styleSuggestionPills)])
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faArrowsRotate} color={"#F5F5F4"}
                                      style={{
                                        width: 15,
                                        height: 15,
                                      }} />
                                  </div>
                                  <ReactTooltip
                                    anchorId={`suggestion-refresh`}
                                    place="bottom"
                                    content={"Refresh"}
                                  />
                                </div>
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
                  <Box pt={0} pb={5} pl={2.5} pr={2.5}>
                    <ReactTooltip
                      anchorId={`artistic-freedom`}
                      place="top"
                      content={"Slide to find the perfect balance between artistic freedom and preserving the original image details."}
                    />
                    <span
                      id={"artistic-freedom"}
                      className={"select-none"}
                      style={{
                        display: 'block',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: '14px',
                        fontFamily: 'Inter-Medium',
                        marginBottom: 3
                      }}
                    >
                      Artistic Freedom
                    </span>
                    <Slider defaultValue={0.55} value={imageDependency} min={0.4} max={0.7} step={0.05}
                      marginBottom={0.4}
                      onChange={(val) => setImageDependency(val)}
                    >
                      <SliderTrack borderRadius='full' height='8px' bg='#3e3e3e'>
                        <Box position='relative' right={4} />
                        <SliderFilledTrack borderRadius='full' height='8px' bg='#3e3e3e' />
                      </SliderTrack>
                      <SliderThumb boxSize={4} />
                      <SliderMark value={0.55} mt='1.5' ml='-8' fontStyle='Inter-Medium' fontSize='14px'
                        textColor={"gray.100"}>
                        Balanced
                      </SliderMark>
                      <SliderMark value={0.4} mt='1.5' ml='0' fontStyle='Inter-Medium' fontSize='14px'
                        textColor={"gray.100"}>
                        Weak
                      </SliderMark>
                      <SliderMark value={0.7} mt='1.5' ml='-12' fontStyle='Inter-Medium' fontSize='14px'
                        textColor={"gray.100"}>
                        Strong
                      </SliderMark>
                    </Slider>
                  </Box>
                  <div>
                    {isLoggedIn ?
                      (
                        <div className={"flex flex-row gap-2"}>
                          {(!userData?.plan && userData?.credits && userData.credits <= 10) && (
                            <div className="flex flex-row bg-stone-700 text-white designera-rounded designera-box-shadow items-center justify-center gap-2 p-2 h-16 w-fit">
                              <div className="flex justify-center items-center font-bold text-4xl select-none">
                                <span className="h-max">
                                  {formatCredits(userData.credits)}
                                </span>
                              </div>
                              <div className="flex justify-center items-center text-sm pt-1 leading-4 text-xs font-thin select-none">
                                Credits<br />Available
                              </div>
                            </div>
                          )}
                          <div className={"w-full"}>
                            <SimpleButton
                              disabled={
                                !selectedImage
                                || !selectedImageObject
                                || !(roomType.length > 2 && roomType.length < 1024)
                                || (!(roomStyle.length > 2 && roomStyle.length < 1024) && themes.length < 1)
                                || loaderShow
                              }
                              text={"Run Designera"}
                              type={"primary"}
                              onClick={(e) => {
                                renderProcess()
                              }}
                              className={"h-16 text-lg lg:text-l select-none"}
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
                        className={"h-16 text-l"}
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
                      <div className={"h-1/2"}>
                        <div className={"overflow-x-scroll md:overflow-x-hidden black-zone"}>
                          {!selectedResult?.url?.includes("reference") &&
                            <div
                              className={"black-zone w-fit flex flex-row items-start justify-center sm:w-full md:justify-start md:flex-col md:items-end gap-3 p-3"}>
                              <IconButton
                                description={"Download"}
                                icon={<FontAwesomeIcon icon={faCircleDown} color={"#AAA7A5"}
                                  size={"xl"}
                                  style={{ width: 25, height: 25 }} />} onClick={() => {
                                    ForceDownload(selectedResult.url, "designera-" + selectedResult.id)
                                  }} />
                              <IconButton
                                description={"Like"}
                                icon={<FontAwesomeIcon icon={faHeart} color={
                                  userData?.upvotedImages?.findIndex((v: any) => v.id == selectedResult.id) == -1 ? "#AAA7A5" : "#FF6363"
                                }
                                  size={"xl"}
                                  style={{ width: 25, height: 25 }} />} onClick={() => {
                                    vote(true)
                                  }} />
                              <IconButton
                                description={"Copy Style"}
                                icon={<FontAwesomeIcon icon={faWandMagicSparkles} color={
                                  themes.findIndex((v) => v.id == selectedResult.id) == -1 ? "#AAA7A5" : "#61A0FF"
                                } size={"xl"}
                                  style={{ width: 25, height: 25 }} />}
                                onClick={() => {
                                  if (themes.findIndex((v) => v.id == selectedResult.id) == -1) {
                                    addImage({
                                      id: selectedResult.id,
                                      url: selectedResult.id,
                                      style: roomStyle
                                    })
                                  } else {
                                    removeImageById(selectedResult.id)
                                  }
                                  themesSectionToggle(true)
                                }} />
                              <IconButton
                                description={"Upscale"}
                                icon={<FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter}
                                  color={"#AAA7A5"} size={"xl"}
                                  style={{ width: 25, height: 25 }} />}
                                onClick={() => {
                                  upscale()
                                }}
                              />
                              <IconButton
                                description={"Regenerate"}
                                icon={<FontAwesomeIcon icon={faArrowsRotate}
                                  color={"#AAA7A5"} size={"xl"}
                                  style={{ width: 25, height: 25 }} />}
                                onClick={() => {
                                  renderProcess()
                                }}
                              />
                              <IconButton
                                description={"Create Variants"}
                                icon={<FontAwesomeIcon icon={faCopy} color={"#AAA7A5"}
                                  size={"xl"}
                                  style={{ width: 25, height: 25 }} />}
                                onClick={() => {
                                  renderProcess(true)
                                }}
                              />
                              <IconButton
                                description={"Coming Soon"}
                                icon={<FontAwesomeIcon icon={faMagnifyingGlassDollar} color={"#AAA7A5"}
                                  size={"xl"}
                                  style={{ width: 25, height: 25 }} />}
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
                              className={"w-8/12 xl:w-9/12"}
                              labelClassname={"ml-5 text-white text-base"}
                              inputClassname={"bg-[#1E1E1E] hover:bg-[#242424] focus:bg-[#242424] opacity-90 pl-7 pt-6"}
                              value={publishDescription}
                              onValueChange={(text) => {
                                setPublishDescription(text)
                              }}
                            />
                            <ReactTooltip
                              anchorId={"publishButton"}
                              place="top"
                              content={"Publish"}
                              delayShow={500}
                            />
                            <button
                              id={"publishButton"}
                              onClick={() => {
                                publish()
                              }}
                              disabled={publishDescription.length < 6 || publishDescription.length > 50}
                              className="xl:w-1/12 block text-stone-400 p-2 bg-[#1E1E1E] hover:bg-[#242424] focus:bg-[#242424] opacity-90 border border-[#6F6B6A] font-semibold hover:text-white designera-rounded ml-2 flex items-center justify-center"
                              style={{ height: 56, width: 56 }}
                            >
                              <FontAwesomeIcon icon={faPaperPlane} color={"#AAA7A5"}
                                style={{ paddingRight: 2, height: 30, width: 30 }} />
                            </button>
                          </div>
                        }
                        <div
                          className={"w-full overflow-x-scroll xl:overflow-x-hidden xl:flex xl:justify-center"}>
                          <div
                            className="px-4 w-fit flex flex-row flex-nowrap justify-center my-2 gap-1.5 xl:px-0 xl:w-11/12 2xl:w-2/3">

                            {resultData.images && [resultData.referenceId, ...resultData.images].map((v, i) => {
                              return (
                                <div key={i} onClick={(e) => {
                                  switchImage(v, e, i)
                                }}
                                  className="w-32 xl:w-1/6 flex items-center text-center bg-stone-600 h-20 designera-rounded designera-box-shadow border-2 border-transparent hover:border-white cursor-pointer overflow-hidden">
                                  <ImageWithBlur
                                    className="w-full h-full object-cover"
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
                      className={"w-full flex items-center justify-center flex-col font-semibold bg-stone-600 designera-rounded text-white h-96 md:h-full"}>
                      <span style={{ marginBottom: '0.4rem' }}>Rendering...</span>
                      <div style={{ marginTop: '0.4rem' }}>
                        <CircularProgress isIndeterminate color={"#FF9900"} />
                      </div>
                    </div>
                    :
                    <div className={"h-full"}>
                      <div className={"h-full hidden md:block"}>
                        <SampleRecentGalleryImages images={recentImages} />
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
          <div className="w-full flex justify-center mb-4 mt-5">
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
            <SampleCommunityGalleryImages images={images} />
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
                  [{ src: `https://cdn.designera.app/generated/${resultData.id}`, id: resultData.id }] :
                  resultData.images ? resultData.images.map((v: any) => {
                    return { src: `https://cdn.designera.app/generated/${v}`, id: v }
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

      <AuthModal />
      <SubscriptionModal />
      <Toaster containerStyle={{ zIndex: 999999 }} toastOptions={{ style: { backgroundColor: "#2b2b2b", color: "#fff" } }} />
    </main>
  );
}
