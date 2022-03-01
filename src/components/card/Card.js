import React, {useState} from 'react';
import s from './card.module.css'

const Card = () => {
    const regexpNums = /^[0-9\b]+$/;
    const [values, setValues] = useState({ccNumber: '', ccMonth: '', ccYear: '', ccCSC: '', amount: ''});
    const [hasErrors, setErrors] = useState(true);


    function checkNumberValue(text) {
        return text === '' || regexpNums.test(text)
    }

    const onChangeHandler = (name, value) => {
        if (name === 'ccNumber')
            value = value.replace(/\s/g, '');

        if (!checkNumberValue(value))
            return;

        if (name === 'ccNumber') {
            value = separate(value, 4).join(" ");
        }

        setValues((values) => {
            const newValues = {...values, [name]: value};
            setErrors(validate(newValues))
            return newValues
        });
    }

    function validate(values) {
        if (values?.ccNumber.length !== 19)
            return true;

        if (values?.ccCSC.length !== 3) {
            return true;
        }

        if (values?.amount.length<1 || parseInt(values?.amount)<=0)
            return true;

        const today = new Date();
        const someday = new Date();
        if (values?.ccMonth<1 || values?.ccMonth>12 || values?.ccYear.length<1 )
            return true;

        if (parseInt(values?.ccMonth) || parseInt(values?.ccYear))
            someday.setFullYear(values.ccYear, values.ccMonth, 1);

        if (someday < today) {
            return true
        }

        return false
    }

    const separate = (xs, s) => xs.length ? [xs.slice(0, s), ...separate(xs.slice(s), s)] : []

    return (
        <div className={s.cardWrapper}>
            <div className={s.card}>
                <h2>Invoice</h2>
                <div className={s.payLogos}>
                    <img src={'payLogo.png'} alt={'patLogo'}/>
                </div>
                <div className={s.field + ' ' + s.cardNumber}>
                    <label>Card number</label>
                    <input
                        value={values.ccNumber ? values.ccNumber : ''}
                        onChange={(e) => {
                            onChangeHandler("ccNumber", e.target.value)
                        }}
                        type={'tel'}
                        inputMode={"numeric"}
                        pattern={"[0-9]*"}
                        autoComplete={"cc-number"}
                        maxLength={19}
                        placeholder={"xxxx xxxx xxxx xxxx"}/>
                </div>
                <div className={s.cardDateCVV}>
                    <div className={s.field}>
                        <label>Expiration Date</label>
                        <div className={s.expDate}>
                            <input
                                value={values.ccMonth ? values.ccMonth : ''}
                                onChange={(e) => {
                                    onChangeHandler("ccMonth", e.target.value)
                                }}
                                inputMode={"numeric"} maxLength={2} autoComplete={"cc-exp-month"}
                                   placeholder={'MM'}/>
                            <span>/</span>
                            <input
                                value={values.ccYear ? values.ccYear : ''}
                                onChange={(e) => {
                                    onChangeHandler("ccYear", e.target.value)
                                }}
                                inputMode={"numeric"} maxLength={4} autoComplete={"cc-exp-year"}
                                   placeholder={'YYYY'}/>
                        </div>
                    </div>
                    <div className={s.field + ' ' + s.cvv}>
                        <label>CVV</label>
                        <input
                            value={values.ccCSC ? values.ccCSC : ''}
                            onChange={(e) => {
                                onChangeHandler("ccCSC", e.target.value)
                            }}
                            type={"password"}
                            inputMode={"numeric"} required autoComplete="cc-csc" maxLength={3}
                            placeholder={"xxxx xxxx xxxx xxxx"}/>
                    </div>
                </div>
                <div className={s.field + ' ' + s.amount}>
                    <label>Amount</label>
                    <input value={values.amount ? values.amount : ''}
                           onChange={(e) => {
                               onChangeHandler("amount", e.target.value)
                           }}
                           type={'tel'} inputMode={"numeric"} maxLength={19}
                           placeholder={"xxx"}/>
                </div>
                <div className={s.btn}>
                    <button disabled={hasErrors} type={"submit"}>Submit</button>
                </div>
            </div>

        </div>
    );
};

export default Card;