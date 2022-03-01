import React, {useEffect, useState} from 'react';
import s from './popup.module.css';

function PopUp({show,message,type}) {
    const [style, setStyle]=useState('');

    useEffect(()=>{
        let typeClass;
        switch (type){
            case 'error':
                typeClass = s.error
                break;
            case 'success':
                typeClass = s.success
                break;
            default:
                typeClass = s.success
        }

        setStyle(show ? `${s.popUpContainer} ${typeClass}` : `${s.popUpContainer} ${s.hide}`)
    },[show, type])


    return (
        <div className={ style }>
            <div className={s.text }>
                {message}
            </div>
        </div>
    );
}

export default React.memo(PopUp);