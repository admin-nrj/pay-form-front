import React from 'react';
import s from './card.module.css'

const Card = () => {
    return (
        <div className={s.cardWrapper}>
            <div className={s.card}>
                <h2>Invoice</h2>
                <div className={s.payLogos}>
                    <img src={'payLogo.png'} alt={'patLogo'}/>
                </div>
                <div className={s.field + ' ' + s.cardNumber}>
                    <label>Card number</label>
                    <input type={'tel'} inputMode={"numeric"} autoComplete={"cc-number"} maxLength={16}
                           placeholder={"xxxx xxxx xxxx xxxx"}/>
                </div>
                <div className={s.cardDateCVV}>
                    <div className={s.field}>
                        <label>Expiration Date</label>
                        <div className={s.expDate}>
                            <input inputMode={"numeric"} maxLength={2} autoComplete={"cc-exp-month"} placeholder={'xx'}/>
                            <span>/</span>
                            <input inputMode={"numeric"} maxLength={2} autoComplete={"cc-exp-year"} placeholder={'xx'}/>
                        </div>
                    </div>
                    <div className={s.field + ' ' + s.cvv}>
                        <label>CVV</label>
                        <input type={"password"} inputMode={"numeric"} required autoComplete="cc-csc" maxLength={3}
                               placeholder={"xxxx xxxx xxxx xxxx"}/>
                    </div>
                </div>
                <div className={s.field + ' ' + s.amount}>
                    <label>Amount</label>
                    <input type={'tel'} inputMode={"numeric"} maxLength={19}
                           placeholder={"xxx"}/>
                </div>
                <div className={s.btn}>
                    <button type={"submit"}>Submit</button>
                </div>
            </div>

        </div>
    );
};

export default Card;