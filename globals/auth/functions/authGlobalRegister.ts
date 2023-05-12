import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthMap, RegisterBody} from "../interfaces/AuthTypes";
import axios from "axios";
import toast from "react-hot-toast";

export const authGlobalRegister = createAsyncThunk(
  'authGlobal/register',
  async (registerData: RegisterBody, thunkAPI) => {
    try {
      let registerResponse = await axios.post("https://52b0-176-88-45-167.ngrok-free.app/auth/register", {
        email: registerData.email,
        password: registerData.password,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        confirmPassword: registerData.confirmPassword,
        promoCode: registerData.promoCode
      })

      return (
        {
          currentSection: "login",
          statusMessage: "Please verify your email for account verification",
          isLoggedIn: false,
          userData: {},
        } as unknown as AuthMap
      )
    } catch (err: any) {
      if (err.response.data.message == "User Conflict") {
        toast.error("This email is already registered.")
      } else {
        toast.error(`An error occurred.\n${err.message}`)
      }
      return (
        {
          currentSection: "register",
          statusMessage: err.message,
          isLoggedIn: false,
          userData: {},
        } as unknown as AuthMap
      )
    }
  }
)