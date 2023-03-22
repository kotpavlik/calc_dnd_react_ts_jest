import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { CalcActionsType, CalculatorReducer } from "./reducers/calc_reducer";
import { AppReducer, appReducersType } from "./reducers/app_reducer";


const rootReducers = combineReducers({
    calc: CalculatorReducer,
    app: AppReducer
}
)

export const store = configureStore({
    reducer: rootReducers,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export type AppRootStateType = ReturnType<typeof rootReducers>
export type AllAppActionsType = CalcActionsType | appReducersType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AllAppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AllAppActionsType>

// @ts-ignore
window.store = store