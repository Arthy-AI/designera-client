import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthBody, AuthMap} from "../interfaces/AuthTypes";
import axios from "axios";
import toast from "react-hot-toast";
import {DynamicObject} from "../../../constants/DynamicObject";

export const authGlobalInitiate = createAsyncThunk(
  'authGlobal/initiate',
  async (data: any, thunkAPI) => {
    try {
      let keepMeSignedIn = localStorage.getItem('keepMeSignedIn') === 'true'
      let firstTime = localStorage.getItem('firstTime')
      localStorage.removeItem('firstTime')

      if (keepMeSignedIn || firstTime) {
        let token = localStorage.getItem('token')
        let meResponse = await axios.get("https://52b0-176-88-45-167.ngrok-free.app/user/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        return {
          data: meResponse.data as DynamicObject,
        }
      } else {
        localStorage.removeItem(`token`)
        localStorage.removeItem(`keepMeSignedIn`)
        return {
          data: null,
          reason: "keepMeSignedIn"
        }
      }
    } catch (err: any) {
      localStorage.removeItem(`token`)
      localStorage.removeItem(`keepMeSignedIn`)
      return {
        data: null,
        reason: "Your session is expired.\nPlease log in again."
      }
    }
  }
)