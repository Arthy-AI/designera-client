import React, {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import Carousel, {Modal, ModalGateway} from "react-images";
import {GalleryModalFooter} from "./GalleryModalFooter";
import {sidemenuSlice, sidemenuStore} from "../../sidemenu/SidemenuToggle";
import useAuth from '../../../hooks/auth/useAuth';
import {ProfileImagesGalleryModalFooter} from "./ProfileImagesGalleryModalFooter";

export const SampleProfileGalleryImages = ({tab, trigger, large, onClick}: { tab: string, trigger: number, large?: boolean, onClick?: (photo: any) => any }) => {
    const { userData } = useAuth()
    const [photos, setPhotos] = useState([])
    const [lightboxPhotos, setLightboxPhotos] = useState([])
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    // @ts-ignore
    const openLightbox = useCallback((event, {photo, index}) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    useEffect(() => {
        setPhotos((tab == `Likes` ? userData?.upvotedImages : userData?.images as any[])?.filter((v: any) =>
          tab == `Images` ? !v.description :
            tab == `Publishes` ? v.description :
              Object.keys(v).includes("description")
        ).map((value: any, index: number) => {
            return {
                src: "https://cdn.designera.app/generated/" + value.id,
                data: {
                    id: value.id,
                    title: value.description,
                    username: undefined,
                    userAvatar: undefined,
                    createdAt: value.createdAt,
                    style: value.roomStyle,
                    referenceId: value.referenceId,
                    referenceToggle: false,
                    hasDetectedLabels: value.hasDetectedLabels,
                    detectedItems: value.detectedItems,
                }
            }
        }))
    }, [tab, trigger])

    useEffect(() => {
        setLightboxPhotos((tab == `Likes` ? userData?.upvotedImages : userData?.images as any[])?.filter((v: any) =>
          tab == `Images` ? !v.description :
            tab == `Publishes` ? v.description :
              true
        ).map((value: any, index: number) => {
            return {
                src: `https://cdn.designera.app/${value.id?.includes("reference") ? "reference" : "generated"}/${value.id.split("|")[0]}` ,
                data: {
                    id: value.id,
                    title: value.description,
                    username: undefined,
                    userAvatar: undefined,
                    createdAt: value.createdAt,
                    style: value.roomStyle,
                    type: value.roomType,
                    referenceId: value.referenceId,
                    referenceToggle: false
                }
            }
        }))
    }, [userData, tab])

    return (
        <>
            {photos?.map((v: any, index: number) => {
                return (
                    <div key={index} className={`${large ? "w-16 h-16" : "w-16 h-16"} overflow-hidden object-contain cursor-pointer`} style={{
                        backgroundImage: `url(${v.src})`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center`
                    }} onClick={(e: any) => {
                        return large ?
                            onClick && onClick(photos[index])
                          : openLightbox(e, {
                            photo: v.src,
                            index
                        })
                    }}/>
                )
            })
            }

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
                                Footer: (props, context) => ProfileImagesGalleryModalFooter(props, tab)
                            }}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </>
    );
};
