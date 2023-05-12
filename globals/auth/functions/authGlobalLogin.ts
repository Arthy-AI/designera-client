import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthBody, AuthMap} from "../interfaces/AuthTypes";
import axios from "axios";
import toast from "react-hot-toast";

export const authGlobalLogin = createAsyncThunk(
  'authGlobal/login-register',
  async (userData: AuthBody, thunkAPI) => {
    try {
      let loginResponse = await axios.post("https://52b0-176-88-45-167.ngrok-free.app/auth/login", {
        email: userData.email,
        password: userData.password
      })

      localStorage.setItem("token", loginResponse.data.token)
      localStorage.setItem("keepMeSignedIn", String(userData.keepMeSignedIn))
      localStorage.setItem("firstTime", `true`)
      toast.success(`Successfully logged in.`)

      return (
        {
          currentSection: "login",
          statusMessage: "Successfully logged in.",
          isLoggedIn: true,
          userData: {
            token: loginResponse.data.token
          },
          modalShow: false

        } as unknown as AuthMap
      )
    } catch (err: any) {
      if (err.response.status == 401) {
        toast.error(`Wrong email or password.`)
      } else {
        toast.error(`An error occurred.\n${err.message}`)
      }
      return (
        {
          currentSection: "login",
          statusMessage: "Wrong email or password.",
          isLoggedIn: false,
          userData: {},
          modalShow: true
        } as unknown as AuthMap
      )
    }
  }
)