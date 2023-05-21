import {configureStore, createSlice} from '@reduxjs/toolkit'

const imagesGlobal = createSlice({
  name: 'imagesGlobal',
  initialState: {
    communityImages: [] as any[],
    generatedImages: [] as any[],
    profileImages: [] as any[],
    recentImages: [] as any[],
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
    changeRecentImages: (state, action) => {
      let {images} = action.payload;
      state.recentImages = [...images];
    },
    changeRecentImageByIndex: (state, action) => {
      let {image, index} = action.payload;
      state.recentImages[index] = image;
    },
    changeCommunityImageByIndex: (state, action) => {
      let {image, index} = action.payload;
      state.communityImages[index] = image;
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

