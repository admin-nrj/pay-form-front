import React, {useEffect, useState} from 'react';
import s from './popup.module.css';

function PopUp({options}) {

    const [style, setStyle]=useState('');
    const [message, setMessage] = useState('')
    useEffect(()=>{
        const {isShow,message,type} = options;
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

        setStyle(isShow ? `${s.popUpContainer} ${typeClass}` : `${s.popUpContainer} ${s.hide}`)
        setMessage(message);
    },[options])


    return (
        <div className={ style }>
            <div className={s.text }>
                {message}
            </div>
        </div>
    );
}

export default React.memo(PopUp);