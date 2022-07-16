import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState } from './root-reducer'
import { AppDispatch } from './store'
 // you can use this Dispatch type in your thunks
export const useAppDispatch = () => useDispatch<AppDispatch>() 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector