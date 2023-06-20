import {Heading, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import {SubHeading} from "../heading/SubHeading";
import {MutedSmall} from "../text/small/MutedSmall";
import React from "react";
import {ReactProps} from "../../interfaces/ReactProps";

interface SubscriptionCards extends ReactProps {
    selected: number,
    onSelect: (index: number) => void,
}

export const SubscriptionCards = ({children, selected, onSelect, ...props}: SubscriptionCards) => {
    return (
        <div className={"h-fit grid grid-cols-1 sm:grid-cols-3 gap-6 mb-2"}>
            <div
                className={"h-fit bg-[#2b2b2b] text-white border-4 designera-rounded-2 p-2 px-2 md:p-7 md:px-0 flex flex-col items-center gap-1 cursor-pointer"}
                style={{borderColor: selected == 1 ? "#FF9900" : "#4d4d4d"}}
                onClick={() => {
                    onSelect(1)
                }}
            >
                <h1 className={"italic text-center text-lg md:text-3xl font-semibold whitespace-nowrap"}>One Timer!</h1>
                <div className={"SubscriptionThumbnailContainer w-fit relative my-10 flex justify-center"}>
                    <div className={"block w-36 h-24 md:w-44 md:h-36 bg-[#414141] z-20 rounded-3xl p-4"}>
                        <img
                            src="/assets/images/Interior-vector_1.png"/>
                    </div>
                    <div className={"top-0 absolute w-36 h-24 md:w-44 md:h-36 bg-[#69343F] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "-15deg"}}>
                    </div>
                </div>
                <div className={"Description Font-Light text-center text-xs text-stone-200 mb-3 w-4/5"}>
                    As you subscribe to <span className="Font-Medium text-orange-400">Designera</span>,
                    You
                    will access all
                    of it’s features without <span className={"Font-Regular"}>limitations or additional fees</span>
                </div>
                <div className={"SubscriptionThumbnailContainer relative my-5 flex justify-center"}>
                    <div
                        className={"relative w-32 h-24 md:w-32 md:h-28 bg-[#111111] z-20 rounded-3xl flex flex-col gap-1 justify-center items-center"}>
                        <div className={"flex flex-row items-end justify-end italic"}>
                            <h1 className="Font-Black text-4xl text-white select-none">
                                $2
                            </h1>
                            <h1 className="Font-Bold text-xl text-white select-none">
                                ,90
                            </h1>
                        </div>
                        <small className="Font-Medium text-gray-400 text-center leading-3 block pb-3 italic">
                            for 7 days!
                        </small>
                    </div>
                    <div className={"top-0 absolute w-32 h-24 md:w-32 md:h-28 bg-[#69343F] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "15deg"}}>
                    </div>
                </div>
            </div>

            <div
                className={"h-fit bg-[#2b2b2b] text-white border-4 designera-rounded-2 p-2 px-2 md:p-7 md:px-0 flex flex-col items-center gap-1 cursor-pointer relative"}
                style={{borderColor: selected == 2 ? "#FF9900" : "#4d4d4d"}}
                onClick={() => {
                    onSelect(2)
                }}>
                <div className={"py-1 px-4 hidden md:block md:text-lg bg-[#FF8924] Font-Bold rounded-full absolute designera-box-shadow"}
                     style={{left: "52%", top: "-3%", fontSize: 22}}>Popular
                </div>
                <h1 className={"italic text-center text-lg md:text-3xl font-semibold"}>Monthly</h1>
                <div className={"SubscriptionThumbnailContainer w-fit relative my-10 flex justify-center"}>
                    <div
                        className={"relative w-36 h-24 md:w-44 md:h-36 bg-[#414141] z-20 rounded-3xl flex justify-center items-center"}>
                        <img
                            src="/assets/images/Interior-vector_2.png"/>
                    </div>
                    <div className={"top-0 absolute w-36 h-24 md:w-44 md:h-36 bg-[#7A673D] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "-15deg"}}>
                    </div>
                </div>
                <div className={"Description Font-Light text-center text-xs text-stone-200 mb-3 w-4/5"}>
                    As you subscribe to <span className="Font-Medium text-orange-400">Designera</span>,
                    You
                    will access all
                    of it’s features without <span className={"Font-Regular"}>limitations or additional fees</span>
                </div>
                <div className={"SubscriptionThumbnailContainer relative my-5 flex justify-center"}>
                    <div
                        className={"relative w-32 h-24 md:w-32 md:h-28 bg-[#111111] z-20 rounded-3xl flex flex-col gap-1 justify-center items-center"}>
                        <div className={"flex flex-row items-end justify-end italic"}>
                            <h1 className="Font-Black text-4xl text-white select-none">
                                $9
                            </h1>
                            <h1 className="Font-Bold text-xl text-white select-none">
                                ,90
                            </h1>
                        </div>
                        <small className="Font-Medium text-gray-400 text-center leading-3 block pb-3 italic">
                            per month
                        </small>
                    </div>
                    <div className={"top-0 absolute w-32 h-24 md:w-32 md:h-28 bg-[#7A673D] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "15deg"}}>
                    </div>
                </div>
            </div>

            <div
                className={"h-fit bg-[#2b2b2b] text-white border-4 designera-rounded-2 p-2 px-2 md:p-7 md:px-0 flex flex-col items-center gap-1 cursor-pointer relative"}
                style={{borderColor: selected == 3 ? "#FF9900" : "#4d4d4d"}}
                onClick={() => {
                    onSelect(3)
                }}>
                <div className={"py-1 px-4 hidden md:block md:text-lg bg-[#4C8531] Font-Bold rounded-full absolute designera-box-shadow"}
                     style={{left: "40%", top: "-3%", fontSize: 22, whiteSpace: "nowrap"}}>Best Value
                </div>
                <h1 className={"italic text-center text-lg md:text-3xl font-semibold"}>Yearly</h1>
                <div className={"SubscriptionThumbnailContainer w-fit relative my-10 flex justify-center"}>
                    <div
                        className={"relative w-36 h-24 md:w-44 md:h-36 bg-[#414141] z-20 rounded-3xl flex justify-center items-center"}>
                        <img
                            src="/assets/images/Interior-vector_3.png"/>
                    </div>
                    <div className={"top-0 absolute w-36 h-24 md:w-44 md:h-36 bg-[#767B52] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "-15deg"}}>
                    </div>
                </div>
                <div className={"Description Font-Light text-center text-xs text-stone-200 mb-3 w-4/5"}>
                    As you subscribe to <span className="Font-Medium text-orange-400">Designera</span>,
                    You
                    will access all
                    of it’s features without <span className={"Font-Regular"}>limitations or additional fees</span>
                </div>
                <div className={"SubscriptionThumbnailContainer relative my-5 flex justify-center"}>
                    <div
                        className={"relative w-32 h-24 md:w-32 md:h-28 bg-[#111111] z-20 rounded-3xl flex flex-col gap-1 justify-center items-center"}>
                        <div className={"flex flex-row items-end justify-end italic"}>
                            <h1 className="Font-Black text-4xl text-white select-none">
                                $79
                            </h1>
                            <h1 className="Font-Bold text-xl text-white select-none">
                                ,90
                            </h1>
                        </div>
                        <small className="Font-Medium text-gray-400 text-center leading-3 block pb-3 italic">
                            per year
                        </small>
                    </div>
                    <div className={"top-0 absolute w-32 h-24 md:w-32 md:h-28 bg-[#767B52] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "15deg"}}>
                    </div>
                </div>
            </div>
        </div>
    )
}
