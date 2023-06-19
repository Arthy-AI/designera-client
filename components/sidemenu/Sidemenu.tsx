import React, {useCallback, useEffect, useState} from "react";
import {ReactProps} from "../../interfaces/ReactProps";
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerFooter,
    useDisclosure,
} from '@chakra-ui/react'
import {SampleProfileGalleryImages} from "../images/gallery/SampleProfileGalleryImages";
import {DesigneraTitle} from "../../assets/svg/DesigneraTitle";
import {PrivacyPolicyModal} from "../modals/PrivacyPolicyModal";
import {TermsOfUseModal} from "../modals/TermsOfUseModal";
import {settingsSlice, settingsStore} from "./Settings";
import {faChevronLeft, faGear} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {sidemenuStore} from "./SidemenuToggle";
import { ImageWithBlur } from '../images/ImageWithBlur';
import useAuth from '../../hooks/auth/useAuth';
import {SimpleButton} from "../button/SimpleButton";
import {useRouter} from "next/router";
import {DynamicObject} from "../../constants/DynamicObject";
import axios from 'axios';
import {useAxios} from "../../hooks/useAxios";
import toast from 'react-hot-toast';
import { NetworkConfig } from '../../hooks/useAxios';
import useSubscription from "../../hooks/subscription/useSubscription";

interface Sidemenu extends ReactProps {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}

interface ObjMap {
    [key: string]: any
}

export const Sidemenu = ({children, isOpen, onClose, onOpen, ...props}: Sidemenu) => {
    const [profileGalleryTab, setProfileGalleryTab] = useState({
        tab: "Images",
        trigger: Date.now()
    })
    const {isOpen: PrivacyPolicyIsOpen, onOpen: PrivacyPolicyOnOpen, onClose: PrivacyPolicyOnClose} = useDisclosure()
    const {isOpen: TermsOfUseIsOpen, onOpen: TermsOfUseOnOpen, onClose: TermsOfUseOnClose} = useDisclosure()
    const [settingsIsOpen, setSettingsIsOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedImageObject, setSelectedImageObject] = useState({} as DynamicObject);
    const [menu, setMenu] = useState({
        currentMenu: {} as ObjMap,
        previousMenu: {},
        currentTitle: "",
        previousTitle: ""
    })
    const router = useRouter()
    const { GET } = useAxios()
    const {isLoggedIn, toggleModal, changeSection, userData} = useAuth()
    const {isOpen: SidemenuIsOpen, onOpen: SidemenuOnOpen, onClose: SidemenuOnClose} = useDisclosure()
    const { toggleModal: subscriptionToggleModal } = useSubscription()
    // SIDEBAR MENU SYSTEM

    useEffect(() => {
        settingsStore.subscribe(() => {
            setMenu(settingsStore.getState())
        })
    }, [])

    useEffect(() => {
        if (isOpen) {
            let tempProfileGalleryTab = profileGalleryTab
            tempProfileGalleryTab.trigger = Date.now()
            setProfileGalleryTab({...tempProfileGalleryTab})
        }
    }, [isOpen])

    function changeTab(tab: string) {
        let tempProfileGalleryTab = profileGalleryTab
        tempProfileGalleryTab.tab = tab
        setProfileGalleryTab({...tempProfileGalleryTab})
    }

    function changeMenu(v: string) {
        settingsStore.dispatch(settingsSlice.actions.changeMenu({v: v}))
    }
    function triggerFunction(v: string) {
        settingsStore.dispatch(settingsSlice.actions.triggerFunction({v: v}))
    }

    // SIDEBAR CONTROLLER

    useEffect(() => {
        sidemenuStore.subscribe(() => {
            if (sidemenuStore.getState().isOpen) {
                onOpen()
            } else {
                onClose()
            }
        })
    }, [])

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={() => {
                    onClose();
                    settingsStore.dispatch(settingsSlice.actions.reset())
                }}
                closeOnEsc={true}
            >
                <DrawerOverlay/>
                <DrawerContent style={{backgroundColor: "black", color: "white", width: "286px"}}>
                    <DrawerHeader className={"flex flex-row justify-between"}>
                        <button onClick={onClose}><FontAwesomeIcon icon={faChevronLeft} color={"#AAA7A5"} size={"xl"}
                                                                   style={{width: 20, height: 20}}/></button>
                        <button onClick={(e) => {
                            settingsStore.dispatch(settingsSlice.actions.reset())
                            if (menu.currentTitle == "Settings") {
                                setSettingsIsOpen(!settingsIsOpen)
                            } else if (!settingsIsOpen) {
                                setSettingsIsOpen(true)
                            }
                        }}>
                            <FontAwesomeIcon
                                icon={faGear}
                                color={"#AAA7A5"}
                                size={"xl"}
                                style={{width: 20, height: 20}}
                            />
                        </button>
                    </DrawerHeader>

                    <DrawerBody className={"scrollbar-hide"} style={{
                        paddingLeft: settingsIsOpen ? 0 : "0.375rem",
                        paddingRight: settingsIsOpen ? 0 : "0.375rem"
                    }}>
                        <div className={"flex flex-col gap-4"}>
                            <div id={"DrawerPersonalInfos"} className={"flex flex-col items-center gap-4"}>
                                <input
                                  onChange={(e) => {
                                      // Get the image and upload it to the server using multipart/form-data

                                      if ( !e.target.files || e.target.files.length === 0) {
                                        return;
                                      }

                                      const file = e.target.files[0]
                                      const formData = new FormData()
                                      formData.append('file', file)
                                      axios.put(NetworkConfig.API_URL+ 'user/avatar', formData, {
                                          headers: {
                                              'Content-Type': 'multipart/form-data',
                                              Authorization: `Bearer ${localStorage.getItem('token')}`
                                          }
                                      }).then((res) => {
                                          toast.success('Profile picture updated successfully');
                                          setTimeout(() => {
                                              router.reload()
                                          }, 1000)
                                      }).catch((err) => {
                                          toast.error('An error occurred while updating your profile picture')
                                          setTimeout(() => {
                                              router.reload()
                                          }
                                          , 1000)
                                      })
                                  }}
                                  type="file" id="avatar-file-input" style={{ display: 'none' }} />
                                <div className={'rounded-full flex justify-center items-center overflow-hidden w-[116px] h-[116px] border-4 border-gray-600 hover:border-white cursor-pointer'}>
                                  <ImageWithBlur
                                    onClick={() => {
                                      document.getElementById('avatar-file-input')?.click()
                                    }}
                                    width={118}
                                    height={118}
                                    className={'rounded-full'}
                                    src={'https://cdn.designera.app/avatar/' + userData?.id}
                                    alt={"Profile Picture"}
                                    fallbackUrl={"/assets/images/unknown.png"}
                                  />
                              </div>
                                <span className={"font-semibold"}>{ userData?.firstName + ' ' + userData?.lastName }</span>
                                { !userData?.subscription && <div id={"CreditsContainer"} className={"flex flex-row gap-2"}>
                                    <div
                                        className={"bg-stone-700 px-3 designera-rounded designera-box-shadow font-bold flex items-center text-lg"}>
                                        {userData?.credits && userData?.credits}
                                    </div>
                                    <button
                                        className="bg-blue-600 designera-rounded p-1 px-3 text-white designera-box-shadow font-semibold transition-colors ease-in-out duration-150 hover:bg-white hover:text-black"
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
                                        }}>Subscribe
                                    </button>
                                </div>}
                            </div>
                            {!settingsIsOpen ?
                                <>
                                    <div>
                                        <div className={"flex flex-row justify-center items-center gap-2"}>
                                            <span className={"cursor-pointer font-semibold"}
                                                  style={{color: profileGalleryTab.tab == "Images" ? "white" : "#333333"}}
                                                  onClick={() => {
                                                      changeTab("Images")
                                                  }}>
                                                Images
                                            </span>
                                            <span className={"cursor-pointer font-semibold"}
                                                  style={{color: profileGalleryTab.tab == "Likes" ? "white" : "#333333"}}
                                                  onClick={() => {
                                                      changeTab("Likes")
                                                  }}>
                                                Likes
                                            </span>
                                            <span className={"cursor-pointer font-semibold"}
                                                  style={{color: profileGalleryTab.tab == "Publishes" ? "white" : "#333333"}}
                                                  onClick={() => {
                                                      changeTab("Publishes")
                                                  }}>
                                                Publishes
                                            </span>
                                        </div>
                                        <hr className={"bg-stone-400 border-none h-px"}/>
                                    </div>
                                    <div className={"flex flex-row flex-wrap gap-1.5 justify-start"}>
                                        <SampleProfileGalleryImages tab={profileGalleryTab.tab} trigger={profileGalleryTab.trigger}/>
                                    </div>
                                </>
                                :
                                <>
                                    <div>
                                        <span className={"block font-semibold text-white text-center"}>
                                            {menu.currentTitle}
                                        </span>
                                        <hr className={"bg-stone-400 border-none h-px"}/>
                                    </div>
                                    {
                                        React.isValidElement(menu.currentMenu) ?
                                            menu.currentMenu
                                            :
                                            <div className="flex flex-col Font-Light">
                                                {Object.keys(menu.currentMenu).map((v, i) => {
                                                    if (!userData.plan && v == "Manage Plan") return;
                                                    return (
                                                        <>
                                                            <div
                                                                className={`Font-Medium cursor-pointer border-white text-stone-300 ${i == 0 ? "p-4 pt-0" : "p-4"}`}
                                                                onClick={(e) => {
                                                                    typeof menu.currentMenu[v] == "function" ? triggerFunction(v) : changeMenu(v)
                                                                }}
                                                            >
                                                                {v}
                                                            </div>
                                                            <hr className={"bg-stone-400 border-none h-px"}/>
                                                        </>
                                                    )
                                                })}
                                            </div>
                                    }
                                </>
                            }
                        </div>
                    </DrawerBody>
                    <DrawerFooter style={{justifyContent: "center"}}>
                        <div className={"w-full flex flex-col justify-center font-semibold items-center"}>
                            <div className={"my-5 flex flex-col justify-center items-center"}>
                                <small className="text-[#979797] hover:text-[#c7c7c7] block cursor-pointer"
                                       onClick={() => { router.push('/privacy-policy') }}><u>Privacy
                                    Policy</u></small>
                                <small className="text-[#979797] hover:text-[#c7c7c7] block cursor-pointer"
                                       onClick={() => { router.push('/terms-of-use') }}><u>Terms of
                                    Use</u></small>
                                <small className="text-[#979797] hover:text-[#c7c7c7] block cursor-pointer"
                                       onClick={() => { router.push('/about-us-contact') }}><u>About Us & Contact</u></small>
                            </div>

                            <div style={{height: "fit-content"}}>
                                <DesigneraTitle/>
                            </div>
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <PrivacyPolicyModal isOpen={PrivacyPolicyIsOpen} onOpen={PrivacyPolicyOnOpen}
                                onClose={PrivacyPolicyOnClose}/>
            <TermsOfUseModal isOpen={TermsOfUseIsOpen} onOpen={TermsOfUseOnOpen} onClose={TermsOfUseOnClose}/>
        </>
    )
}
