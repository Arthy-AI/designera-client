import React, {useCallback, useEffect, useState} from "react";
import {useAxios} from "../../hooks/useAxios";
import {Header} from "../../components/header/Header";
import {SimpleButton} from "../../components/button/SimpleButton";
import {Small} from "../../components/text/small/Small";
import {useRouter} from "next/router";
import toast, {Toaster} from "react-hot-toast";
import Head from "next/head";


export default function VerifyEmail() {
  const router = useRouter()
  const {POST} = useAxios()

  useEffect(() => {
    if (!window.location.pathname.split('verify-email/')[1]) {
      router.push('/')
    }
  }, [])

  async function submit() {
    try {
      let response = await POST('auth/verify-email', {
        "token": window.location.pathname.split('verify-email/')[1]
      })

      router.push("/")
    } catch (err) {
     toast.error("Could not verify this authentication token!")
    }
  }

  return (
    <main className="flex flex-col">
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
        <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-EFF12QCM8Q">
              </script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-EFF12QCM8Q');
                  `,
                }}
              />
      </Head>


      <div className="flex flex-col justify-center items-center min-h-screen">
        <Small>
          To complete your register transaction, press the button below
        </Small>
        <SimpleButton text={"Verify Email"} type={"primary"} className={"w-2/5"} onClick={submit}/>
      </div>

      <Toaster/>
    </main>
  );
}
