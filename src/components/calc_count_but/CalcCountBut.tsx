
import s from './CalcCountBut.module.scss'
import { ItemTypes, ModeType } from '../Calculator';
import { useAppDispatch, useAppSelector } from '../../hooks/HooksForState';
import { CalcThunk } from '../../state_manager/reducers/calc_reducer';

type CalcCountButType = {
    board: ModeType
    draggable: boolean
    item: ItemTypes
    setCurrentBoard: (board: null | ModeType) => void
    setCurrentItem: (item: null | ItemTypes) => void

}

export const CalcCountBut = ({ board, draggable, item, setCurrentBoard, setCurrentItem }: CalcCountButType) => {

    const button_value = useAppSelector(store => store.calc.buttons)
    const dispatch = useAppDispatch()




    const pressButtonHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, val: string, id: number) => {
        dispatch(CalcThunk(val))
    }

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, board: ModeType, item: ItemTypes): void => {
        setCurrentBoard(board)
        setCurrentItem(item)
    }




    return (
        <div className={s.count_wrapper} draggable={draggable}

            onDragStart={draggable ? (e) => dragStartHandler(e, board, item) : () => { }}>
            {button_value.map((b) => {
                return (
                    <div className={b.id === 0 ? s.zero : s.but} key={b.id}
                        onClick={draggable ? () => { } : (e) => pressButtonHandler(e, b.val, b.id)}
                    >{b.val}</div>
                )
            })}
        </div>

    );
}