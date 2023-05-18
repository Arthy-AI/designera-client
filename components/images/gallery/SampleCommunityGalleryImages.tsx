import React, {useCallback, useEffect, useState} from "react";
import Gallery from "react-photo-gallery";
import {IconButton} from "../../button/IconButton";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDownload, faHeart, faWandMagicSparkles} from "@fortawesome/free-solid-svg-icons";
import Carousel, {Modal, ModalGateway} from "react-images";
import {GalleryModalFooter} from "./GalleryModalFooter";
import {ReactProps} from "../../../interfaces/ReactProps";
import {GetMeta} from "../../../constants/GetMeta";
import {ImageWithFallback} from "../ImageWithFallback";
import {ForceDownload} from "../../../constants/ForceDownload";
import toast from "react-hot-toast";
import {useAxios} from "../../../hooks/useAxios";
import {UseAsThemeLogo} from "../../../assets/svg/UseAsThemeLogo";
import {imagesGlobal, imagesGlobalStore} from "../../../globals/images/images";
import {UseAsThemeFlatLogo} from "../../../assets/svg/UseAsThemeFlatLogo";

interface SampleCommunityGalleryImages extends ReactProps {
    images: any[]
}

export const SampleCommunityGalleryImages = ({images}: SampleCommunityGalleryImages) => {
    const [photos, setPhotos] = useState([{
        src: "",
        width: 4,
        height: 3,
        data: {
            title: "",
            username: "",
            likes: null
        }
    }] as any)
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const { PATCH } = useAxios();

    useEffect(() => {
        if (images.length < 1) return;

        async function formatImages() {
            let data = []
            for await (let image of images) {
                let photo = await GetMeta("https://cdn.designera.app/generated/" + image.id) as HTMLImageElement
                data.push({
                    src: "https://cdn.designera.app/generated/" + image.id,
                    width: photo.width,
                    height: photo.height,
                    data: {
                        id: image.id,
                        title: image.description,
                        username: image.user.firstName + ' ' + image.user.lastName,
                        createdAt: image.createdAt,
                        userAvatar: image.user.id,
                        likes: image.upvoteCount,
                        style: image.roomStyle,
                        type: image.roomType
                    }
                })
            }

            imagesGlobalStore.dispatch(imagesGlobal.actions.changeCommunityImages({
                images: [...data]
            }))

            setPhotos([...data])
        }

        formatImages()
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

    async function vote(isLike: boolean, index:number) {
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

    // @ts-ignore
    return (
        <div>
            <Gallery photos={photos} direction={"column"} margin={5}
                     renderImage={({index, left, top, photo}) => {
                         return photo.src ? (
                             <div key={index}
                                 onClick={(e: any) => {
                                     if ([...e.target.classList].includes("black-zone")) return openLightbox(e, {
                                         photo,
                                         index
                                     })
                                 }}
                                 style={{
                                     position: "absolute",
                                     left: left,
                                     top: top,
                                     borderRadius: "10px",
                                     overflow: "hidden"
                                 }}
                             >
                                 {/* @ts-ignore */}
                                 <img
                                     alt={"Gallery Image"}
                                     {...photo}
                                 />
                                 <div
                                     className={"top-0 absolute w-full h-full p-4 flex flex-row opacity-0 hover:opacity-100 transition duration-300 ease-in-out"}
                                     style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                                     <div className={"black-zone flex flex-col w-1/2 items-start"}>
                                         <IconButton
                                             icon={
                                                 <div className={"overflow-hidden designera-rounded"}>
                                                     <ImageWithFallback
                                                       width={50}
                                                       height={50}
                                                       src={`https://cdn.designera.app/avatar/${photos[index]?.data?.userAvatar}`}
                                                       alt={"Avatar"}
                                                       fallbackUrl={"/assets/images/unknown.png"}
                                                     />
                                                 </div>
                                             }
                                             className={"p-0.5"}
                                         />
                                     </div>
                                     <div className={"black-zone flex flex-col w-1/2 items-end gap-0.5 md:gap-4"}>
                                         <IconButton icon={<FontAwesomeIcon icon={faDownload} color={"#AAA7A5"} size={"xl"}
                                                                            style={{width: 25, height: 25}}/>}
                                                     onClick={() => ForceDownload(photos[index]?.src, "designera-" + photos[index]?.data?.id)}
                                         />
                                         <IconButton icon={<FontAwesomeIcon icon={faHeart} color={"#AAA7A5"} size={"xl"}
                                                                            style={{width: 25, height: 25}}/>}
                                                     onClick={() => vote(true, index)}
                                         />
                                         <IconButton icon={<FontAwesomeIcon icon={faWandMagicSparkles} color={"#AAA7A5"} size={"xl"}
                                                                            style={{width: 25, height: 25}}/>}
                                                     onClick={() => themeAdd(photos[index]?.data?.id, photos[index]?.src, photos[index]?.data?.style)}
                                         />
                                         <div className={"absolute right-0 bottom-0 pr-2 pb-2"}>
                                             <div
                                                 className={"sticky text-white font-semibold z-10 text-right flex flex-col text-xs leading-3"}>
                                                 { photos[index].data.title }
                                                 <small className={"font-thin"}>By { photos[index].data.username }</small>
                                                 <small className={"Font-Light font-thin text-stone-400"}>{ photos[index].data.likes } likes</small>
                                             </div>
                                             <div className={"black-zone absolute w-60 h-32 bottom-0 right-0 z-0"}
                                                  style={{
                                                      backgroundImage: 'url("https://media.discordapp.net/attachments/551764588136497152/1062682746914349098/Rectangle_9.png")',
                                                      backgroundSize: "cover"
                                                  }}/>
                                         </div>

                                     </div>
                                 </div>
                             </div>
                         ) : <div/>
                     }}/>
            { /* @ts-ignore */}
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            // @ts-ignore
                            views={photos.map((value, index) => {
                                return ({...value})
                            })}
                            components={{
                                // @ts-ignore
                                Footer: GalleryModalFooter
                            }}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
};