import React from "react";
import Head from 'next/head'
import CheckoutPage from "./CheckoutPage";

export default function Checkout() {
    return (
        <div>
            <Head>
                <title>Designer AI</title>
                <meta name="description" content="Designer AI"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <CheckoutPage/>
        </div>
    )
}
