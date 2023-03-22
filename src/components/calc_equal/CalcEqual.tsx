import React from 'react';
import s from './CalcEqual.module.scss'
import { ItemTypes, ModeType } from '../Calculator';
import { useAppDispatch, useAppSelector } from '../../hooks/HooksForState';
import { EqualThunk } from '../../state_manager/reducers/calc_reducer';

type CalcEqualType = {
    board: ModeType
    draggable: boolean
    item: ItemTypes
    setCurrentBoard: (board: null | ModeType) => void
    setCurrentItem: (item: null | ItemTypes) => void

}

export const CalcEqual = ({ board, draggable, item, setCurrentBoard, setCurrentItem }: CalcEqualType) => {

    const display_count = useAppSelector(state => state.calc.display_value)
    const first_val = useAppSelector(state => state.calc.first_val)
    const choise_operator = useAppSelector(state => state.calc.choise_operator_id)
    const dispatch = useAppDispatch()


    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, board: ModeType, item: ItemTypes): void => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    const counting_equal = (display_count: string, first_val: number | null, choise_operator: number | null): void => {
        dispatch(EqualThunk({ display_value: display_count, choise_operator_id: choise_operator, first_val }))

    }


    return (
        <div className={s.equal_wrapper} draggable={draggable}
            onDragStart={draggable ? (e) => dragStartHandler(e, board, item) : () => { }}>
            <div className={s.equal} onClick={draggable ? () => { } : () => counting_equal(display_count!, first_val, choise_operator)}>
                =
            </div>
        </div>

    );
}