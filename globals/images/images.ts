import {configureStore, createSlice} from '@reduxjs/toolkit'

const imagesGlobal = createSlice({
  name: 'imagesGlobal',
  initialState: {
    communityImages: [] as any[],
    generatedImages: [] as any[],
    profileImages: [] as any[],
    themes: [] as any[]
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
    },
    addTheme: (state, action) => {
      let {image} = action.payload;
      state.themes.push(image)
      state.themes = state.themes.slice(0,3)
    },
    removeTheme: (state, action) => {
      let {index} = action.payload;
      state.themes.splice(index, 1)
    }
  }
})

const imagesGlobalStore = configureStore({
  reducer: imagesGlobal.reducer,
})

export {imagesGlobal, imagesGlobalStore}

