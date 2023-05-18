import {configureStore, createSlice} from '@reduxjs/toolkit'

const subscriptionGlobal = createSlice({
  name: 'subscriptionGlobal',
  initialState: {
    subscriptionModalShow: false,
    selectedSubscription: 0,
  },
  reducers: {
    toggleModal: (state, action) => {
      let {status} = action.payload;
      state.subscriptionModalShow = status
    },
    changeSelection: (state, action) => {
      let {index} = action.payload;
      state.selectedSubscription = index
    }
  }
})

const subscriptionGlobalStore = configureStore({
  reducer: subscriptionGlobal.reducer,
})

export {subscriptionGlobal, subscriptionGlobalStore}

