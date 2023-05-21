import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faDownload, faEye,
  faHeart, faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import {IconButton} from "../../button/IconButton";
import moment from "moment/moment";
import {imagesGlobal, imagesGlobalStore} from "../../../globals/images/images";
import {DynamicObject} from "../../../constants/DynamicObject";
import {ImageWithFallback} from "../ImageWithFallback";
import {ForceDownload} from "../../../constants/ForceDownload";
import {useAxios} from "../../../hooks/useAxios";
import toast from "react-hot-toast";
import {UseAsThemeLogo} from "../../../assets/svg/UseAsThemeLogo";
import useAsTheme from "../../../hooks/themes/useAsTheme";
import Image from 'next/image';
import {UseAsThemeFlatLogo} from "../../../assets/svg/UseAsThemeFlatLogo";

export const GalleryModalFooter = ({innerProps, isModal, currentIndex}: DynamicObject) => {
  const [photos, setPhotos] = useState([] as any[])
  const {addImage} = useAsTheme()
  const {PATCH} = useAxios()

  useEffect(() => {
    setPhotos(imagesGlobalStore.getState().communityImages)

    imagesGlobalStore.subscribe(() => {
      setPhotos(imagesGlobalStore.getState().communityImages)
    })
  }, []);

  async function vote(isLike: boolean) {
    try {
      const response = await PATCH('image/vote', {
        "id": photos[currentIndex]?.data?.id,
        "type": Number(isLike)
      })

      toast.success("Vote successful.")
    } catch (err) {
      toast.error("Can not vote.")
    }
  }

  function themeAdd(id: string, url: string, style: string) {
    imagesGlobalStore.dispatch(imagesGlobal.actions.addTheme({
      image: {
        id,
        url: id,
        style
      }
    }))
  }

  return isModal ? (
    <div {...innerProps}>
      <div
        className={"absolute alwaysOnTop left-0 top-5 sm:top-auto sm:bottom-0 pl-2 pb-2 gap-4 items-end h-fit"}>
        <div className={"flex items-end flex-row flex-wrap gap-4"}>
          <IconButton description={"Download"} icon={
            <FontAwesomeIcon icon={faDownload} color={"#AAA7A5"} size={"xl"}
                             style={{width: 25, height: 25}}
                             onClick={() => ForceDownload(photos[currentIndex]?.src, "designera-" + photos[currentIndex]?.data?.id)}/>
          }
          />
          <IconButton
            description={"Like"}
            icon={
              <FontAwesomeIcon icon={faHeart} color={"#AAA7A5"} size={"xl"} style={{width: 25, height: 25}}/>
            }
            onClick={() => {
              vote(true)
            }}
          />
          <IconButton
            description={"Copy Style"}
            icon={
              <FontAwesomeIcon icon={faWandMagicSparkles} color={"#AAA7A5"} size={"xl"} style={{width: 25, height: 25}}/>
            }
            onClick={() => themeAdd(photos[currentIndex]?.data?.id, photos[currentIndex]?.src, photos[currentIndex]?.data?.style)}
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
                               }}/>
            }
            onClick={() => {
              if (photos[currentIndex]?.src?.includes("generate")) {
                imagesGlobalStore.dispatch(imagesGlobal.actions.changeCommunityImageByIndex({
                  image: {
                    ...photos[currentIndex],
                    src: "https://cdn.designera.app/reference/" + photos[currentIndex]?.data.referenceId
                  },
                  index: currentIndex
                }))
              } else {
                imagesGlobalStore.dispatch(imagesGlobal.actions.changeCommunityImageByIndex({
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
          <div>Room Type <span className={"text-[#a8a29e] Font-ExtraLight ml-1"}>{photos[currentIndex]?.data?.type}</span></div>
          <div>Room Style <span className={"text-[#a8a29e] Font-ExtraLight ml-1"}>{photos[currentIndex]?.data?.style}</span></div>
        </div>
      </div>
      <div className={"absolute right-0 bottom-0 pr-2 pb-2 flex flex-col items-end alwaysOnTop"}>
        <div className={"mb-1"}>
          <IconButton
            icon={
              photos[currentIndex]?.data?.userAvatar ?
              <div className={"overflow-hidden designera-rounded"}>
                <ImageWithFallback
                  width={50}
                  height={50}
                  src={`https://cdn.designera.app/avatar/${photos[currentIndex]?.data?.userAvatar}`}
                  alt={photos[currentIndex]?.data?.userAvatar || "No info found"}
                  style={{objectFit: 'contain'}}
                  fallbackUrl={"/assets/images/unknown.png"}
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
            className={"Font-Light font-thin text-stone-400"}>{moment.duration(new Date().valueOf() - (new Date(photos[currentIndex]?.data?.createdAt))?.valueOf()).format(`D [Days], H [Hours], m [Minutes], s [Seconds]`, {trim: "both"})} Ago</small>
        </div>
        <div className={"absolute w-60 h-32 bottom-0 right-0 z-0"} style={{
          backgroundImage: 'url("/assets/images/Rectangle_9.png")',
          backgroundSize: "cover",
          rotate: "-10deg",
          bottom: -20,
          right: -5
        }}/>
      </div>
    </div>
  ) : null
};