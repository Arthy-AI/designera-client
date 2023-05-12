import React, {useEffect, useState} from "react";

import {Header} from "../../components/header/Header";
import {SimpleInput} from "../../components/input/SimpleInput";
import {SimpleButton} from "../../components/button/SimpleButton";
import {DesigneraTitle} from "../../assets/svg/DesigneraTitle";
import {SmallSubscriptionCards} from "../../components/subscription/SmallSubscriptionCards";
import {IconButton} from "../../components/button/IconButton";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";
import {Formik} from "formik";
import * as Yup from "yup";
import {FormikError} from "../../components/input/FormikError";
import useAuth from "../../hooks/auth/useAuth";
import axios from "axios";
import {useAxios} from "../../hooks/useAxios";
import toast, {Toaster} from "react-hot-toast";
import {CountryCodes} from "../../constants/CountryCodes";
import {ImageWithFallback} from "../../components/images/ImageWithFallback";

export default function CheckoutPage() {
  const router = useRouter()
  const {isLoggedIn, userData} = useAuth()
  const {POST, GET} = useAxios()
  const [selectedSubscription, setSelectedSubscription] = useState(Number(router.asPath.slice(-1)) || 1);
  const [currency, setCurrency] = useState("USD")
  const [countryCode, setCountryCode] = useState("AF")
  const [plans, setPlans] = useState([] as any[]);
  const [selectedPlanId, setSelectedPlanId] = useState("");

  useEffect(() => {
    if (!userData) return;

    async function authCheck() {
      let plans = await GET("plan/list", {})
      setPlans(plans.sort((a: any, b: any) => a.centAmount - b.centAmount))
      console.log(plans.sort((a: any, b: any) => a.centAmount - b.centAmount))

      if (!isLoggedIn) {
        router.push('/')
      }
    }

    authCheck()
  }, [userData])

  useEffect(() => {
    if (plans.length < 1) return;
    console.log(plans[Number(selectedSubscription) - 1].id)
    setSelectedPlanId(plans[Number(selectedSubscription) - 1].id)
  }, [plans, selectedSubscription])

  const checkoutValidation = Yup.object().shape({
    email: Yup.string()
      .max(50, "Email: Please shorten your input (maximum length: 50).")
      .email("Email: Please use a valid email like example@example.com.")
      .required("Email: Please use a valid email like example@example.com."),

    cardNumber: Yup.string()
      .matches(/^\d+$/, 'Card Number: Only numbers allowed.')
      .max(16, "Card Number: Please enter a valid 16-digit number without spaces or dashes.")
      .min(16, "Card Number: Please enter a valid 16-digit number without spaces or dashes.")
      .required("Card Number: Please enter a valid card number."),

    cardExpireDate: Yup.string()
      .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Card Expiry Date: Please use the format MM/YY for the expiration date.')
      .max(5, "Card Expiry Date: Please use the format MM/YY for the expiration date.")
      .min(5, "Card Expiry Date: Please use the format MM/YY for the expiration date.")
      .required("Card Expiry Date: Please enter a valid card expire date."),

    cardCVC: Yup.string()
      .matches(/^\d+$/, 'Card CVC: Only numbers allowed.')
      .max(3, "Card CVC: Please enter the 3-digit CVC code from the back of your card.")
      .min(3, "Card CVC: Please enter the 3-digit CVC code from the back of your card.")
      .required("Card CVC: Please enter a valid CVC."),

    cardHolderName: Yup.string()
      .matches(/^[a-zA-Z ]*$/, {message: "Card Holder Name: Please use only letters."})
      .max(50, "Card Holder Name: Please shorten your input (maximum length: 50).")
      .required("Card Holder Name: Please enter a valid name."),

    billingAddress: Yup.string()
      .required("Billing Address: Please enter a valid address."),

    billingAddress2: Yup.string(),

    billingAddressZipcode: Yup.string()
      .matches(/^\d+$/, 'Billing Address Zipcode: Only numbers allowed.')
      .max(5, "Billing Address Zipcode: Please enter a valid 5-digit zipcode.")
      .min(5, "Billing Address Zipcode: Please enter a valid 5-digit zipcode.")
      .required("Billing Address Zipcode: Please enter a valid 5-digit zipcode."),

    billingAddressState: Yup.string()
      .required("Billing Address State: Please enter a state."),

    billingAddressCity: Yup.string()
      .required("Billing Address City: Please enter a city."),
  });

  function changeSubscription(index: number) {
    setSelectedSubscription(index)
  }

  return (
    <main className="flex flex-col" id={"CheckoutPage"}>
      <Header/>

      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full flex flex-col items-center">
          <div className="w-full h-full">
            <div className="grid grid-cols-12 gap-4 lg:gap-20">
              <div className="hidden lg:block lg:col-span-1">&nbsp;</div>
              <div
                className="hidden lg:block col-span-6 h-screen overflow-y-scroll lg:overflow-y-hidden bg-transparent min-h-screen flex xl:justify-center relative pl-4">
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
                <div className={"mt-52 w-full xl:w-4/5"}>
                  <SmallSubscriptionCards selected={selectedSubscription as unknown as number}
                                          onSelect={changeSubscription}/>
                </div>
              </div>
              <div
                className="col-span-12 lg:col-span-4 bg-[#2f2f2f] flex lg:justify-center lg:items-center relative">
                <div>
                  <div className={"block lg:hidden pt-20 px-2"}>
                    <SmallSubscriptionCards selected={selectedSubscription as unknown as number}
                                            onSelect={changeSubscription}/>
                    <div
                      className={"Description Font-Light text-center text-xs text-stone-200 mt-5"}>
                      As you subscribe to <span
                      className="Font-Medium text-orange-400">Designera</span>,
                      You
                      will access all
                      of it’s features without <span className={"Font-Regular"}>limitations or additional fees</span>
                    </div>
                  </div>
                  <Formik
                    initialValues={{
                      "email": "",
                      "cardNumber": "",
                      "cardExpireDate": "",
                      "cardCVC": "",
                      "cardHolderName": "",
                      "billingAddress": "",
                      "billingAddress2": "",
                      "billingAddressZipcode": "",
                      "billingAddressState": "",
                      "billingAddressCity": "",
                      "billingAddressCountry": "",
                    }}
                    validationSchema={checkoutValidation}
                    onSubmit={async (values, {setSubmitting, resetForm}) => {
                      try {
                        let subscriptionResponse = await POST("subscription/initiate", {
                          "plan": {
                            "id": selectedPlanId
                          },
                          "billingAddress": {
                            "address": values.billingAddress,
                            "address2": values.billingAddress2 || null,
                            "state": values.billingAddressState,
                            "city": values.billingAddressCity,
                            "country": countryCode,
                            "postalCode": values.billingAddressZipcode
                          },
                          "paymentCard": {
                            "holderName": values.cardHolderName,
                            "number": values.cardNumber,
                            "expireMonth": values.cardExpireDate.split('/')[0],
                            "expireYear": values.cardExpireDate.split('/')[1],
                            "cvc": values.cardCVC
                          },
                          "currency": currency
                        })

                        await router.push('/')
                      } catch (err: any) {
                        toast.error(`${err.response.status}: ${err.response.data.message || "An error occurred."}`)
                      }

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
                        <div className="separator text-xl select-none pt-24">Pay with card</div>
                        <div className={"px-4 sm:px-14 2xl:px-24 py-9 flex flex-col gap-6"}>
                          <div
                            className={"w-full flex items-center justify-center p-2 text-white text-center text-xs Font-Regular rounded-lg border-2 border-stone-600/25 bg-stone-700/25"}>
                            {
                              errors.email ||
                              errors.cardNumber ||
                              errors.cardExpireDate ||
                              errors.cardCVC ||
                              errors.cardHolderName ||
                              errors.billingAddress ||
                              errors.billingAddress2 ||
                              errors.billingAddressZipcode ||
                              errors.billingAddressState ||
                              errors.billingAddressCity ||
                              "Fill in the blanks below and submit to complete your subscription transaction"
                            }
                          </div>
                          <SimpleInput labelText={"Email"}
                                       className={"placeholder-normal bg-[#2C2C2C] border-[#999999]"}
                                       placeholderText={"e.g. hardxxxxxx@gmail.com"} value={values.email}
                                       id={"email"} name={"email"} onChange={handleChange} onBlur={handleBlur}
                          />
                          <div>
                            <label className="Font-Regular text-xs text-white pl-2">Card
                              Information</label>
                            <div
                              className="grid grid-cols-12 border border-[#6F6B6A] overflow-hidden designera-rounded">
                              <div className="col-span-12">
                                <SimpleInput labelText={"XXXX-XXXX-XXXX-XXXX"}
                                             className={"bg-[#2C2C2C] placeholder-normal border-[#999999] border-t-0 border-x-0 focus:border-[#999999] focus:border-[#999999]"}
                                             labelTagShow={false}
                                             rounded={false}
                                             value={values.cardNumber}
                                             id={"cardNumber"} name={"cardNumber"} onChange={handleChange}
                                             onBlur={handleBlur}
                                />
                              </div>
                              <div className="col-span-6">
                                <SimpleInput labelText={"MM/YY"}
                                             className={"bg-[#2C2C2C] placeholder-normal border-[#999999] border-b-0 border-l-0 focus:border-[#999999] focus:border-[#999999]"}
                                             labelTagShow={false}
                                             rounded={false}
                                             value={values.cardExpireDate}
                                             id={"cardExpireDate"} name={"cardExpireDate"} onChange={handleChange}
                                             onBlur={handleBlur}
                                />
                              </div>
                              <div className="col-span-6">
                                <SimpleInput labelText={"CVC"}
                                             className={"bg-[#2C2C2C] placeholder-normal border-[#999999] border-b-0 border-r-0 focus:border-[#999999] focus:border-[#999999]"}
                                             labelTagShow={false}
                                             rounded={false}
                                             value={values.cardCVC}
                                             id={"cardCVC"} name={"cardCVC"} onChange={handleChange} onBlur={handleBlur}
                                />
                              </div>
                            </div>
                          </div>
                          <SimpleInput
                            labelText={"Card Holder Name"}
                            className={"placeholder-normal bg-[#2C2C2C] border-[#6F6B6A]"}
                            value={values.cardHolderName} id={"cardHolderName"} name={"cardHolderName"}
                            onChange={handleChange} onBlur={handleBlur}
                          />
                          <div>
                            <label className="Font-Regular text-xs text-white pl-2">Billing
                              Address</label>
                            <div
                              className="grid grid-cols-12 border border-[#6F6B6A] overflow-hidden designera-rounded">
                              <div className="col-span-12">
                                <SimpleInput labelText={"Address Line 1"}
                                             className={"bg-[#2C2C2C] placeholder-normal border-[#999999] border-t-0 border-x-0 focus:border-[#999999] focus:border-[#999999]"}
                                             labelTagShow={false}
                                             rounded={false}
                                             value={values.billingAddress}
                                             id={"billingAddress"} name={"billingAddress"} onChange={handleChange}
                                             onBlur={handleBlur}
                                />
                              </div>
                              <div className="col-span-9">
                                <SimpleInput labelText={"Address Line 2"}
                                             className={"bg-[#2C2C2C] placeholder-normal border-[#999999] border-l-0 focus:border-[#999999] focus:border-[#999999]"}
                                             labelTagShow={false}
                                             rounded={false}
                                             value={values.billingAddress2}
                                             id={"billingAddress2"} name={"billingAddress2"} onChange={handleChange}
                                             onBlur={handleBlur}
                                />
                              </div>
                              <div className="col-span-3">
                                <SimpleInput labelText={"Zipcode"}
                                             className={"bg-[#2C2C2C] placeholder-normal border-[#999999] border-r-0 focus:border-[#999999] focus:border-[#999999]"}
                                             labelTagShow={false}
                                             rounded={false}
                                             value={values.billingAddressZipcode}
                                             id={"billingAddressZipcode"} name={"billingAddressZipcode"}
                                             onChange={handleChange} onBlur={handleBlur}
                                />
                              </div>
                              <div className="col-span-4">
                                <SimpleInput labelText={"State"}
                                             className={"bg-[#2C2C2C] placeholder-normal border-[#999999] border-b-0 border-l-0 focus:border-[#999999] focus:border-[#999999]"}
                                             labelTagShow={false}
                                             rounded={false}
                                             value={values.billingAddressState}
                                             id={"billingAddressState"} name={"billingAddressState"}
                                             onChange={handleChange} onBlur={handleBlur}
                                />
                              </div>
                              <div className="col-span-4">
                                <SimpleInput labelText={"City"}
                                             className={"bg-[#2C2C2C] placeholder-normal border-[#999999] border-b-0 focus:border-[#999999] focus:border-[#999999]"}
                                             labelTagShow={false}
                                             rounded={false}
                                             value={values.billingAddressCity}
                                             id={"billingAddressCity"} name={"billingAddressCity"}
                                             onChange={handleChange} onBlur={handleBlur}
                                />
                              </div>
                              <div className="col-span-4">
                                <select value={countryCode} onChange={(e) => {
                                  setCountryCode(e.target.value)
                                }} onBlur={handleBlur}
                                        className="border text-white w-full h-full bg-[#2C2C2C] placeholder-normal border-[#999999] border-b-0 border-r-0 focus:border-[#999999] focus:border-[#999999]">
                                  {
                                    CountryCodes.map((v) => <option key={v} className={"bg-[#3F3F3F]"} value={v}>{v}</option>)
                                  }
                                </select>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label
                              className="Font-Regular text-xs text-white pl-2 mb-10">Currency</label>
                            <div className={"flex flex-row gap-3"}>
                              <div>
                                <select value={currency} onChange={(e) => {
                                  setCurrency(e.target.value)
                                }} onBlur={handleBlur} id={"currency"} name={"currency"}
                                        className="block w-24 px-4 py-3 text-base border-0 designera-rounded bg-[#666666] font-semibold text-white designera-box-shadow pr-3">
                                  <option className={"bg-[#3F3F3F]"} value="USD">USD</option>
                                  <option className={"bg-[#3F3F3F]"} value="EUR">EUR</option>
                                  <option className={"bg-[#3F3F3F]"} value="TRY">TRY</option>
                                </select>
                              </div>
                              <div className={"w-full"}>
                                <SimpleButton
                                  text={"Subscribe"}
                                  type={"primary"}
                                />
                              </div>
                            </div>
                          </div>
                          <div className={"Font-Light text-center text-stone-400 text-xs"}>
                            By clicking this button, you accept our <u className={"cursor-pointer"}>privacy
                            policy</u> and <u className={"cursor-pointer"}>terms of use</u>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                  <div className={"block"}>
                    <div className="separator"></div>
                    <div
                      className={"flex flex-col justify-center items-center gap-8 px-10 mt-5 mb-5"}>
                      <ImageWithFallback alt={"Iyzico"} fallbackUrl={""} src={'/assets/images/iyzicoicons.png'} width={300} height={30}/>
                      <div className={"Font-Light text-center text-stone-400 text-xs"}>
                        By confirming your subscription, you allow Designera to charge your card
                        for
                        this payment and future payments in accordance with their terms. You can
                        always
                        cancel your subscription.
                      </div>
                      <DesigneraTitle/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster/>
    </main>
  )
    ;
}
