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
import useSubscription from "../../hooks/subscription/useSubscription";
import PricingPage from "./PricingTable";

interface SubscriptionModal extends ReactProps {
}

export const SubscriptionModal = ({children, ...props}: SubscriptionModal) => {
    const router = useRouter()
    const { toggleModal, changeSelection, data } = useSubscription()

    function changeSubscription(index: number) {
        changeSelection(index)
    }

    return (
        <Modal isOpen={data.subscriptionModalShow} onClose={() => toggleModal(false)} size={"4xl"}>
            <ModalOverlay/>
            <ModalContent
                style={{backgroundColor: "transparent", display: "flex", alignItems: "flex-end"}}>
                <ModalBody style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "80vh", width: "100%" }}>
                    <div className={`bg-[#242424] py-9 designera-rounded overflow-hidden`}>
                        <PricingPage/>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
