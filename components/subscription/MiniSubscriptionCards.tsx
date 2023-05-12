import {Heading, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import {SubHeading} from "../heading/SubHeading";
import {MutedSmall} from "../text/small/MutedSmall";
import React from "react";
import {ReactProps} from "../../interfaces/ReactProps";

interface MiniSubscriptionCards extends ReactProps {
    selected: number,
    onSelect: (index: number) => void,
}

export const MiniSubscriptionCards = ({children, selected, onSelect, ...props}: MiniSubscriptionCards) => {
    return (
        <div className={"h-full"} style={{display: "flex", gap: 30, flexDirection: "row", boxShadow: "none"}}>
            <div
                className={"bg-[#2f2f2f] text-white border-4 designera-rounded p-8 w-1/3 flex flex-col gap-2 cursor-pointer"}
                style={{borderColor: selected == 1 ? "#FF9900" : "#4d4d4d"}}
                onClick={() => {
                    onSelect(1)
                }}
            >
                <h1 className={"italic text-center text-2xl font-semibold"}>One Timer!</h1>
                <div className={"SubscriptionThumbnailContainer relative my-10"}>
                    <div className={"relative w-full h-36 bg-[#414141] z-20 rounded-3xl p-4"}>
                        <img
                            src="https://media.discordapp.net/attachments/551764588136497152/1060558899612221542/Interior-vector_1.png"/>
                    </div>
                    <div className={"top-0 absolute w-full h-36 bg-[#69343F] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "-15deg"}}>
                    </div>
                </div>
                <div className={"Description text-center text-xs text-stone-400"}>
                    As you subscribe to <span className="text-orange-400 font-semibold">Designera</span>,
                    You
                    will access all
                    of it’s features without limitations or additional fees
                </div>
                <div className={"SubscriptionThumbnailContainer relative my-5 flex justify-center"}>
                    <div
                        className={"relative w-36 h-28 bg-[#111111] z-20 designera-rounded flex flex-col gap-1 justify-center items-center"}>
                        <div className={"flex flex-row items-end justify-center italic"}>
                            <Heading>$2</Heading>
                            <SubHeading>,90</SubHeading>
                        </div>
                        <MutedSmall>
                            for 7 days!
                        </MutedSmall>
                    </div>
                    <div className={"top-0 absolute w-36 h-28 bg-[#69343F] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "15deg"}}>
                    </div>
                </div>
            </div>

            <div
                className={"bg-[#2f2f2f] text-white border-4 designera-rounded p-8 w-1/3 flex flex-col gap-2 cursor-pointer relative"}
                style={{borderColor: selected == 2 ? "#FF9900" : "#4d4d4d"}}
                onClick={() => {
                    onSelect(2)
                }}>
                <div className={"py-1 px-4 bg-[#FF8924] font-bold rounded-full absolute designera-box-shadow"}
                     style={{left: "55%", top: "-3%", fontSize: 18}}>Popular
                </div>
                <h1 className={"italic text-center text-2xl font-semibold"}>Monthly</h1>
                <div className={"SubscriptionThumbnailContainer relative my-10"}>
                    <div
                        className={"relative w-full h-36 bg-[#414141] z-20 rounded-3xl flex justify-center items-center"}>
                        <img
                            src="https://media.discordapp.net/attachments/551764588136497152/1060558899033411665/Interior-vector_2.png"/>
                    </div>
                    <div className={"top-0 absolute w-full h-36 bg-[#7A673D] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "-15deg"}}>
                    </div>
                </div>
                <div className={"Description text-center text-xs text-stone-400"}>
                    As you subscribe to <span className="text-orange-400 font-semibold">Designera</span>,
                    You
                    will access all
                    of it’s features without limitations or additional fees
                </div>
                <div className={"SubscriptionThumbnailContainer relative my-5 flex justify-center"}>
                    <div
                        className={"relative w-36 h-28 bg-[#111111] z-20 rounded-3xl flex flex-col gap-1 justify-center items-center"}>
                        <div className={"flex flex-row items-end justify-center italic"}>
                            <Heading>$9</Heading>
                            <SubHeading>,90</SubHeading>
                        </div>
                        <MutedSmall>
                            per month
                        </MutedSmall>
                    </div>
                    <div className={"top-0 absolute w-36 h-28 bg-[#7A673D] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "15deg"}}>
                    </div>
                </div>
            </div>

            <div
                className={"bg-[#2f2f2f] text-white border-4 designera-rounded p-8 w-1/3 flex flex-col gap-2 cursor-pointer relative"}
                style={{borderColor: selected == 3 ? "#FF9900" : "#4d4d4d"}}
                onClick={() => {
                    onSelect(3)
                }}>
                <div className={"py-1 px-4 bg-[#4C8531] font-bold rounded-full absolute designera-box-shadow"}
                     style={{left: "45%", top: "-3%", fontSize: 18, whiteSpace: "nowrap"}}>Best Value
                </div>
                <h1 className={"italic text-center text-2xl font-semibold"}>Yearly</h1>
                <div className={"SubscriptionThumbnailContainer relative my-10"}>
                    <div
                        className={"relative w-full h-36 bg-[#414141] z-20 rounded-3xl flex justify-center items-center"}>
                        <img
                            src="https://cdn.discordapp.com/attachments/551764588136497152/1060558898613977148/Interior-vector_3.png"/>
                    </div>
                    <div className={"top-0 absolute w-full h-36 bg-[#767B52] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "-15deg"}}>
                    </div>
                </div>
                <div className={"Description text-center text-xs text-stone-400"}>
                    As you subscribe to <span className="text-orange-400 font-semibold">Designera</span>,
                    You
                    will access all
                    of it’s features without limitations or additional fees
                </div>
                <div className={"SubscriptionThumbnailContainer relative my-5 flex justify-center"}>
                    <div
                        className={"relative w-36 h-28 bg-[#111111] z-20 rounded-3xl flex flex-col gap-1 justify-center items-center"}>
                        <div className={"flex flex-row items-end justify-center italic"}>
                            <Heading>$79</Heading>
                            <SubHeading>,90</SubHeading>
                        </div>
                        <MutedSmall>
                            per year
                        </MutedSmall>
                    </div>
                    <div className={"top-0 absolute w-36 h-28 bg-[#767B52] z-10 rounded-3xl"}
                         style={{zIndex: 2, rotate: "15deg"}}>
                    </div>
                </div>
            </div>
        </div>
    )
}
