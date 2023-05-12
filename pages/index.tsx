import React from "react";
import Head from 'next/head'
import MainPage from "./MainPage";

export default function Main() {
    return (
        <div>
            <Head>
                <title>Designer AI</title>
                <meta name="description" content="Designer AI"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <MainPage/>
        </div>
    )
}
