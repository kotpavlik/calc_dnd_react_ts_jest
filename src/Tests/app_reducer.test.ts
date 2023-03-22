import { AppReducer, initialAppStateType, initializedAppAC, setErrorApp } from "../state_manager/reducers/app_reducer";

let initialState: initialAppStateType

beforeEach(() => {
    initialState = {
        error: null,
        initialized: true
    }
})

test('check correct work error for app_reducer', () => {

    const new_error_message = 'this jest test message'
    const finishStateTest = AppReducer(initialState, setErrorApp({ error: new_error_message }))

    expect(finishStateTest.error).toBe('this jest test message')
})
test('check correct work initialized for app_reducer', () => {

    const finishStateTest = AppReducer(initialState, initializedAppAC())

    expect(finishStateTest.initialized).toBe(false)
})