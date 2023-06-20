import {Heading, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import {SubHeading} from "../heading/SubHeading";
import {MutedSmall} from "../text/small/MutedSmall";
import React from "react";
import {ReactProps} from "../../interfaces/ReactProps";

interface SmallSubscriptionCards extends ReactProps {
    selected: number,
    onSelect: (index: number) => void,
}

export const SmallSubscriptionCards = ({children, selected, onSelect, ...props}: SmallSubscriptionCards) => {
    return (
        <div className={"grid grid-cols-1 sm:grid-cols-3 gap-5 h-full"}>
            <div
                className={"h-fit flex flex-col items-center gap-1 bg-[#2b2b2b] text-white border-4 designera-rounded p-4 2xl:p-8 cursor-pointer"}
                style={{borderColor: selected == 1 ? "#FF9900" : "#4d4d4d"}}
                onClick={() => {
                    onSelect(1)
                }}
            >
                <h1 className={"italic text-center text-xl 2xl:text-3xl font-semibold whitespace-nowrap mb-4 lg:mb-0"}>One
                    Timer!</h1>
                <div className={"SubscriptionThumbnailContainer relative my-4 sm:my-10"}>
                    <div
                        className={"relative w-full h-40 sm:h-24 2xl:h-36 bg-[#414141] z-20 rounded-3xl p-4 flex justify-center items-center"}>
                        <img
                            src="/assets/images/Interior-vector_1.png"
                            className={"h-40 sm:h-auto"}
                        />
                    </div>
                    <div className={"top-0 absolute w-full h-40 sm:h-24 2xl:h-36 bg-[#69343F] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "-15deg"}}>
                    </div>
                </div>
                <div className={"Description Font-Light text-center text-xs text-stone-200 mb-5 hidden lg:block"}>
                    As you subscribe to <span className="Font-Medium text-orange-400">Designera</span>,
                    You
                    will access all
                    of it’s features without <span className={"Font-Regular"}>limitations or additional fees</span>
                </div>
                <div className={"SubscriptionThumbnailContainer relative my-5 flex justify-center"}>
                    <div
                        className={"relative w-28 h-24 2xl:w-36 2xl:h-28 bg-[#111111] z-20 rounded-3xl flex flex-col gap-1 justify-center items-center"}>
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
                    <div className={"top-0 absolute w-28 h-24 2xl:w-36 2xl:h-28 bg-[#69343F] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "15deg"}}>
                    </div>
                </div>
            </div>

            <div
                className={"h-fit flex flex-col items-center gap-1 bg-[#2b2b2b] text-white border-4 designera-rounded p-4 2xl:p-8 cursor-pointer relative"}
                style={{borderColor: selected == 2 ? "#FF9900" : "#4d4d4d"}}
                onClick={() => {
                    onSelect(2)
                }}>
                <div className={"Font-Bold py-1 px-4 bg-[#FF8924] rounded-full absolute designera-box-shadow right-0"}
                     style={{top: "-5%", fontSize: 18}}>Popular
                </div>
                <h1 className={"italic text-center text-xl 2xl:text-3xl font-semibold mb-4 lg:mb-0"}>Monthly</h1>
                <div className={"SubscriptionThumbnailContainer relative my-4 sm:my-10"}>
                    <div
                        className={"relative w-full h-40 sm:h-24 2xl:h-36 bg-[#414141] z-20 rounded-3xl flex justify-center items-center"}>
                        <img
                            src="/assets/images/Interior-vector_2.png"
                            className={"h-40 sm:h-auto"}
                        />
                    </div>
                    <div className={"top-0 absolute w-full h-40 sm:h-24 2xl:h-36 bg-[#7A673D] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "-15deg"}}>
                    </div>
                </div>
                <div className={"Description Font-Light text-center text-xs text-stone-200 mb-5 hidden lg:block"}>
                    As you subscribe to <span className="Font-Medium text-orange-400">Designera</span>,
                    You
                    will access all
                    of it’s features without <span className={"Font-Regular"}>limitations or additional fees</span>
                </div>
                <div className={"SubscriptionThumbnailContainer relative my-5 flex justify-center"}>
                    <div
                        className={"relative w-28 h-24 2xl:w-36 2xl:h-28 bg-[#111111] z-20 rounded-3xl flex flex-col gap-1 justify-center items-center"}>
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
                    <div className={"top-0 absolute w-28 h-24 2xl:w-36 2xl:h-28 bg-[#7A673D] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "15deg"}}>
                    </div>
                </div>
            </div>

            <div
                className={"h-fit  flex flex-col items-center gap-0 sm:gap-1 bg-[#2b2b2b] text-white border-4 designera-rounded p-4 2xl:p-8 cursor-pointer relative"}
                style={{borderColor: selected == 3 ? "#FF9900" : "#4d4d4d"}}
                onClick={() => {
                    onSelect(3)
                }}>
                <div
                    className={"Font-Bold py-1 px-4 bg-[#4C8531] font-bold rounded-full absolute designera-box-shadow right-0"}
                    style={{top: "-5%", fontSize: 18, whiteSpace: "nowrap"}}>Best Value
                </div>
                <h1 className={"italic text-center text-xl 2xl:text-3xl font-semibold mb-4 lg:mb-0"}>Yearly</h1>
                <div className={"SubscriptionThumbnailContainer relative my-4 sm:my-10"}>
                    <div
                        className={"relative w-full h-40 sm:h-24 2xl:h-36 bg-[#414141] z-20 rounded-3xl flex justify-center items-center"}>
                        <img
                            src="/assets/images/Interior-vector_3.png"
                            className={"h-40 sm:h-auto"}
                        />
                    </div>
                    <div className={"top-0 absolute w-full h-40 sm:h-24 2xl:h-36 bg-[#767B52] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "-15deg"}}>
                    </div>
                </div>
                <div className={"Description Font-Light text-center text-xs text-stone-200 mb-5 hidden lg:block"}>
                    As you subscribe to <span className="Font-Medium text-orange-400">Designera</span>,
                    You
                    will access all
                    of it’s features without <span className={"Font-Regular"}>limitations or additional fees</span>
                </div>
                <div className={"SubscriptionThumbnailContainer relative my-5 flex justify-center"}>
                    <div
                        className={"relative w-28 h-24 2xl:w-36 2xl:h-28 bg-[#111111] z-20 rounded-3xl flex flex-col gap-1 justify-center items-center"}>
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
                    <div className={"top-0 absolute w-28 h-24 2xl:w-36 2xl:h-28 bg-[#767B52] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "15deg"}}>
                    </div>
                </div>
            </div>
        </div>
    )
}
