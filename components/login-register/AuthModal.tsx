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
    .oneOf([Yup.ref('password'), ""], 'Passwords must match.'),

  promoCode: Yup.string()
    .optional()
    .min(4, "Please enter more characters (minimum length: 4).")
    .max(32, "Please shorten your input (maximum length: 32).")
});

export const AuthModal = ({children, ...props}: AuthModal) => {
  const {modalShow, toggleModal, currentSection, changeSection, isLoggingIn, statusMessage, login, register} = useAuth()
  const [keepMeSignedIn, setKeepMeSignedIn] = useState(false)

  return (
    <Modal isOpen={modalShow} onClose={() => toggleModal(false)} isCentered size={"lg"}>
      <ModalOverlay/>
      <ModalContent
        style={{backgroundColor: "#2F2F2F", color: "white", border: "2px solid #4d4d4d", borderRadius: 15}}>
        <ModalBody paddingX={10} paddingY={5}>
          {currentSection == "login" && (
            <Formik
              initialValues={{email: "", password: ""}}
              validationSchema={loginValidation}
              onSubmit={(values, {setSubmitting, resetForm}) => {
                login(
                  values.email,
                  values.password,
                  keepMeSignedIn
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
                    <div className={"text-xl text-center"}>Login or <u
                      className={"cursor-pointer hover:text-[#FF9900]"} onClick={() => {
                      changeSection("register")
                    }}>Register</u></div>
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
                        <div className="flex items-center justify-center mb-4 w-full gap-3 md:gap-10">
                          <button
                            type={"submit"}
                            disabled={isLoggingIn}
                            className={"h-12 w-52 bg-[#008BDA] hover:bg-white hover:text-black transition-colors ease-in-out duration-150 designera-rounded designera-box-shadow text-center flex items-center justify-center text-xl"}>
                            {isLoggingIn ? statusMessage : "Login"}
                          </button>
                          <div className={"flex items-center"}>
                            <input id="default-checkbox" type="checkbox" value={Number(keepMeSignedIn)} onChange={(e) => { setKeepMeSignedIn(e.target.checked) }}
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 designera-rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="default-checkbox"
                                   className="Font-Regular ml-2 text-xs lg:text-sm text-gray-900 dark:text-gray-300 select-none">Keep
                              me signed in</label>
                          </div>
                        </div>
                      </div>
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
                      <u className={"cursor-pointer hover:text-[#FF9900]"} onClick={() => {
                        changeSection("login")
                      }}>Login</u> or Register
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

                    <SimpleInput id={"promoCode"} name={"promoCode"} labelText={"Promo Code"}
                                 placeholderText={"XXXXXXXXXXX"} value={values.promoCode}
                                 onChange={handleChange} onBlur={handleBlur}
                    />
                    {touched.promoCode && <FormikError touched={touched.promoCode} error={errors.promoCode}/>}

                    <div>
                      <div className="flex items-center mt-5">
                        <div className="flex items-center justify-center mb-4 w-full gap-10">
                          <button
                            type={"submit"}
                            disabled={isLoggingIn}
                            className={"h-12 w-52 bg-[#008BDA] hover:bg-white hover:text-black transition-colors ease-in-out duration-150 designera-rounded designera-box-shadow text-center flex items-center justify-center text-xl"}>
                            {isLoggingIn ? statusMessage : "Register"}
                          </button>
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
