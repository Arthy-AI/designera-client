import {createSlice, configureStore} from '@reduxjs/toolkit'

import {authGlobalLogin} from './functions/authGlobalLogin';
import {authGlobalRegister} from './functions/authGlobalRegister';
import {AuthMap} from "./interfaces/AuthTypes";
import {authGlobalInitiate} from "./functions/authGlobalInitiate";
import toast from "react-hot-toast";


const authGlobal = createSlice({
  name: 'authGlobal',
  initialState: {
    currentSection: "login",
    statusMessage: "",
    isLoggingIn: false,
    isLoggedIn: false,
    modalShow: false,
    userData: {},
  } as AuthMap,
  reducers: {
    logout: (state, action) => {
      state.isLoggingIn = false;
      state.isLoggedIn = false;
      state.userData = {}
    },
    changeSection: (state, action) => {
      let {section} = action.payload;
      state.currentSection = section
    },
    toggleModal: (state, action) => {
      let {status} = action.payload;
      state.modalShow = status
    },
    changeProfileImageByIndex: (state, action) => {
      let {image, index, type} = action.payload;
      state.userData[type][index] = image;
    },
    decrementCreditBalance: (state, action) => {
      state.userData.credits -= 1
    },
    upvoteImageUpdate: (state, action) => {
      let {image, type} = action.payload;
      if (type == "vote") {
        state.userData.upvotedImages.push(image)
      } else {
        state.userData.upvotedImages.splice(state.userData.upvotedImages.findIndex((v: any) => v.id == image.id), 1)
      }
    }
  },
  extraReducers: (builder) => {
    // LOGIN STAGE

    builder.addCase(authGlobalLogin.pending, (state, action) => {
      state.isLoggingIn = true;
      state.statusMessage = "Logging In..."
    })

    builder.addCase(authGlobalLogin.fulfilled, (state, action) => {
      state.isLoggingIn = false;

      const {currentSection, statusMessage, isLoggedIn, userData, modalShow} = action.payload;
      state.currentSection = currentSection;
      state.statusMessage = statusMessage;
      state.isLoggedIn = isLoggedIn;
      state.userData = userData;
      state.modalShow = modalShow;
    })

    // REGISTER STAGE

    builder.addCase(authGlobalRegister.pending, (state, action) => {
      state.isLoggingIn = true;
      state.statusMessage = "Registering..."
    })

    builder.addCase(authGlobalRegister.fulfilled, (state, action) => {
      state.isLoggingIn = false;

      const {currentSection, statusMessage, isLoggedIn, userData} = action.payload;
      state.currentSection = currentSection
      state.statusMessage = statusMessage
      state.isLoggedIn = isLoggedIn;
      state.userData = userData;
    })

    // INITIATE STAGE

    builder.addCase(authGlobalInitiate.pending, (state, action) => {
      state.isLoggingIn = true;
      state.statusMessage = "Logging in...";
    })

    builder.addCase(authGlobalInitiate.fulfilled, (state, action) => {
      state.isLoggingIn = false;
      const {data, reason} = action.payload

      if (data) {
        state.isLoggedIn = true
        state.userData = data
        toast.success(`Successfully logged in.`)
      } else {
        if (reason != "keepMeSignedIn") {
          toast.error(reason)
        }
        authGlobal.actions.logout({})
      }
    })
  }
})

const authGlobalStore = configureStore({
  reducer: authGlobal.reducer,
})

export type AuthGlobalRootState = ReturnType<typeof authGlobalStore.getState>
export type AuthGlobalDispatch = typeof authGlobalStore.dispatch

export {authGlobal, authGlobalStore, authGlobalLogin, authGlobalRegister, authGlobalInitiate}

