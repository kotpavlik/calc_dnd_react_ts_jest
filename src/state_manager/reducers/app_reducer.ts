import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type initialAppStateType = {
    initialized: boolean
    error: string | null
}

const initialAppState: initialAppStateType = {
    initialized: true,
    error: null
}

const slice = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {
        setErrorApp(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },

        initializedAppAC(status, action: PayloadAction) {
            status.initialized = false
        }
    }
})

export const AppReducer = slice.reducer
export const { setErrorApp, initializedAppAC } = slice.actions

export type appReducersType = setErrorType | initializedAppType
type setErrorType = ReturnType<typeof setErrorApp>
export type initializedAppType = ReturnType<typeof initializedAppAC>