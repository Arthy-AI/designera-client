import React, {useCallback, useEffect, useState} from "react";
import {useAxios} from "../../hooks/useAxios";
import {Header} from "../../components/header/Header";
import {SimpleButton} from "../../components/button/SimpleButton";
import {Small} from "../../components/text/small/Small";
import {useRouter} from "next/router";
import toast, {Toaster} from "react-hot-toast";
import Head from "next/head";
import {SimpleInput} from "../../components/input/SimpleInput";
import * as Yup from "yup";
import {Formik} from "formik";
import {FormikError} from "../../components/input/FormikError";


export default function VerifyEmail() {
  const router = useRouter()
  const {PATCH} = useAxios()

  useEffect(() => {
    if (!window.location.pathname.split('reset-password/')[1]) {
      router.push('/')
    }
  }, [])

  async function submit(password: string, passwordConfirmation: string) {
    try {
      let response = await PATCH('auth/reset-password', {
        "token": window.location.pathname.split('reset-password/')[1],
        "newPassword": password,
        "confirmPassword": passwordConfirmation,
      })

      router.push("/")
    } catch (err) {
      toast.error("Could not reset with this token!")
    }
  }

  const resetPasswordValidation = Yup.object().shape({
    password: Yup.string()
      .max(256, "Please shorten your input (maximum length: 256).")
      .min(8, "Please enter more characters (minimum length: 8).")
      .matches(/^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\d).{8,}$/u, {
        message: `Your password must include a uppercase character, a lowercase character, and a number.`
      })
      .required("Please enter a valid password."),

    passwordConfirmation: Yup.string()
      .max(50, "Please shorten your input (maximum length: 50).")
      .min(8, "Please enter more characters (minimum length: 8).")
      .required("Please enter a valid password.")
      .oneOf([Yup.ref('password'), ""], 'Passwords must match.')
  });

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

      <div className={"flex flex-col justify-center items-center min-h-screen"}>
        <Formik
          initialValues={{password: "", passwordConfirmation: ""}}
          validationSchema={resetPasswordValidation}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            submit(
              values.password,
              values.passwordConfirmation,
            )
          }}
        >
          {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting
            }) => (
            <form onSubmit={handleSubmit} className={"w-4/5 md:w-2/5 flex-col items-center"}>
              <div className="flex flex-col gap-4">
                <SimpleInput id={"password"} name={"password"} labelText={"New Password"} type={"password"}
                             placeholderText={"••••••••••••"} value={values.password}
                             onChange={handleChange} onBlur={handleBlur}
                />
                {touched.password && <FormikError touched={touched.password} error={errors.password} className={"text-white"}/>}

                <SimpleInput id={"passwordConfirmation"} name={"passwordConfirmation"} type={"password"}
                             labelText={"Confirm New Password"}
                             placeholderText={"••••••••••••"} value={values.passwordConfirmation}
                             onChange={handleChange} onBlur={handleBlur}
                />
                {touched.passwordConfirmation &&
                    <FormikError touched={touched.passwordConfirmation} error={errors.passwordConfirmation} className={"text-white"}/>}

                <SimpleButton text={"Reset Password"} type={"primary"} className={""}/>
              </div>
            </form>
          )}
        </Formik>
      </div>

      <Toaster/>
    </main>
  );
}
