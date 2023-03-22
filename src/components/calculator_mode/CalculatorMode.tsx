import React from 'react';
import s from './CalculatorMode.module.scss';
import eye_off from '../../assets/eye_black.svg';
import eye_on from '../../assets/eye.svg';
import vector_on from '../../assets/Vector.svg';
import vector_off from '../../assets/Vector_black.svg';
import { useAppDispatch } from '../../hooks/HooksForState';
import { CalcThunk } from '../../state_manager/reducers/calc_reducer';

type CalculatorModeType = {
    changeModeHandler: (changeMode: boolean) => void
    changeMode: boolean
}

export const CalculatorMode = ({ changeModeHandler, changeMode }: CalculatorModeType) => {
    const dispatch = useAppDispatch()

    const changeToConstructor = () => {
        changeModeHandler(true)
        dispatch(CalcThunk(null))
    }

    return (
        <div className={s.change_mode_wrapper}>
            <button className={changeMode === false ? s.mode_run_time_on : s.mode_run_time}
                onClick={() => changeModeHandler(false)}
            >
                <img src={changeMode === false ? eye_on : eye_off} alt="eye" className={s.img_eye} />
                <div className={s.title}>Runtime</div>
            </button>
            <button className={changeMode === true ? s.mode_constructor_on : s.mode_constructor}
                onClick={changeToConstructor}
            >
                <img src={changeMode === true ? vector_on : vector_off} alt="vector" className={s.img_vector} />
                <div className={s.title}>Constructor</div>
            </button>
        </div>

    );
}