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
import {DesigneraTitleLarge} from "../../assets/svg/DesigneraTitleLarge";


export default function AboutUsContact() {
  const router = useRouter()

  return (
    <main className="flex flex-col" id={"AboutUsPage"}>
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

        <div
          className={"w-1/2 flex flex-col gap-6 p-4 bg-[#2b2b2b] designera-rounded designera-box-shadow text-white break-words"}>
          <div className="separator-white text-xl select-none">About Us</div>
          <div className={"Font-Regular text-center"}>
            <div>As a team of dedicated professionals from diverse backgrounds, we understand the challenges and
              limitations that individuals and businesses face when it comes to space design since our establishment as
              an architecture company in 2017. That&apos;s why we have developed an artificial architect that combines the
              power of artificial intelligence, design expertise, and advanced algorithms to simplify the entire design
              process.
            </div>
            <br className={'my-14'}/>
            <div>Our platform provides a seamless and intuitive user experience, allowing users to reimagine their
              existing spaces or visualize fictional environments. With just a few clicks, our artificial architect
              generates multiple design alternatives, considering various factors such as aesthetics, functionality, and
              user preferences.
            </div>
          </div>

          <div className="separator-white text-xl select-none">Vision</div>
          <div className={"Font-Regular text-center"}>
            <div>
              Our vision is to revolutionize the space design industry by creating an artificial architect that
              transforms the way spaces are conceived, designed, and executed. We strive to provide a seamless and
              efficient experience, where users can reimagine their existing or fictional spaces, generate design
              alternatives, and receive expert purchase recommendations.
            </div>
          </div>

          <div className="separator-white text-xl select-none">Mission</div>
          <div className={"Font-Regular text-center"}>
            <div>
              Our mission is to empower individuals and businesses to bring their design visions to life with ease and
              speed. By harnessing the power of artificial intelligence, we aim to streamline the entire process of
              space design and execution, eliminating the traditional barriers and inefficiencies. We are dedicated to
              delivering an innovative platform that not only enhances creativity but also provides practical solutions
              and recommendations. Our ultimate goal is to democratize the world of space design, making it accessible
              to everyone, regardless of their background or expertise.
            </div>
          </div>

          <div className="separator-white text-xl select-none">Contact Us!</div>
          <div className={"Font-Regular text-center flex flex-col items-center"}>
            <div className={"mb-8 Font-SemiBold"}>
              <a href={"mailto:team@arthylabs.com"} className={"underline hover:text-[#FF9900] transition-colors ease-in-out duration-150"}>team@arthylabs.com</a>
            </div>
            <DesigneraTitleLarge/>
          </div>
        </div>

      </div>

      <Toaster/>
    </main>
  );
}
