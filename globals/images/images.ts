import {createSlice, configureStore} from '@reduxjs/toolkit'
import toast from "react-hot-toast";

const imagesGlobal = createSlice({
  name: 'imagesGlobal',
  initialState: {
    communityImages: [] as any[],
    generatedImages: [] as any[],
    profileImages: [] as any[]
  },
  reducers: {
    changeCommunityImages: (state, action) => {
      let {images} = action.payload;
      state.communityImages = [...images]
    },
    changeGeneratedImages: (state, action) => {
      let {images} = action.payload;
      state.generatedImages = [...images]
    },
    changeProfileImages: (state, action) => {
      let {images} = action.payload;
      state.profileImages = [...images]
    }
  }
})

const imagesGlobalStore = configureStore({
  reducer: imagesGlobal.reducer,
})

export {imagesGlobal, imagesGlobalStore}

