import React from "react";
import Head from 'next/head'
import MainPage from "./MainPage";

export default function Main() {
    return (
        <div>
            <Head>
              <title>Designera | Create AI-Powered Design Ideas in Seconds</title>
              <meta name="description"
                    content="Experience AI-generated personalized design ideas for any room. Explore unique home decor inspirations in seconds, and effortlessly create the dream space tailored to you."/>
              <meta property="og:type" content="website"/>
              <meta property="og:url" content="https://designera.app/"/>
              <meta property="og:title"
                    content="Designera | Create AI-Powered Design Ideas in Seconds"/>
              <meta property="og:description"
                    content="Experience AI-generated personalized design ideas for any room. Explore unique home decor inspirations in seconds, and effortlessly create the dream space tailored to you."/>
              <meta property="og:image"
                    content="/assets/site/icon.png"></meta>
              <link rel="shortcut icon" href="/assets/site/favicon.ico"/>
              <meta name="theme-color" content="#FF9900"/>
              <script
                async
                src="https://js.stripe.com/v3/pricing-table.js">
              </script>
            </Head>
            <MainPage/>
        </div>
    )
}
