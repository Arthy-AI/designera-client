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
                <ModalBody style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "80vh" }}>
                    <SubscriptionCards selected={data.selectedSubscription} onSelect={changeSubscription}/>
                    <div className={"flex justify-center"}>
                        <SimpleButton
                            text={"Select Plan"}
                            type={"colorless"}
                            disabled={data.selectedSubscription < 1}
                            className={"w-1/2 bg-[#2563eb] hover:bg-white hover:text-black transition-colors ease-in-out duration-150 mt-2"}
                            onClick={() => { router.replace('/checkout', { query: {selected: data.selectedSubscription} }) }}
                        />
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
