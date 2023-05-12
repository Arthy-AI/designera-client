import React, {useCallback, useEffect, useState} from "react";
import Image from "next/image";
import Carousel, {Modal, ModalGateway} from "react-images";
import {GalleryModalFooter} from "./GalleryModalFooter";
import {sidemenuSlice, sidemenuStore} from "../../sidemenu/SidemenuToggle";
import useAuth from '../../../hooks/auth/useAuth';

export const SampleProfileGalleryImages = ({tab}: { tab: string }) => {
    const [photos, setPhotos] = useState([])
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const { userData } = useAuth()

    // @ts-ignore
    const openLightbox = useCallback((event, {photo, index}) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <>
            {(tab == `Likes` ? userData?.upvotedImages : userData?.images as any[])?.filter((v: any) =>
                tab == `Images` ? !v.description :
                  tab == `Publishes` ? v.description :
                    true
            ).map((v: any, index: number) => {
                return (
                    <div key={index} className={"w-16 h-16"}>
                        <Image
                          // onClick={(e) => openLightbox(e, {photo: v.id, index})}
                               src={"https://cdn.designera.app/generated/" + v.id}
                               alt="Designera Photo"
                               width={200}
                               height={200}
                        />
                    </div>
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
