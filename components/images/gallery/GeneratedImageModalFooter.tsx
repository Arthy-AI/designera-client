import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faArrowRotateLeft,
  faArrowUpRightFromSquare, faCopy,
  faDownload,
  faHeart,
  faPaperPlane
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

export const GeneratedImageModalFooter = ({innerProps, isModal, currentIndex}: DynamicObject, closeLB: () => void) => {
  const {addImage} = useAsTheme()
  const {POST, PATCH} = useAxios()
  const { userData } = useAuth()
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
          <div className={"w-full flex flex-col absolute left-0 top-24 sm:top-10 items-center"}>
              <AnimatedSimpleInput
                  labelText={"Give your design a name"}
                  className={"w-11/12 xl:w-2/3"}
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
                      closeLB()
                      subscriptionToggleModal(true)
                    }
                  }}
                  disabled={publishDescription.length < 6 || publishDescription.length > 50}
                  className="w-10/12 xl:w-1/12 h-full text-stone-400 p-2 bg-[#3E3E3E] border border-[#6F6B6A] font-semibold hover:text-white designera-rounded ml-2 flex items-center justify-center"
                  style={{height: 52}}
              >
                  Send <FontAwesomeIcon icon={faPaperPlane} color={"#AAA7A5"} height={30} width={30}
                                        style={{marginLeft: 10}}/>
              </button>
          </div>
      }
      <div className={"px-2 w-full absolute right-0 bottom-5 flex flex-row gap-4 justify-center"}>
        <IconButton
          icon={
            <FontAwesomeIcon icon={faDownload} color={"#AAA7A5"} size={"xl"}
                             style={{width: 25, height: 25}}/>
          }
          onClick={() => ForceDownload(photos[currentIndex].src, "designera-" + photos[currentIndex].id)}
        />
        <IconButton
          icon={
            <FontAwesomeIcon icon={faHeart} color={"#AAA7A5"} size={"xl"} style={{width: 25, height: 25}}/>
          }
          onClick={() => vote(true)}
        />
        <IconButton
          icon={<UseAsThemeFlatLogo/>} onClick={() => addImage({ id: photos[currentIndex].id, url: photos[currentIndex].id, style: photos[currentIndex].style })}/>
      </div>
    </div>
  ) : null;
}