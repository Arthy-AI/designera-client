import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import {useAxios} from "../../../../hooks/useAxios";

export default function GoogleOauth() {
  const router = useRouter()
  const { POST } = useAxios()

  useEffect(() => {
    async function oauth() {
      const code = new URL(window.location.href).searchParams.get("code")

      if (!code) router.push("/")

      const data = await POST("auth/oauth/google/callback", {
        code: code
      })

      localStorage.setItem("token", data?.token)
      localStorage.setItem("keepMeSignedIn", "true")
      localStorage.setItem("firstTime", `true`)

      router.push("/")
    }

    oauth()
  }, [])

  return (
    <main className="flex flex-col bg-[#212121]">
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
      </Head>
    </main>
  );
}
