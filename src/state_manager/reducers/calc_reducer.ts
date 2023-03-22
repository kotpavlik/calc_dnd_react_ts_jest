
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { setErrorApp } from "./app_reducer"
import { AppRootStateType } from "../store"

type MathType = {
    id: number
    first_val: number
    choise_operator_id?: number | null

}
type EqualType = {
    display_value: string
    choise_operator_id: number | null
    first_val: number | null
}
type button = {
    id: number
    val: string
}
export type initialStateType = {
    display_value: string | null
    buttons: Array<button>
    operators: Array<button>
    choise_operator_id: number | null
    first_val: number | null
    second_val: number | null,
    equal_val: number | null
}

const initialState: initialStateType = {
    display_value: '0',
    buttons: [
        { id: 1, val: '1' },
        { id: 2, val: '2' },
        { id: 3, val: '3' },
        { id: 4, val: '4' },
        { id: 5, val: '5' },
        { id: 6, val: '6' },
        { id: 7, val: '7' },
        { id: 8, val: '8' },
        { id: 9, val: '9' },
        { id: 0, val: '0' },
        { id: 10, val: '.' }
    ],
    operators: [
        { id: 11, val: '/' },
        { id: 12, val: '*' },
        { id: 13, val: '+' },
        { id: 14, val: '-' },
        { id: 15, val: '=' }
    ],
    choise_operator_id: null,
    first_val: null,
    second_val: null,
    equal_val: null
}


export const CalcThunk = createAsyncThunk('calculator/CalcThunk', (val: string | null, { getState, dispatch }) => {
    try {
        const { calc } = getState() as AppRootStateType
        calc.display_value!.length > 8 ? dispatch(setErrorApp({ error: 'dispaly a long' })) : dispatch(displayShow({ val }))
        dispatch(setEqual({ setEq: null }))
    }
    catch (e) {
        // const err = e as Error | AxiosError
        // handleError(err, thunkAPI.dispatch)
        // thunkAPI.dispatch(setStatusApp({ status: 'failed' }))
    }
})

export const MathCoutingThunk = createAsyncThunk('calculator/MathCoutingThunk',
    ({ id, first_val }: MathType, { getState, dispatch }) => {
        try {
            dispatch(operator_counting({ id, first_val }))
            dispatch(displayShow({ val: null }))
        }
        catch (e) {
            // const err = e as Error | AxiosError
            // handleError(err, thunkAPI.dispatch)
            // thunkAPI.dispatch(setStatusApp({ status: 'failed' }))
        }
    })

export const EqualThunk = createAsyncThunk('calculator/EqualThunk',
    ({ display_value, choise_operator_id, first_val }: EqualType, { getState, dispatch }) => {
        try {
            dispatch(CalcThunk(null))
            let equal = 0
            if (choise_operator_id === 11) equal = first_val! / Number(display_value)
            if (choise_operator_id === 12) equal = first_val! * Number(display_value)
            if (choise_operator_id === 13) equal = first_val! + Number(display_value)
            if (choise_operator_id === 14) equal = first_val! - Number(display_value)
            if (display_value === '0' && choise_operator_id === 11) {
                dispatch(setErrorApp({
                    error: 'What\'s up man? Do you really want to do this ? '
                }))
                dispatch(CalcThunk(null))
            } else {
                Number.isInteger(equal) ? dispatch(CalcThunk(equal.toString())) : dispatch(CalcThunk(equal.toFixed(2)))
            }
            dispatch(setEqual({ setEq: equal }))

        }
        catch (e) {
            // const err = e as Error | AxiosError
            // handleError(err, thunkAPI.dispatch)
            // thunkAPI.dispatch(setStatusApp({ status: 'failed' }))
        }
    })

const slice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        displayShow(state, action: PayloadAction<{ val: string | null }>) {
            console.log(state.equal_val);
            console.log(action.payload.val);




            if (action.payload.val === null) { state.display_value = '0' }
            else {
                if (state.equal_val !== null) { state.display_value = action.payload.val }
                else {
                    state.display_value = action.payload.val !== '.' &&
                        state.display_value === '0'
                        ? action.payload.val
                        : state.display_value! + action.payload.val
                }
            }
        },
        operator_counting(state, action: PayloadAction<{ id: number, first_val: number }>) {
            state.first_val = action.payload.first_val
            state.choise_operator_id = action.payload.id
        },
        setEqual(state, action: PayloadAction<{ setEq: number | null }>) {
            console.log(action.payload.setEq);
            state.equal_val = action.payload.setEq
        }
    }
})

export const CalculatorReducer = slice.reducer
export const { operator_counting, displayShow, setEqual } = slice.actions

export type CalcActionsType = MathCountType | DisplayShowType | SetEqualType
export type MathCountType = ReturnType<typeof operator_counting>
export type DisplayShowType = ReturnType<typeof displayShow>
export type SetEqualType = ReturnType<typeof setEqual>