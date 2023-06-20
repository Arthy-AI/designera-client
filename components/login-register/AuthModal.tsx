import React, {useState} from "react";
import {ReactProps} from "../../interfaces/ReactProps";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react'
import {SimpleInput} from "../input/SimpleInput";
import useAuth from "../../hooks/auth/useAuth";
import {Formik} from "formik";
import * as Yup from "yup";
import {FormikError} from "../input/FormikError";
import {MutedSmall} from "../text/small/MutedSmall";
import {Small} from "../text/small/Small";

interface AuthModal extends ReactProps {
}

const loginValidation = Yup.object().shape({
  email: Yup.string()
    .max(50, "Please shorten your input (maximum length: 50).")
    .email("Please use a valid email like example@example.com.")
    .required("Please use a valid email like example@example.com."),

  password: Yup.string()
    .max(256, "Please shorten your input (maximum length: 256).")
    .min(8, "Please enter more characters (minimum length: 8).")
    .matches(/^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*\d).{8,}$/u, {
      message: `Your password must include a uppercase character, a lowercase character, and a number.`
    })
    .required("Please enter a valid password."),
});

const registerValidation = Yup.object().shape({
  name: Yup.string()
    .max(50, "Please shorten your input (maximum length: 50).")
    .matches(/^[a-zA-Z ]*$/, {message: "Please use only letters."})
    .required("Please enter a valid name."),

  surname: Yup.string()
    .max(50, "Please shorten your input (maximum length: 50).")
    .matches(/^[a-zA-Z ]*$/, {message: "Please use only letters."})
    .required("Please enter a valid surname."),

  email: Yup.string()
    .max(50, "Please shorten your input (maximum length: 50).")
    .email("Please use a valid email like example@example.com.")
    .required("Please use a valid email like example@example.com."),

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

export const AuthModal = ({children, ...props}: AuthModal) => {
  const {modalShow, toggleModal, currentSection, changeSection, isLoggingIn, statusMessage, login, register} = useAuth()
  const [keepMeSignedIn, setKeepMeSignedIn] = useState(false)

  return (
    <Modal isOpen={modalShow} onClose={() => toggleModal(false)} isCentered size={"lg"}>
      <ModalOverlay/>
      <ModalContent
        style={{backgroundColor: "#2b2b2b", color: "white", border: "2px solid #4d4d4d", borderRadius: 15}}>
        <ModalBody paddingX={10} paddingY={5}>
          {currentSection == "login" && (
            <Formik
              initialValues={{email: "", password: ""}}
              validationSchema={loginValidation}
              onSubmit={(values, {setSubmitting, resetForm}) => {
                login(
                  values.email,
                  values.password,
                  true
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
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4">
                    <SimpleInput id={"email"} name={"email"} labelText={"Email"}
                                 placeholderText={"e.g. dexxxxxx@gmail.com"}
                                 className={"LoginInput"} value={values.email}
                                 onChange={handleChange} onBlur={handleBlur}
                    />
                    {touched.email && <FormikError touched={touched.email} error={errors.email}/>}
                    <SimpleInput id={"password"} name={"password"} labelText={"Password"} type={"password"}
                                 placeholderText={"••••••••••••"} className={"LoginInput"} value={values.password}
                                 onChange={handleChange} onBlur={handleBlur}
                    />
                    {touched.password && <FormikError touched={touched.password} error={errors.password}/>}
                    <div>
                      <div className="flex items-center mt-5">
                        <div className="flex flex-col items-center justify-center w-full gap-2">
                          <button
                            type={"submit"}
                            disabled={isLoggingIn}
                            className={"h-12 w-52 bg-[#008BDA] hover:bg-white hover:text-black transition-colors ease-in-out duration-150 designera-rounded designera-box-shadow text-center flex items-center justify-center text-xl"}>
                            {isLoggingIn ? statusMessage : "Login"}
                          </button>
                          <Small
                            className={"text-[#ccc] select-none"}>Don&apos;t have an account?
                            <span
                              className={"cursor-pointer hover:text-[#FF9900] transition-colors ease-in-out duration-300 text-sm ml-1"}
                              onClick={() => {
                                changeSection("register")
                              }}
                            >Register</span>
                          </Small>
                        </div>
                      </div>
                      <Small className={"mt-2 text-[#ccc]"}><a href={'/send-reset-password-request'} className={"hover:underline"}>Forgot Password?</a></Small>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          )}
          {currentSection == "register" && (
            <Formik
              initialValues={{name: "", surname: "", email: "", password: "", passwordConfirmation: "", promoCode: ""}}
              validationSchema={registerValidation}
              onSubmit={(values, {setSubmitting, resetForm}) => {
                register(
                  values.email,
                  values.password,
                  values.name,
                  values.surname,
                  values.passwordConfirmation,
                  values.promoCode
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
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4">
                    <div className={"text-xl text-center"}>
                    </div>
                    <div className={"flex flex-row justify-between gap-4"}>
                      <div>
                        <SimpleInput id={"name"} name={"name"} labelText={"Name"} className={"mb-4 w-1/2"}
                                     placeholderText={"e.g. John"} value={values.name}
                                     onChange={handleChange} onBlur={handleBlur}
                        />
                        {touched.name && <FormikError touched={touched.name} error={errors.name}/>}
                      </div>
                      <div>
                        <SimpleInput id={"surname"} name={"surname"} labelText={"Surname"} className={"mb-4 w-1/2"}
                                     placeholderText={"e.g. Smith"} value={values.surname}
                                     onChange={handleChange} onBlur={handleBlur}
                        />
                        {touched.surname && <FormikError touched={touched.surname} error={errors.surname}/>}
                      </div>
                    </div>

                    <SimpleInput id={"email"} name={"email"} labelText={"Email"}
                                 placeholderText={"e.g. dexxxxxx@gmail.com"} value={values.email}
                                 onChange={handleChange} onBlur={handleBlur}
                    />
                    {touched.email && <FormikError touched={touched.email} error={errors.email}/>}

                    <SimpleInput id={"password"} name={"password"} labelText={"Password"} type={"password"}
                                 placeholderText={"••••••••••••"} value={values.password}
                                 onChange={handleChange} onBlur={handleBlur}
                    />
                    {touched.password && <FormikError touched={touched.password} error={errors.password}/>}

                    <SimpleInput id={"passwordConfirmation"} name={"passwordConfirmation"} type={"password"}
                                 labelText={"Confirm Password"}
                                 placeholderText={"••••••••••••"} value={values.passwordConfirmation}
                                 onChange={handleChange} onBlur={handleBlur}
                    />
                    {touched.passwordConfirmation &&
                        <FormikError touched={touched.passwordConfirmation} error={errors.passwordConfirmation}/>}
                    <div>
                      <div className="flex items-center mt-5">
                        <div className="flex flex-col items-center justify-center w-full gap-2">
                          <button
                            type={"submit"}
                            disabled={isLoggingIn}
                            className={"h-12 w-52 bg-[#008BDA] hover:bg-white hover:text-black transition-colors ease-in-out duration-150 designera-rounded designera-box-shadow text-center flex items-center justify-center text-xl"}>
                            {isLoggingIn ? statusMessage : "Register"}
                          </button>
                          <Small
                            className={"text-[#ccc] select-none"}>Already have an account?
                            <span
                              className={"cursor-pointer hover:text-[#FF9900] transition-colors ease-in-out duration-300 text-sm ml-1"}
                              onClick={() => {
                                changeSection("login")
                              }}
                            >Login</span>
                          </Small>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
