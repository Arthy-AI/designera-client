import {createSlice, configureStore} from '@reduxjs/toolkit'
import React from "react";

const sidemenuSlice = createSlice({
    name: 'sidemenu',
    initialState: {
        isOpen: false
    },
    reducers: {
        toggle: state => {
            state.isOpen = !state.isOpen
        },
        open: state => {
            state.isOpen = true
        },
        close: state => {
            state.isOpen = false
        }
    }
})

const sidemenuStore = configureStore({
    reducer: sidemenuSlice.reducer
})

export {sidemenuStore, sidemenuSlice}
