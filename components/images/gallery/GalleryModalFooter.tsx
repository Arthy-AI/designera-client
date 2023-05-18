import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faDownload,
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
        className={"absolute alwaysOnTop left-0 top-5 sm:bottom-12 pl-5 pb-5 gap-4 items-end"}>
        <div className={"flex items-end flex-row flex-wrap gap-4 h-full"}>
          <IconButton icon={
            <FontAwesomeIcon icon={faDownload} color={"#AAA7A5"} size={"xl"}
                             style={{width: 25, height: 25}}
                             onClick={() => ForceDownload(photos[currentIndex]?.src, "designera-" + photos[currentIndex]?.data?.id)}/>
          }
          />
          <IconButton
            icon={
              <FontAwesomeIcon icon={faHeart} color={"#AAA7A5"} size={"xl"} style={{width: 25, height: 25}}/>
            }
            onClick={() => {
              vote(true)
            }}
          />
          <IconButton
            icon={
              <FontAwesomeIcon icon={faWandMagicSparkles} color={"#AAA7A5"} size={"xl"} style={{width: 25, height: 25}}/>
            }
            onClick={() => themeAdd(photos[currentIndex]?.data?.id, photos[currentIndex]?.src, photos[currentIndex]?.data?.style)}
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
              <div className={"overflow-hidden designera-rounded"}>
                <Image
                  width={50}
                  height={50}
                  src={`https://cdn.designera.app/avatar/${photos[currentIndex]?.data?.userAvatar}`}
                  alt={photos[currentIndex]?.data?.userAvatar || "No info found"}
                  style={{objectFit: 'contain'}}
                />
              </div>
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
          backgroundImage: 'url("https://media.discordapp.net/attachments/551764588136497152/1062682746914349098/Rectangle_9.png")',
          backgroundSize: "cover",
          rotate: "-10deg",
          bottom: -20,
          right: -5
        }}/>
      </div>
    </div>
  ) : null
};