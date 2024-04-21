import { ReactProps } from "../../interfaces/ReactProps";
import React, { useEffect, useState } from "react";
import { DesigneraLogo } from "../../assets/svg/DesigneraLogo";
import { background, useDisclosure } from "@chakra-ui/react";
import { DesigneraTitle } from "../../assets/svg/DesigneraTitle";
import { DesigneraTitleLarge } from "../../assets/svg/DesigneraTitleLarge";
import useAuth from "../../hooks/auth/useAuth";
import { ImageWithBlur } from '../images/ImageWithBlur';
import useSubscription from "../../hooks/subscription/useSubscription";
import { useAxios } from "../../hooks/useAxios";
import { useRouter } from "next/router";

export const Footer = ({ children, ...props }: ReactProps) => {
  const { GET } = useAxios();
  const { isLoggedIn, toggleModal, changeSection, userData } = useAuth();
  const { isOpen: SidemenuIsOpen, onOpen: SidemenuOnOpen, onClose: SidemenuOnClose } = useDisclosure();
  const { toggleModal: subscriptionToggleModal } = useSubscription();
  const router = useRouter();

  return (
    <div
      id="Footer"
      style={{
        backgroundColor: '#f0f0f0', // Background color
        borderTop: '2px solid #000000', // Stroke (border-top)
        height: '50px', // Height of the footer
        width: '100%', // Full width
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '3px',
        paddingRight: '4px',
        zIndex: 50 // Keeps footer above other elements
      }}
      className="flex items-center z-50">
      <div className={"w-full flex justify-between items-center"}>
        <div className={"cursor-pointer"} onClick={() => router.push("/")}>
          <DesigneraTitleLarge />
        </div>
      </div>
    </div>
  );
};
