import React from 'react';
import s from './CalcOperation.module.scss'
import { ItemTypes, ModeType } from '../Calculator';
import { useAppDispatch, useAppSelector } from '../../hooks/HooksForState';
import { MathCoutingThunk } from '../../state_manager/reducers/calc_reducer';

type CalcOperationType = {
    board: ModeType
    draggable: boolean
    item: ItemTypes
    setCurrentBoard: (board: null | ModeType) => void
    setCurrentItem: (item: null | ItemTypes) => void

}

export const CalcOperation = ({ board, draggable, item, setCurrentBoard, setCurrentItem }: CalcOperationType) => {

    const operators = useAppSelector(state => state.calc.operators)
    const first_disp_val = useAppSelector(state => state.calc.display_value)
    const dispatch = useAppDispatch()

    const clickOperatorHandler = (id: number, first_val: number) => {
        dispatch(MathCoutingThunk({ id, first_val }))
    }
    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, board: ModeType, item: ItemTypes): void => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }

    return (
        <div className={s.op_wrapper} draggable={draggable}
            onDragStart={draggable ? (e) => dragStartHandler(e, board, item) : () => { }}>
            {operators.map(op =>
                op.id !== 15 && <div className={s.op_but} key={op.id}
                    onClick={draggable ? () => { } : () => clickOperatorHandler(op.id, Number(first_disp_val))}>{op.val}
                </div>)}
        </div>

    );
}