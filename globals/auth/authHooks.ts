import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import type {AuthGlobalRootState, AuthGlobalDispatch} from './auth'

export const useAuthGlobalDispatch: () => AuthGlobalDispatch = useDispatch
export const useAuthGlobalSelector: TypedUseSelectorHook<AuthGlobalRootState> = useSelector