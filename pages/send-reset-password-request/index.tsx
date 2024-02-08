import React, {useCallback, useEffect, useState} from "react";
import {useAxios} from "../../hooks/useAxios";
import {Header} from "../../components/header/Header";
import {SimpleButton} from "../../components/button/SimpleButton";
import {Small} from "../../components/text/small/Small";
import {useRouter} from "next/router";
import toast, {Toaster} from "react-hot-toast";
import Head from "next/head";
import {SimpleInput} from "../../components/input/SimpleInput";


export default function VerifyEmail() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const {POST} = useAxios()

  async function submit() {
    try {
      let response = await POST('auth/send-reset-password-request', {
        "email": email
      })
      router.push("/")
    } catch (err) {
      toast.error("An error occurred!")
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
      </Head>


      <form className="flex flex-col justify-center items-center min-h-screen" onSubmit={(e) => {e.preventDefault(); submit()}}>
        <Small>
          To complete your reset password request, enter your email and submit
        </Small>
        <div className={"w-4/5 md:w-2/5"}>
          <SimpleInput type={"email"} name={"email"} value={email} onValueChange={setEmail} labelText={"Email"} labelTagShow={false}
                       secondaryPlaceholderText={"Enter your email..."}
                       className={" mb-4"}></SimpleInput>
        </div>
        <SimpleButton disabled={email.length == 0} text={"Send Reset Password Request"} type={"primary"}
                      className={"w-4/5 md:w-2/5"}/>
      </form>

      <Toaster/>
    </main>
  );
}
