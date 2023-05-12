import '../styles/globals.scss'
import {ChakraProvider} from '@chakra-ui/react'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import {authGlobalInitiate, authGlobalStore} from "../globals/auth/auth";
import {useEffect} from "react";
import {useAuthGlobalDispatch} from "../globals/auth/authHooks";

export default function App({Component, pageProps}: AppProps) {
  return (
    <ChakraProvider>
      <Provider store={authGlobalStore}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}
