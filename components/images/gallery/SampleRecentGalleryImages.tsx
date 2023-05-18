import React, {ReactElement, useCallback, useEffect, useState} from "react";
import Image from 'next/image';
import {IconButton} from "../../button/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faHeart, faWandMagicSparkles} from "@fortawesome/free-solid-svg-icons";
import Carousel, {Modal, ModalGateway} from "react-images";
import {GalleryModalFooter} from "./GalleryModalFooter";
import {ReactProps} from "../../../interfaces/ReactProps";
import moment from "moment";
import "moment-duration-format";
import {ImageWithFallback} from '../ImageWithFallback';
import {imagesGlobal, imagesGlobalStore} from "../../../globals/images/images";
import {ForceDownload} from "../../../constants/ForceDownload";
import toast from "react-hot-toast";
import {useAxios} from "../../../hooks/useAxios";
import {UseAsThemeLogo} from "../../../assets/svg/UseAsThemeLogo";
import useAsTheme from "../../../hooks/themes/useAsTheme";
import {UseAsThemeFlatLogo} from "../../../assets/svg/UseAsThemeFlatLogo";

interface SampleRecentGalleryImages extends ReactProps {
  images: any[]
}

export const SampleRecentGalleryImages = ({images}: SampleRecentGalleryImages) => {
  const [photos, setPhotos] = useState([] as any)
  const {PATCH} = useAxios()
  const {addImage} = useAsTheme()
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  useEffect(() => {
    if (images?.length < 1) return;

    const formattedPhotos = images.map((value, index) => {
      return {
        src: "https://cdn.designera.app/generated/" + value.id,
        data: {
          id: value.id,
          title: value.description,
          username: value.user.firstName + ' ' + value.user.lastName,
          userAvatar: value.user.id,
          createdAt: value.createdAt,
          style: value.roomStyle,
          type: value.roomType
        }
      }
    })

    setPhotos(formattedPhotos)
  }, [images]);


  // @ts-ignore
  const openLightbox = useCallback((event, {photo, index}) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  async function vote(isLike: boolean, index: number) {
    try {
      const response = await PATCH('image/vote', {
        "id": photos[index]?.data?.id,
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

  return (
    <>
      {photos.length > 0 &&
          <div className="h-full flex flex-row gap-2 justify-center w-full">
              <div className="flex flex-col gap-2 h-full w-full lg:w-3/6 2xl:w-2/6">
                  <div className="bg-stone-400 designera-rounded relative overflow-hidden" style={{
                    backgroundImage: `url("${photos[0]?.src || ""}")`,
                    backgroundSize: "cover",
                    height: "45%"
                  }}>
                      <div
                          className={"top-0 absolute w-full h-full p-4 flex flex-row opacity-0 hover:opacity-100 transition duration-300 ease-in-out z-10"}
                          style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
                          onClick={(e: any) => {
                            if ([...e.target.classList].includes("black-zone")) return openLightbox(e, {
                              photo: photos[0]?.src,
                              index: 0
                            })
                          }}
                      >
                          <div className={"black-zone flex flex-col w-1/2 items-start"}>
                              <IconButton
                                  icon={
                                    <div className={"overflow-hidden designera-rounded"}>
                                      <ImageWithFallback
                                        width={50}
                                        height={50}
                                        src={`https://cdn.designera.app/avatar/${photos[0]?.data?.userAvatar}`}
                                        alt={photos[0]?.data?.userAvatar || "No info found"}
                                        style={{objectFit: 'contain'}}
                                        fallbackUrl={"/assets/images/unknown.png"}
                                      />
                                    </div>
                                  }
                                  className={"p-0.5"}
                              />
                          </div>
                          <div className={"black-zone flex flex-col w-1/2 items-end gap-4"}>
                              <IconButton icon={<FontAwesomeIcon icon={faDownload} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => ForceDownload(photos[0]?.src, "designera-" + photos[0]?.data?.id)}
                              />
                              <IconButton icon={<FontAwesomeIcon icon={faHeart} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => vote(true, 0)}
                              />
                              <IconButton icon={<FontAwesomeIcon icon={faWandMagicSparkles} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => themeAdd(photos[0]?.data?.id, photos[0]?.src, photos[0]?.data?.style)}
                              />
                          </div>
                      </div>
                      <div className={"absolute right-0 bottom-0 pr-2 pb-2"}>
                          <div
                              className={"sticky text-white font-semibold z-10 text-right flex flex-col text-xs leading-3"}>
                            {photos[0]?.data?.title}
                              <small className={"font-thin"}>By {photos[0]?.data?.username}</small>
                              <small
                                  className={"Font-Light font-thin text-stone-400"}>{moment.duration(new Date().valueOf() - (new Date(photos[0]?.data?.createdAt))?.valueOf()).format(`D [Days], H [Hours], m [Minutes], s [Seconds]`)} Ago</small>
                          </div>
                          <div className={"black-zone absolute w-60 h-32 right-0 z-0"} style={{
                            backgroundImage: 'url("https://media.discordapp.net/attachments/551764588136497152/1062682746914349098/Rectangle_9.png")',
                            backgroundSize: "cover",
                            bottom: -13
                          }}/>
                      </div>
                  </div>
                  <div className="bg-stone-400 designera-rounded relative overflow-hidden" style={{
                    backgroundImage: `url("${photos[1]?.src || ""}")`,
                    backgroundSize: "cover",
                    height: "55%"
                  }}>
                      <div
                          className={"top-0 absolute w-full h-full p-4 flex flex-row opacity-0 hover:opacity-100 transition duration-300 ease-in-out z-10"}
                          style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
                          onClick={(e: any) => {
                            if ([...e.target.classList].includes("black-zone")) return openLightbox(e, {
                              photo: photos[1]?.src,
                              index: 1
                            })
                          }}
                      >
                          <div className={"black-zone flex flex-col w-1/2 items-start"}>
                              <IconButton
                                  icon={
                                    <div className={"overflow-hidden designera-rounded"}>
                                      <ImageWithFallback
                                        width={50}
                                        height={50}
                                        src={`https://cdn.designera.app/avatar/${photos[1]?.data?.userAvatar}`}
                                        alt={photos[1]?.data?.userAvatar || "No info found"}
                                        style={{objectFit: 'contain'}}
                                        fallbackUrl={"/assets/images/unknown.png"}
                                      />
                                    </div>
                                  }
                                  className={"p-0.5"}
                              />
                          </div>
                          <div className={"black-zone flex flex-col w-1/2 items-end gap-4"}>
                              <IconButton icon={<FontAwesomeIcon icon={faDownload} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => ForceDownload(photos[1]?.src, "designera-" + photos[1]?.data?.id)}
                              />
                              <IconButton icon={<FontAwesomeIcon icon={faHeart} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => vote(true, 1)}
                              />
                              <IconButton icon={<FontAwesomeIcon icon={faWandMagicSparkles} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => themeAdd(photos[1]?.data?.id, photos[1]?.src, photos[1]?.data?.style)}
                              />
                          </div>
                      </div>
                      <div className={"absolute right-0 bottom-0 pr-2 pb-2"}>
                          <div
                              className={"sticky text-white font-semibold z-10 text-right flex flex-col text-xs leading-3"}>
                            {photos[1]?.data?.title}
                              <small className={"font-thin"}>By {photos[1]?.data?.username}</small>
                              <small
                                  className={"Font-Light font-thin text-stone-400"}>{moment.duration(new Date().valueOf() - (new Date(photos[1]?.data?.createdAt))?.valueOf()).format(`D [Days], H [Hours], m [Minutes], s [Seconds]`)} Ago</small>
                          </div>
                          <div className={"black-zone absolute w-60 h-32 right-0 z-0"} style={{
                            backgroundImage: 'url("https://media.discordapp.net/attachments/551764588136497152/1062682746914349098/Rectangle_9.png")',
                            backgroundSize: "cover",
                            bottom: -13
                          }}/>
                      </div>
                  </div>
              </div>


              <div className="flex flex-col gap-2 h-full hidden lg:flex lg:w-3/6 2xl:w-2/6">
                  <div className="bg-stone-400 designera-rounded relative overflow-hidden" style={{
                    backgroundImage: `url("${photos[2]?.src || ""}")`,
                    backgroundSize: "cover",
                    height: "55%"
                  }}>
                      <div
                          className={"top-0 absolute w-full h-full p-4 flex flex-row opacity-0 hover:opacity-100 transition duration-300 ease-in-out z-10"}
                          style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
                          onClick={(e: any) => {
                            if ([...e.target.classList].includes("black-zone")) return openLightbox(e, {
                              photo: photos[2]?.src,
                              index: 2
                            })
                          }}
                      >
                          <div className={"black-zone flex flex-col w-1/2 items-start"}>
                              <IconButton
                                  icon={
                                    <div className={"overflow-hidden designera-rounded"}>
                                      <ImageWithFallback
                                        width={50}
                                        height={50}
                                        src={`https://cdn.designera.app/avatar/${photos[2]?.data?.userAvatar}`}
                                        alt={photos[2]?.data?.userAvatar || "No info found"}
                                        style={{objectFit: 'contain'}}
                                        fallbackUrl={"/assets/images/unknown.png"}
                                      />
                                    </div>
                                  }
                                  className={"p-0.5"}
                              />
                          </div>
                          <div className={"black-zone flex flex-col w-1/2 items-end gap-4"}>
                              <IconButton icon={<FontAwesomeIcon icon={faDownload} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => ForceDownload(photos[2]?.src, "designera-" + photos[2]?.data?.id)}
                              />
                              <IconButton icon={<FontAwesomeIcon icon={faHeart} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => vote(true, 2)}
                              />
                              <IconButton icon={<FontAwesomeIcon icon={faWandMagicSparkles} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => themeAdd(photos[2]?.data?.id, photos[2]?.src, photos[2]?.data?.style)}
                              />
                          </div>
                      </div>
                      <div className={"absolute right-0 bottom-0 pr-2 pb-2"}>
                          <div
                              className={"sticky text-white font-semibold z-10 text-right flex flex-col text-xs leading-3"}>
                            {photos[2]?.data?.title}
                              <small className={"font-thin"}>By {photos[2]?.data?.username}</small>
                              <small
                                  className={"Font-Light font-thin text-stone-400"}>{moment.duration(new Date().valueOf() - (new Date(photos[2]?.data?.createdAt))?.valueOf()).format(`D [Days], H [Hours], m [Minutes], s [Seconds]`)} Ago</small>
                          </div>
                          <div className={"black-zone absolute w-60 h-32 right-0 z-0"} style={{
                            backgroundImage: 'url("https://media.discordapp.net/attachments/551764588136497152/1062682746914349098/Rectangle_9.png")',
                            backgroundSize: "cover",
                            bottom: -13
                          }}/>
                      </div>
                  </div>
                  <div className="bg-stone-400 designera-rounded relative overflow-hidden" style={{
                    backgroundImage: `url("${photos[3]?.src || ""}")`,
                    backgroundSize: "cover",
                    height: "45%"
                  }}>
                      <div
                          className={"top-0 absolute w-full h-full p-4 flex flex-row opacity-0 hover:opacity-100 transition duration-300 ease-in-out z-10"}
                          style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
                          onClick={(e: any) => {
                            if ([...e.target.classList].includes("black-zone")) return openLightbox(e, {
                              photo: photos[3]?.src,
                              index: 3
                            })
                          }}
                      >
                          <div className={"black-zone flex flex-col w-1/2 items-start"}>
                              <IconButton
                                  icon={
                                    <div className={"overflow-hidden designera-rounded"}>
                                      <ImageWithFallback
                                        width={50}
                                        height={50}
                                        src={`https://cdn.designera.app/avatar/${photos[3]?.data?.userAvatar}`}
                                        alt={photos[3]?.data?.userAvatar || "No info found"}
                                        style={{objectFit: 'contain'}}
                                        fallbackUrl={"/assets/images/unknown.png"}
                                      />
                                    </div>
                                  }
                                  className={"p-0.5"}
                              />
                          </div>
                          <div className={"black-zone flex flex-col w-1/2 items-end gap-4"}>
                              <IconButton icon={<FontAwesomeIcon icon={faDownload} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => ForceDownload(photos[3]?.src, "designera-" + photos[3]?.data?.id)}
                              />
                              <IconButton icon={<FontAwesomeIcon icon={faHeart} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => vote(true, 3)}
                              />
                              <IconButton icon={<FontAwesomeIcon icon={faWandMagicSparkles} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => themeAdd(photos[3]?.data?.id, photos[3]?.src, photos[3]?.data?.style)}
                              />
                          </div>
                      </div>
                      <div className={"absolute right-0 bottom-0 pr-2 pb-2"}>
                          <div
                              className={"sticky text-white font-semibold z-10 text-right flex flex-col text-xs leading-3"}>
                            {photos[3]?.data?.title}
                              <small className={"font-thin"}>By {photos[3]?.data?.username}</small>
                              <small
                                  className={"Font-Light font-thin text-stone-400"}>{moment.duration(new Date().valueOf() - (new Date(photos[3]?.data?.createdAt))?.valueOf()).format(`D [Days], H [Hours], m [Minutes], s [Seconds]`)} Ago</small>
                          </div>
                          <div className={"black-zone absolute w-60 h-32 right-0 z-0"} style={{
                            backgroundImage: 'url("https://media.discordapp.net/attachments/551764588136497152/1062682746914349098/Rectangle_9.png")',
                            backgroundSize: "cover",
                            bottom: -13
                          }}/>
                      </div>
                  </div>
              </div>


              <div className="flex flex-col gap-2 h-full w-2/6 hidden 2xl:flex">
                  <div className="bg-stone-400 designera-rounded relative overflow-hidden" style={{
                    backgroundImage: `url("${photos[4]?.src || ""}")`,
                    backgroundSize: "cover",
                    height: "45%"
                  }}>
                      <div
                          className={"top-0 absolute w-full h-full p-4 flex flex-row opacity-0 hover:opacity-100 transition duration-300 ease-in-out z-10"}
                          style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
                          onClick={(e: any) => {
                            if ([...e.target.classList].includes("black-zone")) return openLightbox(e, {
                              photo: photos[4]?.src,
                              index: 4
                            })
                          }}
                      >
                          <div className={"black-zone flex flex-col w-1/2 items-start"}>
                              <IconButton
                                  icon={
                                    <div className={"overflow-hidden designera-rounded"}>
                                      <ImageWithFallback
                                        width={50}
                                        height={50}
                                        src={`https://cdn.designera.app/avatar/${photos[4]?.data?.userAvatar}`}
                                        alt={photos[4]?.data?.userAvatar || "No info found"}
                                        style={{objectFit: 'contain'}}
                                        fallbackUrl={"/assets/images/unknown.png"}
                                      />
                                    </div>
                                  }
                                  className={"p-0.5"}
                              />
                          </div>
                          <div className={"black-zone flex flex-col w-1/2 items-end gap-4"}>
                              <IconButton icon={<FontAwesomeIcon icon={faDownload} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => ForceDownload(photos[4]?.src, "designera-" + photos[4]?.data?.id)}
                              />
                              <IconButton icon={<FontAwesomeIcon icon={faHeart} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => vote(true, 4)}
                              />
                              <IconButton icon={<FontAwesomeIcon icon={faWandMagicSparkles} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => themeAdd(photos[4]?.data?.id, photos[4]?.src, photos[4]?.data?.style)}
                              />
                          </div>
                      </div>
                      <div className={"absolute right-0 bottom-0 pr-2 pb-2"}>
                          <div
                              className={"sticky text-white font-semibold z-10 text-right flex flex-col text-xs leading-3"}>
                            {photos[4]?.data?.title}
                              <small className={"font-thin"}>By {photos[4]?.data?.username}</small>
                              <small
                                  className={"Font-Light font-thin text-stone-400"}>{moment.duration(new Date().valueOf() - (new Date(photos[4]?.data?.createdAt))?.valueOf()).format(`D [Days], H [Hours], m [Minutes], s [Seconds]`)} Ago</small>
                          </div>
                          <div className={"black-zone absolute w-60 h-32 right-0 z-0"} style={{
                            backgroundImage: 'url("https://media.discordapp.net/attachments/551764588136497152/1062682746914349098/Rectangle_9.png")',
                            backgroundSize: "cover",
                            bottom: -13
                          }}/>
                      </div>
                  </div>
                  <div className="bg-stone-400 designera-rounded relative overflow-hidden" style={{
                    backgroundImage: `url("${photos[5]?.src || ""}")`,
                    backgroundSize: "cover",
                    height: "55%"
                  }}>
                      <div
                          className={"top-0 absolute w-full h-full p-4 flex flex-row opacity-0 hover:opacity-100 transition duration-300 ease-in-out z-10"}
                          style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
                          onClick={(e: any) => {
                            if ([...e.target.classList].includes("black-zone")) return openLightbox(e, {
                              photo: photos[5]?.src,
                              index: 5
                            })
                          }}
                      >
                          <div className={"black-zone flex flex-col w-1/2 items-start"}>
                              <IconButton
                                  icon={
                                    <div className={"overflow-hidden designera-rounded"}>
                                      <ImageWithFallback
                                        width={50}
                                        height={50}
                                        src={`https://cdn.designera.app/avatar/${photos[5]?.data?.userAvatar}`}
                                        alt={photos[5]?.data?.userAvatar || "No info found"}
                                        style={{objectFit: 'contain'}}
                                        fallbackUrl={"/assets/images/unknown.png"}
                                      />
                                    </div>
                                  }
                                  className={"p-0.5"}
                              />
                          </div>
                          <div className={"black-zone flex flex-col w-1/2 items-end gap-4"}>
                              <IconButton icon={<FontAwesomeIcon icon={faDownload} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => ForceDownload(photos[5]?.src, "designera-" + photos[5]?.data?.id)}
                              />
                              <IconButton icon={<FontAwesomeIcon icon={faHeart} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => vote(true, 5)}
                              />
                              <IconButton icon={<FontAwesomeIcon icon={faWandMagicSparkles} color={"#AAA7A5"} size={"xl"}
                                                                 style={{width: 25, height: 25}}/>}
                                          onClick={() => themeAdd(photos[5]?.data?.id, photos[5]?.src, photos[5]?.data?.style)}
                              />
                          </div>
                      </div>
                      <div className={"absolute right-0 bottom-0 pr-2 pb-2"}>
                          <div
                              className={"sticky text-white font-semibold z-10 text-right flex flex-col text-xs leading-3"}>
                            {photos[5]?.data?.title}
                              <small className={"font-thin"}>By {photos[5]?.data?.username}</small>
                              <small
                                  className={"Font-Light font-thin text-stone-400"}>{moment.duration(new Date().valueOf() - (new Date(photos[5]?.data?.createdAt))?.valueOf()).format(`D [Days], H [Hours], m [Minutes], s [Seconds]`)} Ago</small>
                          </div>
                          <div className={"black-zone absolute w-60 h-32 right-0 z-0"} style={{
                            backgroundImage: 'url("https://media.discordapp.net/attachments/551764588136497152/1062682746914349098/Rectangle_9.png")',
                            backgroundSize: "cover",
                            bottom: -13
                          }}/>
                      </div>
                  </div>
              </div>
          </div>
      }

      { /* @ts-ignore */}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              // @ts-ignore
              views={photos}
              components={{
                // @ts-ignore
                Footer: GalleryModalFooter
              }}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </>
  );
};
