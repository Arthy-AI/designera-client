import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faArrowUpRightFromSquare, faCopy,
  faDownload,
  faHeart,
  faPaperPlane, faWandMagicSparkles
} from "@fortawesome/free-solid-svg-icons";
import {IconButton} from "../../button/IconButton";
import {AnimatedSimpleInput} from "../../input/AnimatedSimpleInput";
import {DynamicObject} from "../../../constants/DynamicObject";
import {imagesGlobalStore} from "../../../globals/images/images";
import toast from "react-hot-toast";
import {useAxios} from "../../../hooks/useAxios";
import {ForceDownload} from "../../../constants/ForceDownload";
import {UseAsThemeLogo} from "../../../assets/svg/UseAsThemeLogo";
import useAsTheme from "../../../hooks/themes/useAsTheme";
import {UseAsThemeFlatLogo} from "../../../assets/svg/UseAsThemeFlatLogo";
import useAuth from "../../../hooks/auth/useAuth";
import useSubscription from "../../../hooks/subscription/useSubscription";
import {Tooltip as ReactTooltip} from "react-tooltip";

export const GeneratedImageModalFooter = ({innerProps, isModal, currentIndex}: DynamicObject, closeLB: () => void) => {
  const {addImage} = useAsTheme()
  const {POST, PATCH} = useAxios()
  const {userData} = useAuth()
  const {toggleModal: subscriptionToggleModal} = useSubscription()
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

  async function vote(isLike: boolean) {
    try {
      const response = await PATCH('image/vote', {
        "id": photos[currentIndex].id,
        "type": Number(isLike)
      })

      toast.success("Vote successful.")
    } catch (err) {
      toast.error("Can not vote.")
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
                      className={"w-2/12 xl:w-3/12"}
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
                        if ((userData?.subscription?.isActive)) {
                          publish()
                        } else {
                          closeLB()
                          subscriptionToggleModal(true)
                        }
                      }}
                      disabled={publishDescription.length < 6 || publishDescription.length > 50}
                      className="xl:w-1/12 block text-stone-400 p-2 bg-[#1E1E1E] hover:bg-[#242424] focus:bg-[#242424] opacity-90 border border-[#6F6B6A] font-semibold hover:text-white designera-rounded ml-2 flex items-center justify-center"
                      style={{height: 56, width: 56}}
                  >
                      <FontAwesomeIcon icon={faPaperPlane} color={"#AAA7A5"}
                                       style={{paddingRight: 2, height: 30, width: 30}}/>
                  </button>
              </div>
          </div>
      }
      <div className={"px-2 w-fit absolute left-0 bottom-5 flex flex-row gap-4"}>
        <IconButton
          description={"Download"}
          icon={
            <FontAwesomeIcon icon={faDownload} color={"#AAA7A5"} size={"xl"}
                             style={{width: 25, height: 25}}/>
          }
          onClick={() => ForceDownload(photos[currentIndex].src, "designera-" + photos[currentIndex].id)}
        />
        <IconButton
          description={"Like"}
          icon={
            <FontAwesomeIcon icon={faHeart} color={"#AAA7A5"} size={"xl"} style={{width: 25, height: 25}}/>
          }
          onClick={() => vote(true)}
        />
        <IconButton
          description={"Copy Style"}
          icon={<FontAwesomeIcon icon={faWandMagicSparkles} color={"#AAA7A5"} size={"xl"}
                                 style={{width: 25, height: 25}}/>} onClick={() => addImage({
          id: photos[currentIndex].id,
          url: photos[currentIndex].id,
          style: photos[currentIndex].style
        })}/>
      </div>
    </div>
  ) : null;
}