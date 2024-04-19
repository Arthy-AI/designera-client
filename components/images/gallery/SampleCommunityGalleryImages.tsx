import React, { useCallback, useEffect, useState } from "react";
import Gallery from "react-photo-gallery";
import { IconButton } from "../../button/IconButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlassDollar, faBookmark, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import Carousel, { Modal, ModalGateway } from "react-images";
import { GalleryModalFooter } from "./GalleryModalFooter";
import { ReactProps } from "../../../interfaces/ReactProps";
import { GetMeta } from "../../../constants/GetMeta";
import { ForceDownload } from "../../../constants/ForceDownload";
import toast from "react-hot-toast";
import { useAxios } from "../../../hooks/useAxios";
import { imagesGlobal, imagesGlobalStore } from "../../../globals/images/images";
import useAuth from "../../../hooks/auth/useAuth";
import useAsTheme from "../../../hooks/themes/useAsTheme";
import { ImageWithFallback } from "../ImageWithFallback";
import { useRouter } from "next/router";
import zIndex from "@mui/material/styles/zIndex";

interface SampleCommunityGalleryImages extends ReactProps {
    images: any[]
}

export const SampleCommunityGalleryImages = ({ images }: SampleCommunityGalleryImages) => {
    const { userData, upvoteImageUpdate } = useAuth()
    const { decrementCreditBalance, isLoggedIn, toggleModal, changeSection } = useAuth()
    const router = useRouter()
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

    const calculateColumns = (containerWidth: number) => {
        if (containerWidth < 600) {
            return 2;
        } else if (containerWidth < 900) {
            return 3;
        } else if (containerWidth < 1200) {
            return 4;
        } else if (containerWidth < 1600) {
            return 5;
        } else if (containerWidth < 2000) {
            return 6;
        } else {
            return 8;
        }
    };

    const [lightboxPhotos, setLightboxPhotos] = useState([] as any[])
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const { themesSectionToggle, themes, removeImageById } = useAsTheme()
    const { PATCH } = useAxios();

    useEffect(() => {
        if (images?.length < 1) return;
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
                        title: image.description || "",
                        username: image.user.firstName + ' ' + image.user.lastName,
                        createdAt: image.createdAt,
                        userAvatar: image.user.id,
                        likes: image.upvoteCount,
                        style: image.roomStyle,
                        type: image.roomType,
                        referenceId: image.referenceId,
                        referenceToggle: false
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

    useEffect(() => {
        imagesGlobalStore.subscribe(() => {
            setLightboxPhotos(imagesGlobalStore.getState().communityImages)
        })
    }, [])

    // @ts-ignore
    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    const [voteLoading, setVoteLoading] = useState(false)
    async function vote(isLike: boolean, index: number) {
        let vote;
        if (voteLoading) return;

        try {
            if (userData?.upvotedImages?.findIndex((v: any) => v.id == photos[index]?.data?.id) == -1) {
                vote = true
                upvoteImageUpdate(images[index], "vote")
                setVoteLoading(true)
                const response = await PATCH('image/vote', {
                    "id": photos[index]?.data?.id,
                    "type": 1
                })
                setVoteLoading(false)
            } else {
                upvoteImageUpdate(images[index], "unvote")
                vote = false

                setVoteLoading(true)
                const response = await PATCH('image/vote', {
                    "id": photos[index]?.data?.id,
                    "type": 0
                })
                setVoteLoading(false)
            }
        } catch (err) {
            toast.error(`Can not ${vote ? "vote" : "unvote"}.`)
            upvoteImageUpdate(images[index], vote ? "unvote" : "vote")
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

    // @ts-ignore
    return (
        <div>
            <Gallery photos={photos} direction={"column"} margin={2} columns={calculateColumns}
                renderImage={({ index, left, top, photo }) => {
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
                            {/* Animation wrapper */}
                            <div style={{
                                animation: `fadeInAnimation 0.1s ${index * 0.1}s ease-out forwards`,
                                opacity: 0 // Start with opacity 0 to ensure fade-in effect
                            }}>
                                {/* @ts-ignore */}
                                <img
                                    alt={"Gallery Image"}
                                    {...photo}
                                />
                            </div>
                            <div
                                className={"top-0 absolute w-full h-full p-2 flex flex-row opacity-0 hover:opacity-100 transition duration-300 ease-in-out"}
                                style={{
                                    backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
                                <div className={"black-zone flex flex-col w-1/2 items-start"}>
                                    <IconButton
                                        icon={
                                            <div className={"overflow-hidden designera-rounded-lg"}>
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
                                <div className={"black-zone flex flex-col w-1/2 items-end gap-0.5 md:gap-2"}>
                                    <IconButton
                                        description="Save"
                                        onClick={() => {
                                            if (!isLoggedIn) {
                                                changeSection("login");
                                                toggleModal(true);
                                            } else {
                                                vote(true, index);
                                            }
                                        }}
                                        icon={
                                            <FontAwesomeIcon
                                                icon={faBookmark}
                                                color={
                                                    userData?.upvotedImages?.findIndex((v: any) => v.id == photos[index]?.data?.id) == -1
                                                        ? "#AAA7A5"
                                                        : "#FFD966"
                                                }
                                                size="xl"
                                                style={{ width: 18, height: 18 }}
                                            />
                                        }
                                    />
                                    <IconButton description={"Copy Style"} icon={<FontAwesomeIcon icon={faWandMagicSparkles} color={
                                        themes.findIndex((v) => v.id == photos[index]?.data?.id) == -1 ? "#AAA7A5" : "#61A0FF"
                                    } size={"xl"}
                                        style={{ width: 25, height: 25 }} />}
                                        onClick={() => themeAdd(photos[index]?.data?.id, photos[index]?.src, photos[index]?.data?.style)}
                                    />
                                    <div className={"absolute right-0 bottom-0 pr-2 pb-2"}>
                                        <div className="sticky text-white z-10 text-right flex flex-col text-xs leading-3">
                                            {/* Handle images without a title gracefully */}
                                            <small style={{ fontSize: '1.1em', textTransform: 'capitalize' }}>{photos[index]?.data?.title || 'Untitled'}</small>
                                            <small className="font-thin mt-1" style={{ textTransform: 'capitalize' }}>By {photos[index]?.data?.username}</small>
                                        </div>
                                        <div className={"black-zone absolute w-60 h-32 bottom-0 right-0 z-0"}
                                            style={{
                                                backgroundImage: 'url("/assets/images/Rectangle_9.png")',
                                                backgroundSize: "cover"
                                            }} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    ) : <div key={index}></div>
                }} />
            { /* @ts-ignore */}
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            // @ts-ignore
                            views={lightboxPhotos}
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
