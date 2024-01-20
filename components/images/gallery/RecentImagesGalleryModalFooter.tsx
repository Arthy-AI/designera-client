import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDown,
  faBookmark, faWandMagicSparkles, faEye, faMagnifyingGlassDollar
} from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../../button/IconButton";
import moment from "moment/moment";
import { imagesGlobal, imagesGlobalStore } from "../../../globals/images/images";
import { DynamicObject } from "../../../constants/DynamicObject";
import { ImageWithBlur } from "../ImageWithBlur";
import { ForceDownload } from "../../../constants/ForceDownload";
import { useAxios } from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import useAsTheme from "../../../hooks/themes/useAsTheme";
import useAuth from "../../../hooks/auth/useAuth";
import { CustomDateFormat } from "../../../constants/CustomDateFormat";
import { ImageWithFallback } from "../ImageWithFallback";
import Image from "next/image";
import { useRouter } from "next/router";

export const RecentImagesGalleryModalFooter = ({ innerProps, isModal, currentIndex }: DynamicObject) => {
  const { userData, upvoteImageUpdate } = useAuth()
  const { decrementCreditBalance, isLoggedIn, toggleModal, changeSection } = useAuth()
  const router = useRouter()
  const [photos, setPhotos] = useState([] as any[])
  const [nullPhotos, setNullPhotos] = useState([] as any[])
  const { themesSectionToggle, themes, removeImageById } = useAsTheme()
  const { PATCH } = useAxios()

  useEffect(() => {
    setPhotos(imagesGlobalStore.getState().recentImages)

    imagesGlobalStore.subscribe(() => {
      setPhotos(imagesGlobalStore.getState().recentImages)
    })
  }, []);

  const [voteLoading, setVoteLoading] = useState(false)

  async function vote(isLike: boolean) {
    let vote;
    if (voteLoading) return;

    const photoObject = {
      "id": photos[currentIndex]?.data?.id?.includes("reference") ? photos[currentIndex]?.data?.referenceId : photos[currentIndex]?.data?.id,
      "createdAt": photos[currentIndex]?.data?.createdAt,
      "description": photos[currentIndex]?.data?.title,
      "roomStyle": photos[currentIndex]?.data?.style,
      "roomType": photos[currentIndex]?.data?.type,
      "referenceId": photos[currentIndex]?.data?.referenceId,
      "user": {
        id: photos[currentIndex]?.data?.userAvatar,
        firstName: photos[currentIndex]?.data?.username,
        lastName: ""
      }
    }

    try {
      if (userData?.upvotedImages?.findIndex((v: any) => v.id == photos[currentIndex]?.data?.id) == -1) {
        vote = true
        upvoteImageUpdate(photoObject, "vote")
        setVoteLoading(true)
        const response = await PATCH('image/vote', {
          "id": photos[currentIndex]?.data?.id,
          "type": 1
        })
        setVoteLoading(false)
      } else {
        upvoteImageUpdate(photoObject, "unvote")
        vote = false

        setVoteLoading(true)
        const response = await PATCH('image/vote', {
          "id": photos[currentIndex]?.data?.id,
          "type": 0
        })
        setVoteLoading(false)
      }
    } catch (err) {
      toast.error(`Can not ${vote ? "vote" : "unvote"}.`)
      upvoteImageUpdate(photoObject, vote ? "unvote" : "vote")
    }
  }

  function themeAdd(id: string, url: string, style: string) {
    if (themes.findIndex((v) => v.id == id) == -1) {
      imagesGlobalStore.dispatch(imagesGlobal.actions.addTheme({
        image: {
          id,
          url: id,
          style
        }
      }))
    } else {
      removeImageById(id)
    }
    themesSectionToggle(true)
  }

  return isModal ? (
    <div {...innerProps}>
      <div
        className={"absolute alwaysOnTop left-0 top-5 sm:top-auto sm:bottom-0 pl-2 pb-2 gap-4 items-end h-fit"}>
        <div className={"flex items-end flex-row flex-wrap gap-2"}>
          <IconButton description={"Download"} icon={
            <FontAwesomeIcon icon={faCircleDown} color={"#AAA7A5"} size={"xl"}
              style={{ width: 25, height: 25 }}
              onClick={() => ForceDownload(photos[currentIndex]?.src, "designera-" + photos[currentIndex]?.data?.id)} />
          }
          />
          <IconButton
            description={"Like"}
            icon={
              <FontAwesomeIcon icon={faBookmark} color={
                userData?.upvotedImages?.findIndex((v: any) => v.id == photos[currentIndex]?.data?.id) == -1 ? "#AAA7A5" : "#FFD966"
              } size={"xl"} style={{ width: 25, height: 25 }} />
            }
            onClick={() => {
              vote(true)
            }}
          />
          <IconButton
            description={"Copy Style"}
            icon={
              <FontAwesomeIcon icon={faWandMagicSparkles} color={
                themes.findIndex((v) => v.id == photos[currentIndex]?.data?.id) == -1 ? "#AAA7A5" : "#61A0FF"
              } size={"xl"}
                style={{ width: 25, height: 25 }} />
            }
            onClick={() => themeAdd(photos[currentIndex]?.data?.id, photos[currentIndex]?.src, photos[currentIndex]?.data?.style)}
          />
          <IconButton
            description="Where to Buy?"
            onClick={() => {
              if (!isLoggedIn) {
                changeSection("login");
                toggleModal(true);
              } else {
                const imageData = {
                  id: photos[currentIndex]?.data?.id,
                  // include other image data properties as needed
                };
                router.push({
                  pathname: "/item-search",
                  query: imageData,
                });
              }
            }}
            icon={
              <FontAwesomeIcon
                icon={faMagnifyingGlassDollar}
                color="#AAA7A5"
                size="xl"
                style={{ width: 25, height: 25 }}
              />
            }
          />
          <IconButton
            description={"Show Original Image"}
            className={`${photos[currentIndex]?.src?.includes("reference") ? "bg-[#ffffff]" : ""}`}
            icon={
              <FontAwesomeIcon icon={faEye}
                color={photos[currentIndex]?.src?.includes("generate") ? "#AAA7A5" : "black"} size={"xl"}
                style={{
                  width: 25,
                  height: 25,
                }} />
            }
            onClick={() => {
              if (photos[currentIndex]?.src?.includes("generate")) {
                imagesGlobalStore.dispatch(imagesGlobal.actions.changeRecentImageByIndex({
                  image: {
                    ...photos[currentIndex],
                    src: "https://cdn.designera.app/reference/" + photos[currentIndex]?.data.referenceId
                  },
                  index: currentIndex
                }))
              } else {
                imagesGlobalStore.dispatch(imagesGlobal.actions.changeRecentImageByIndex({
                  image: {
                    ...photos[currentIndex],
                    src: "https://cdn.designera.app/generated/" + photos[currentIndex]?.data.id
                  },
                  index: currentIndex
                }))
              }
            }}
          />
        </div>
        <div className={'flex flex-col gap-0.5 mt-3 text-white Font-Bold'}>
          <div>Room Type <span
            className={"text-[#a8a29e] Font-ExtraLight ml-1"}>{photos[currentIndex]?.data?.type}</span></div>
          <div>Room Style <span
            className={"text-[#a8a29e] Font-ExtraLight ml-1"}>{photos[currentIndex]?.data?.style}</span></div>
        </div>
      </div>
      <div className={"absolute right-0 bottom-0 pr-2 pb-2 flex flex-col items-end alwaysOnTop"}>
        <div className={"mb-1"}>
          <IconButton
            icon={
              photos[currentIndex]?.data?.userAvatar ?
                <div className={"overflow-hidden designera-rounded-lg"}>
                  <Image
                    width={50}
                    height={50}
                    src={
                      !nullPhotos.includes(photos[currentIndex]?.data?.userAvatar) ?
                        `https://cdn.designera.app/avatar/${photos[currentIndex]?.data?.userAvatar}` :
                        "/assets/images/unknown.png"
                    }
                    alt={photos[currentIndex]?.data?.userAvatar || "No info found"}
                    style={{ objectFit: 'contain' }}
                    placeholder={"blur"}
                    blurDataURL={"/assets/images/unknown.png"}
                    onError={() => {
                      let tempNullPhotos = Array.from(nullPhotos)
                      tempNullPhotos.push(photos[currentIndex]?.data?.userAvatar)
                      setNullPhotos([...tempNullPhotos])
                    }}
                  />
                </div>
                : <div className={'hidden'}></div>
            }
            className={"p-0.5"}
          />
        </div>

        <div
          className={"sticky text-white font-semibold z-10 text-right flex flex-col"}>
          {photos[currentIndex]?.data?.title}
          <small className={"font-thin"}>By {photos[currentIndex]?.data?.username}</small>
          <small
            className={"Font-Light font-thin text-stone-400"}>{moment.duration(new Date().valueOf() - (new Date(photos[currentIndex]?.data?.createdAt))?.valueOf()).format(CustomDateFormat, { trim: "both" })} Ago</small>
        </div>
        <div className={"absolute w-60 h-32 bottom-0 right-0 z-0"} style={{
          backgroundImage: 'url("/assets/images/Rectangle_9.png")',
          backgroundSize: "cover",
          rotate: "-10deg",
          bottom: -20,
          right: -5
        }} />
      </div>
    </div>
  ) : null
};