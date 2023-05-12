import {ReactProps} from "../../interfaces/ReactProps";
import React, {useState} from "react";
import {DesigneraLogo} from "../../assets/svg/DesigneraLogo";
import {Sidemenu} from "../sidemenu/Sidemenu";
import {useDisclosure} from "@chakra-ui/react";
import {SubscriptionModal} from "../subscription/SubscriptionModal";
import {DesigneraTitle} from "../../assets/svg/DesigneraTitle";
import {DesigneraTitleLarge} from "../../assets/svg/DesigneraTitleLarge";
import useAuth from "../../hooks/auth/useAuth";
import { ImageWithFallback } from '../images/ImageWithFallback';

export const Header = ({children, ...props}: ReactProps) => {
  const {isLoggedIn, toggleModal, changeSection, userData} = useAuth()
  const [selectedSubscription, setSelectedSubscription] = useState(0);
  const {isOpen: SidemenuIsOpen, onOpen: SidemenuOnOpen, onClose: SidemenuOnClose} = useDisclosure()
  const {isOpen: SubscriptionIsOpen, onOpen: SubscriptionOnOpen, onClose: SubscriptionOnClose} = useDisclosure()

  function changeSubscription(index: number) {
    setSelectedSubscription(index)
  }

  return (
    <div id={"Header"}
         className={"h-11 w-full fixed top-0 flex items-center pl-3 pr-4 bg-[#2f2f2f] designera-box-shadow z-50"}>
      <div id={"HeaderContainer"} className={"w-full flex justify-between items-center"}>
        <div className={"ml-2 mt-1"} id={"HeaderLogoContainer"} style={{height: "fit-content"}}>
          <DesigneraTitleLarge/>
        </div>
        <div id={"HeaderButtonGroup"} className={`flex flex-row ${isLoggedIn ? "gap-4" : "md:gap-10 gap-4"}`}>
          {isLoggedIn ?
            <div
              className={"rounded-full w-9 h-9 cursor-pointer rounded-full border-0 border-transparent hover:border-2 hover:ring-stone-400 hover:border-stone-400 overflow-hidden"}
              onClick={() => {
                SidemenuOnOpen()
              }}>
              <ImageWithFallback
                alt={"Avatar"}
                width={36}
                height={36}
                src={`https://cdn.designera.app/avatar/${userData.id}`}
                fallbackUrl={"/assets/images/unknown.png"}
              />
            </div> :
            <button className="text-white font-semibold select-none" onClick={() => {
              changeSection("login");
              toggleModal(true)
            }}>Login</button>
          }
          { !userData?.subscription &&
          <button
            className="h-9 bg-blue-600 designera-rounded p-1 text-white designera-box-shadow font-semibold px-4 select-none"
            onClick={() => {
              if (isLoggedIn) {
                SubscriptionOnOpen()
              } else {
                changeSection("login");
                toggleModal(true)
              }
            }}>Subscribe
          </button>
          }
        </div>
      </div>

      <Sidemenu isOpen={SidemenuIsOpen} onOpen={SidemenuOnOpen} onClose={SidemenuOnClose}/>
      <SubscriptionModal isOpen={SubscriptionIsOpen} onOpen={SubscriptionOnOpen} onClose={SubscriptionOnClose}
                         selected={selectedSubscription} onSelect={changeSubscription}/>
    </div>
  )
}
