import React from 'react';
import s from './CalcDispaly.module.scss'
import { ItemTypes, ModeType } from '../Calculator';
import { useAppSelector } from '../../hooks/HooksForState';


type CalcDisplayType = {
    board: ModeType
    draggable: boolean
    item: ItemTypes
    setCurrentBoard: (board: null | ModeType) => void
    setCurrentItem: (item: null | ItemTypes) => void

}



export const CalcDisplay = ({ board, draggable,
    item, setCurrentBoard, setCurrentItem }: CalcDisplayType) => {

    const display_value = useAppSelector(store => store.calc.display_value)



    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>,
        board: ModeType, item: ItemTypes): void => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }


    return (

        <div className={s.disp_wrapper}

            onDragStart={draggable ? (e) => dragStartHandler(e, board, item) : () => { }}
            draggable={draggable}>
            <div className={s.calc_display}>
                {display_value}
            </div>
        </div>
    );


}