import React, {useCallback, useEffect, useState} from "react";
import {useAxios} from "../../hooks/useAxios";
import {Header} from "../../components/header/Header";
import {SimpleButton} from "../../components/button/SimpleButton";
import {Small} from "../../components/text/small/Small";
import {useRouter} from "next/router";
import toast, {Toaster} from "react-hot-toast";
import useAuth from "../../hooks/auth/useAuth";
import {useAuthGlobalDispatch} from "../../globals/auth/authHooks";
import {authGlobalInitiate} from "../../globals/auth/functions/authGlobalInitiate";
import {AnimatedSimpleInput} from "../../components/input/AnimatedSimpleInput";
import {Heading} from "../../components/heading/Heading";
import {IconButton} from "../../components/button/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";


export default function VerifyEmail() {
  const router = useRouter()
  const {POST} = useAxios()
  const {userData, isLoggedIn} = useAuth()
  const dispatch = useAuthGlobalDispatch()
  const [promoCode, setPromoCode] = useState("")

  useEffect(() => {
    dispatch(authGlobalInitiate({}))
  }, [""])

  useEffect(() => {
    if (isLoggedIn == undefined) return;

    if (!isLoggedIn) {
      router.push('/')
    }
  }, [userData])

  async function submit() {
    try {
      let response = await POST('promo-code/apply', {
        "code": promoCode
      })

      router.push("/")
    } catch (err) {
     toast.error("Could not verify this promo code!")
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
      </Head>

      <div className="flex flex-col justify-center items-center min-h-screen">
        <div
          className={"group absolute top-28 left-24 flex flex-row items-center cursor-pointer"}
          onClick={() => {
            router.push("/")
          }}>
          <IconButton icon={<FontAwesomeIcon
            icon={faArrowLeft}
            color={"#AAA7A5"}
            size={"xl"}
            style={{width: 20, height: 20}}/>}
                      className={"bg-transparent block"}
          />
          <h1
            className={"select-none text-[#AAA7A5] opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-150"}>Back</h1>
        </div>

        <Small>
          To complete your apply, fill the blanks below and submit.
        </Small>
        <AnimatedSimpleInput labelText={"Promo Code"} className={"w-1/5"} value={promoCode} onValueChange={(e) => setPromoCode(e)}/>
        <SimpleButton disabled={promoCode.length < 5 || promoCode.length > 32} text={"Apply Promo Code"} type={"primary"} className={"w-1/5"} onClick={submit}/>
      </div>

      <Toaster/>
    </main>
  );
}
