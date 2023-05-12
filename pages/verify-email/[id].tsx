import React, {useCallback, useEffect, useState} from "react";
import {useAxios} from "../../hooks/useAxios";
import {Header} from "../../components/header/Header";
import {SimpleButton} from "../../components/button/SimpleButton";
import {Small} from "../../components/text/small/Small";
import {useRouter} from "next/router";
import toast, {Toaster} from "react-hot-toast";


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
