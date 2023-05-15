import {useState, useEffect} from "react";
import {useAuthGlobalDispatch} from "../../globals/auth/authHooks";
import {
  authGlobal,
  authGlobalInitiate,
  authGlobalLogin,
  authGlobalRegister,
  authGlobalStore
} from "../../globals/auth/auth";
import {AuthMap} from "../../globals/auth/interfaces/AuthTypes";

export default function useAuth() {
  const [values, setValues] = useState({} as AuthMap)
  const dispatch = useAuthGlobalDispatch()

  useEffect(() => {
    setValues(authGlobalStore.getState())

    authGlobalStore.subscribe(() => {
      setValues(authGlobalStore.getState())
    })
  }, []);

  function login(email: string, password: string, keepMeSignedIn: boolean) {
    dispatch(authGlobalLogin({
      email: email,
      password: password,
      keepMeSignedIn: keepMeSignedIn
    }))
  }

  function register(email: string, password: string, firstName: string, lastName: string, confirmPassword: string, promoCode: string) {
    dispatch(authGlobalRegister({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      confirmPassword: confirmPassword,
      promoCode: promoCode || undefined
    }))
  }

  function logout() {
    authGlobalStore.dispatch(authGlobal.actions.logout({}))
  }

  function changeSection(section: "register" | "login") {
    authGlobalStore.dispatch(authGlobal.actions.changeSection(
      {section: section}
    ))
  }

  function toggleModal(status: boolean) {
    authGlobalStore.dispatch(authGlobal.actions.toggleModal(
      {status: status}
    ))
  }

  function decrementCreditBalance() {
    authGlobalStore.dispatch(authGlobal.actions.decrementCreditBalance({}))
  }

  return {
    currentSection: values.currentSection,
    statusMessage: values.statusMessage,
    isLoggingIn: values.isLoggingIn,
    isLoggedIn: values.isLoggedIn,
    userData: values.userData,
    modalShow: values.modalShow,
    login,
    register,
    logout,
    toggleModal,
    changeSection,
    decrementCreditBalance
  }
}