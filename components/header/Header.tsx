import {ReactProps} from "../../interfaces/ReactProps";
import React, {useEffect, useState} from "react";
import {DesigneraLogo} from "../../assets/svg/DesigneraLogo";
import {Sidemenu} from "../sidemenu/Sidemenu";
import {useDisclosure} from "@chakra-ui/react";
import {SubscriptionModal} from "../subscription/SubscriptionModal";
import {DesigneraTitle} from "../../assets/svg/DesigneraTitle";
import {DesigneraTitleLarge} from "../../assets/svg/DesigneraTitleLarge";
import useAuth from "../../hooks/auth/useAuth";
import { ImageWithBlur } from '../images/ImageWithBlur';
import useSubscription from "../../hooks/subscription/useSubscription";
import toast from "react-hot-toast";
import {useAxios} from "../../hooks/useAxios";

export const Header = ({children, ...props}: ReactProps) => {
  const { GET } = useAxios()
  const {isLoggedIn, toggleModal, changeSection, userData} = useAuth()
  const {isOpen: SidemenuIsOpen, onOpen: SidemenuOnOpen, onClose: SidemenuOnClose} = useDisclosure()
  const { toggleModal: subscriptionToggleModal } = useSubscription()

  return (
    <div id={"Header"}
         className={"h-11 w-full fixed top-0 flex items-center pl-3 pr-4 bg-[#2f2f2f] designera-box-shadow z-50"}>
      <div id={"HeaderContainer"} className={"w-full flex justify-between items-center"}>
        <div className={"ml-2 mt-1 cursor-pointer"} id={"HeaderLogoContainer"} style={{height: "fit-content"}} onClick={() => window.location.reload()}>
          <DesigneraTitleLarge/>
        </div>
        <div id={"HeaderButtonGroup"} className={`flex flex-row ${isLoggedIn ? "gap-3" : "md:gap-6 gap-4"} items-center`}>
          {isLoggedIn ?
            <div
              className={"rounded-full w-9 h-9 cursor-pointer rounded-full border-2 border-transparent hover:border-2 hover:ring-stone-400 hover:border-stone-400 overflow-hidden"}
              onClick={() => {
                SidemenuOnOpen()
              }}>
              {
                userData.id &&
                <ImageWithBlur
                  alt={"Avatar"}
                  width={118}
                  height={118}
                  src={`https://cdn.designera.app/avatar/${userData.id}`}
                  fallbackUrl={"/assets/images/unknown.png"}
                />
              }
            </div> :
            <button className="text-white font-semibold select-none" onClick={() => {
              changeSection("login");
              toggleModal(true)
            }}>Login</button>
          }
          { !userData?.stripeCustomerId &&
          <button
            className="h-8 bg-blue-600 designera-rounded-3 p-90 text-white designera-box-shadow font-semibold px-3 select-none transition-colors ease-in-out duration-150 hover:bg-white hover:text-black"
            onClick={async () => {
              if (isLoggedIn) {
                try {
                  let networkHealth = await GET("network-health", {})
                  if (networkHealth.delay) {
                    subscriptionToggleModal(true)
                  }
                } catch {
                  toast.error("An error occurred.")
                }
              } else {
                changeSection("login");
                toggleModal(true)
              }
            }}>See Plans
          </button>
          }
        </div>
      </div>

      <Sidemenu isOpen={SidemenuIsOpen} onOpen={SidemenuOnOpen} onClose={SidemenuOnClose}/>
    </div>
  )
}
