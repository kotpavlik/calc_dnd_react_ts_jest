import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppRootStateType } from "../state_manager/store"


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch() as AppDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector