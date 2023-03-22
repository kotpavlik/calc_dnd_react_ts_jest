import React, { useState } from 'react';
import { CalcDisplay } from './calc_display/CalcDispaly';
import s from './Calculator.module.scss'
import { CalcCountBut } from './calc_count_but/CalcCountBut';
import { CalcOperation } from './calc_operation_but/CalcOperation';
import { CalcEqual } from './calc_equal/CalcEqual';
import { CalcConstructor } from './calc_constructor/CalcConstructor';
import { CalculatorMode } from './calculator_mode/CalculatorMode';
import { useAppDispatch } from '../hooks/HooksForState';
import { CalcThunk } from '../state_manager/reducers/calc_reducer';


export type ItemTypes = {
    id: number | null
    name: string

}
export type CalcItems = Array<ItemTypes | null>
export type ModeType = {
    id: number,
    name: string,
    calc_items: CalcItems
}
export type CalculatorType = Array<ModeType>



export const Calculator = () => {


    const Calculator: CalculatorType = [
        {
            id: 1,
            name: 'nav_bar',
            calc_items: [
                {
                    id: 1,
                    name: "display"
                },
                {
                    id: 2,
                    name: 'numbers'
                },
                {
                    id: 3,
                    name: 'operators'
                },
                {
                    id: 4,
                    name: 'equal'
                }
            ]
        },
        {
            id: 2,
            name: 'constructor',
            calc_items: [

            ]
        }
    ]

    const [boards, setBoards] = useState<CalculatorType>(Calculator)
    const [currentBoard, setCurrentBoard] = useState<null | ModeType>(null)
    const [currentItem, setCurrentItem] = useState<null | ItemTypes>(null)

    const [changeMode, setChangeMode] = useState<boolean>(true)
    const dispatch = useAppDispatch()



    function dragOverHandler(e: React.DragEvent<HTMLDivElement>): void {
        e.preventDefault()
        if (e.currentTarget.className === s.calc_constructor) {
            e.currentTarget.style.boxShadow = " 0px 4px 6px rgba(0, 0, 0, 0.06), 0px 6px 8px rgba(0, 0, 0, 0.1)"
        }
    }

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>): void => {
        e.currentTarget.style.boxShadow = " 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)"

    }
    const dragEndHandler = (e: React.DragEvent<HTMLDivElement>): void => {
        e.currentTarget.style.boxShadow = " 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)"

    }

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>,
        board: ModeType, item: null | ItemTypes): void => {
        e.preventDefault()
        const itemIndex = board.calc_items.indexOf(item)

        itemIndex === -1 && board.calc_items.push(item)
        setBoards(boards.map(b => {

            if (b.id === board.id) {
                return board!
            }
            if (b.id === currentBoard!.id) {
                return currentBoard!
            }

            return b
        }))
    }


    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        const buttValue = !Number.isNaN(Number(event.key)) || event.key === ',' ? event.key : ''
        buttValue.length > 0 && dispatch(CalcThunk(buttValue))
    }


    return (
        <div className={s.calculator_app} tabIndex={1} onKeyDown={changeMode ? () => { } : (e) => handleKeyDown(e)}>
            {boards.map((board) => {

                const constructor_items = boards[1].calc_items

                return (
                    <div className={board.id === 2 && board.calc_items.length === 0 ? s.calc_constructor : s.side_bar
                    } key={board.id}
                        onDragOver={board.id === 2 ? (e) => dragOverHandler(e) : () => { }}
                        onDragLeave={board.id === 2 ? (e) => dragLeaveHandler(e) : () => { }}
                        onDragEnd={board.id === 2 ? (e) => dragEndHandler(e) : () => { }}
                        onDrop={board.id === 2 ? (e) => onDropHandler(e, board, currentItem) : () => { }}

                    >
                        <div className={s.run_time_opacity_wrapper} style={changeMode ? {} : { opacity: '0%' }}>
                            {
                                board.id === 1
                                && board.calc_items.map((item, index) => {
                                    const opacityIndex = constructor_items.indexOf(item!)
                                    return (
                                        <div key={item && item.id}  >
                                            <div style={opacityIndex >= 0 ? { opacity: '50%' } : {}} >
                                                {item && item.id === 1 && <CalcDisplay
                                                    board={board}
                                                    draggable={changeMode}
                                                    item={item}
                                                    setCurrentBoard={setCurrentBoard}
                                                    setCurrentItem={setCurrentItem}
                                                />}
                                            </div>

                                            <div style={opacityIndex >= 0 ? { opacity: '50%' } : {}} >
                                                {item && item.id === 2 && <CalcCountBut
                                                    board={board}
                                                    draggable={changeMode}
                                                    item={item}
                                                    setCurrentBoard={setCurrentBoard}
                                                    setCurrentItem={setCurrentItem}
                                                />}
                                            </div>

                                            <div style={opacityIndex >= 0 ? { opacity: '50%' } : {}} >
                                                {item && item.id === 3 && <CalcOperation
                                                    board={board}
                                                    draggable={changeMode}
                                                    item={item}
                                                    setCurrentBoard={setCurrentBoard}
                                                    setCurrentItem={setCurrentItem}
                                                />}
                                            </div>

                                            <div style={opacityIndex >= 0 ? { opacity: '50%' } : {}} >
                                                {item && item.id === 4 && <CalcEqual
                                                    board={board}
                                                    draggable={changeMode}
                                                    item={item}
                                                    setCurrentBoard={setCurrentBoard}
                                                    setCurrentItem={setCurrentItem} />}
                                            </div>

                                        </div>
                                    )
                                }


                                )
                            }
                        </div>


                        {board.id === 2 && <CalculatorMode changeModeHandler={setChangeMode} changeMode={changeMode} />}
                        {board.id === 2 && board.calc_items.length === 0 && < CalcConstructor />}

                        {
                            board.id === 2
                            && board.calc_items.map((item, index) => {

                                if (item && item.id === 1) {
                                    return <CalcDisplay
                                        board={board}
                                        draggable={changeMode}
                                        item={item}
                                        key={index}
                                        setCurrentBoard={setCurrentBoard}
                                        setCurrentItem={setCurrentItem}
                                    />
                                }
                                if (item && item.id === 2) {
                                    return < CalcCountBut key={index}
                                        board={board}
                                        draggable={changeMode}
                                        item={item}
                                        setCurrentBoard={setCurrentBoard}
                                        setCurrentItem={setCurrentItem}

                                    />
                                }
                                if (item && item.id === 3) {
                                    return <CalcOperation
                                        board={board}
                                        draggable={changeMode}
                                        item={item}
                                        setCurrentBoard={setCurrentBoard}
                                        setCurrentItem={setCurrentItem}
                                        key={index} />
                                }
                                if (item && item.id === 4) {
                                    return <CalcEqual key={index}
                                        board={board}
                                        draggable={changeMode}
                                        item={item}
                                        setCurrentBoard={setCurrentBoard}
                                        setCurrentItem={setCurrentItem} />
                                } else {
                                    return <></>
                                }



                            })


                        }

                    </div>
                )
            })}
        </div>

    );
}