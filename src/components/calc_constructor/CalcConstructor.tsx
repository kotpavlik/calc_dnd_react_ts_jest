import React from 'react';
import img_icon from '../../assets/Group.svg'
import s from './CalcConstructor.module.scss'

export const CalcConstructor = () => {
    return (
        <div className={s.constructor_wrapper}>
            <img src={img_icon} alt='add new' className={s.icon} />
            <div className={s.title}>Перетащите сюда</div>
            <div className={s.sub_title}>любой элемент из левой панели</div>
        </div>

    );
}