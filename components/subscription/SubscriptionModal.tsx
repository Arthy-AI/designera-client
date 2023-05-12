import React, {useEffect} from "react";
import {ReactProps} from "../../interfaces/ReactProps";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react'
import {SimpleButton} from "../button/SimpleButton";
import {SubscriptionCards} from "./SubscriptionCards";
import {useRouter} from "next/router";

interface SubscriptionModal extends ReactProps {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
    selected: number,
    onSelect: (index: number) => void,
}

export const SubscriptionModal = ({children, isOpen, onClose, onOpen, selected, onSelect, ...props}: SubscriptionModal) => {
    const router = useRouter()

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
            <ModalOverlay/>
            <ModalContent
                style={{backgroundColor: "transparent", display: "flex", alignItems: "flex-end"}}>
                <ModalBody>
                    <SubscriptionCards selected={selected} onSelect={onSelect}/>
                    <div className={"flex justify-center"}>
                        <SimpleButton
                            text={"Select Plan"}
                            type={"colorless"}
                            disabled={selected < 1}
                            className={"w-1/2 bg-[#2563eb] hover:bg-white hover:text-black transition-colors ease-in-out duration-150 mt-2"}
                            onClick={() => { router.replace('/checkout', { query: {selected: selected} }) }}
                        />
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
