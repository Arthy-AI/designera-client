import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faArrowUpRightFromSquare, faCopy,
  faCircleDown,
  faHeart,
  faPaperPlane, faWandMagicSparkles
} from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../../button/IconButton";
import { AnimatedSimpleInput } from "../../input/AnimatedSimpleInput";
import { DynamicObject } from "../../../constants/DynamicObject";
import { imagesGlobal, imagesGlobalStore } from "../../../globals/images/images";
import toast from "react-hot-toast";
import { useAxios } from "../../../hooks/useAxios";
import { ForceDownload } from "../../../constants/ForceDownload";
import useAsTheme from "../../../hooks/themes/useAsTheme";
import useAuth from "../../../hooks/auth/useAuth";
import useSubscription from "../../../hooks/subscription/useSubscription";
import { Tooltip as ReactTooltip } from "react-tooltip";

export const GeneratedImageModalFooter = ({ innerProps, isModal, currentIndex }: DynamicObject, closeLB: () => void) => {
  const { userData, upvoteImageUpdate } = useAuth()
  const { themesSectionToggle, themes, removeImageById, addImage } = useAsTheme()
  const { POST, PATCH } = useAxios()
  const { toggleModal: subscriptionToggleModal } = useSubscription()
  const [photos, setPhotos] = useState([] as any[])
  const [publishDescription, setPublishDescription] = useState("")
  const [publisheds, setPublisheds] = useState([] as String[]);

  async function publish() {
    try {
      const response = await POST('image/publish', {
        "id": photos[currentIndex].id,
        "description": publishDescription
      })

      toast.success("Successfuly published.")
      setPublisheds([...publisheds, photos[currentIndex].id])
    } catch (err) {
      toast.error("Can not publish.")
    }
  }

  const [voteLoading, setVoteLoading] = useState(false)

  async function vote(isLike: boolean) {
    let vote;
    if (voteLoading) return;

    const photoObject = {
      "id": photos[currentIndex].id,
    }

    try {
      if (userData?.upvotedImages?.findIndex((v: any) => v.id == photos[currentIndex].id) == -1) {
        vote = true
        upvoteImageUpdate(photoObject, "vote")
        setVoteLoading(true)
        const response = await PATCH('image/vote', {
          "id": photos[currentIndex].id,
          "type": 1
        })
        setVoteLoading(false)
      } else {
        upvoteImageUpdate(photoObject, "unvote")
        vote = false

        setVoteLoading(true)
        const response = await PATCH('image/vote', {
          "id": photos[currentIndex].id,
          "type": 0
        })
        setVoteLoading(false)
      }
    } catch (err) {
      toast.error(`Can not ${vote ? "vote" : "unvote"}.`)
      upvoteImageUpdate(photoObject, vote ? "unvote" : "vote")
    }
  }

  useEffect(() => {
    setPhotos(imagesGlobalStore.getState().generatedImages)

    imagesGlobalStore.subscribe(() => {
      setPhotos(imagesGlobalStore.getState().generatedImages)
    })
  }, []);

  return isModal ? (
    <div {...innerProps}>
      {!publisheds?.includes(photos[currentIndex]?.id) &&
        <div className={"w-full flex justify-center"}>
          <div className={"w-full flex flex-row absolute bottom-5 justify-center"}>
            <AnimatedSimpleInput
              labelText={"Give your design a name"}
              className={"w-2/12 xl:w-3/12 alwaysOnTop"}
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
                if (publishDescription.length >= 6 && publishDescription.length <= 50) {
                  publish();
                } else {
                  closeLB();
                  subscriptionToggleModal(true);
                }
              }}
              disabled={publishDescription.length < 6 || publishDescription.length > 50}
              className="xl:w-1/12 alwaysOnTop block text-stone-400 p-2 bg-[#1E1E1E] hover:bg-[#242424] focus:bg-[#242424] opacity-90 border border-[#6F6B6A] font-semibold hover:text-white designera-rounded ml-2 flex items-center justify-center"
              style={{ height: 56, width: 56 }}
            >
              <FontAwesomeIcon icon={faPaperPlane} color={"#AAA7A5"}
                style={{ paddingRight: 2, height: 30, width: 30 }} />
            </button>
          </div>
        </div>
      }
      <div className={"px-2 w-fit absolute left-0 bottom-5 flex flex-row gap-4"}>
        <IconButton
          description={"Download"}
          icon={
            <FontAwesomeIcon icon={faCircleDown} color={"#AAA7A5"} size={"xl"}
              style={{ width: 25, height: 25 }} />
          }
          onClick={() => ForceDownload(photos[currentIndex].src, "designera-" + photos[currentIndex].id)}
        />
        <IconButton
          description={"Like"}
          icon={
            <FontAwesomeIcon icon={faHeart} color={
              userData?.upvotedImages?.findIndex((v: any) => v.id == photos[currentIndex].id) == -1 ? "#AAA7A5" : "#FF6363"
            } size={"xl"} style={{ width: 25, height: 25 }} />
          }
          onClick={() => vote(true)}
        />
        <IconButton
          description={"Copy Style"}
          icon={<FontAwesomeIcon icon={faWandMagicSparkles} color={
            themes.findIndex((v) => v.id == photos[currentIndex].id) == -1 ? "#AAA7A5" : "#61A0FF"
          } size={"xl"}
            style={{ width: 25, height: 25 }} />} onClick={() => {
              if (themes.findIndex((v) => v.id == photos[currentIndex].id) == -1) {
                addImage({
                  id: photos[currentIndex].id,
                  url: photos[currentIndex].id,
                  style: photos[currentIndex].style
                })
              } else {
                removeImageById(photos[currentIndex].id)
              }
              themesSectionToggle(true)
            }} />
      </div>
    </div>
  ) : null;
}