import { CalculatorReducer, displayShow, initialStateType, operator_counting, setEqual } from "../state_manager/reducers/calc_reducer";

let initialState: initialStateType

beforeEach(() => {
    initialState = {
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
}
)

test('it is testing correct work displayShow', () => {
    const val_0 = '0';
    const val_letter = 'hello'
    const val_null = null

    const finishState = CalculatorReducer(initialState, displayShow({ val: val_0 }))
    const finishStateWithLetter = CalculatorReducer(initialState, displayShow({ val: val_letter }))
    const finishStateWithNull = CalculatorReducer(initialState, displayShow({ val: val_null }))

    expect(finishState.display_value).toBe('0')
    expect(finishStateWithLetter.display_value).toBe('hello')
    expect(finishStateWithNull.display_value).toBe('0')

})

test('it is testing correct operator counting', () => {
    const operator_id = 11;
    const first_val = 20

    const finishState = CalculatorReducer(initialState, operator_counting({ id: operator_id, first_val: first_val }))

    expect(finishState.choise_operator_id).toBe(operator_id)
    expect(finishState.first_val).toBe(first_val)

})
test('it is testing correct equal', () => {
    const new_equal = 500;

    const finishState = CalculatorReducer(initialState, setEqual({ setEq: new_equal }))

    expect(finishState.equal_val).toBe(new_equal)

})