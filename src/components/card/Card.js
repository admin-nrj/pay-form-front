import React, {useState} from 'react';
import s from './card.module.css'
import {api} from "../../api/apiService";
import Loader from "../Loader/Loader";

const Card = ({showPopUpHandler}) => {
    const regexpNums = /^[0-9\b]+$/;
    const [values, setValues] = useState({ccNumber: '', ccMonth: '', ccYear: '', ccCSC: '', amount: ''});
    const [errors, setErrors] = useState({ccNumber: '', ccDate: '', ccCSC: '', amount: ''});
    const [isLoading, setIsLoading] = useState(false);

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
        let ccNumber='';
        let ccCSC='';
        let amount='';
        let ccDate = '';

        if (values?.ccNumber.length !== 19)
            ccNumber='Length of card number must be 16';

        if (values?.ccCSC.length !== 3) {
            ccCSC='Length of CVC must be 3'
        }

        if (values?.amount.length < 1 || parseInt(values?.amount) <= 0)
            amount='Amount must be greater that 0';

        const today = new Date();
        const someday = new Date();
        if (values?.ccMonth < 1 || values?.ccMonth > 12 || values?.ccYear.length < 1)
            ccDate = 'Month must be value from 1 to 12'

        if (parseInt(values?.ccMonth) || parseInt(values?.ccYear))
            someday.setFullYear(values.ccYear, values.ccMonth - 1, 1);

        if (someday < today) {
            ccDate = "Date can't be from past"
        }

        return {ccNumber, ccCSC, ccDate, amount}
    }

    const separate = (xs, s) => xs.length ? [xs.slice(0, s), ...separate(xs.slice(s), s)] : []

    const onclickHandler = () => {
        setIsLoading(true);
        api.sendPayment(values)
            .then(res => {
                const type = res.isOk? 'success' : 'error'
                const message = res.isOk ? `Платёж на сумму ${res.amount} успешно зачислен. 
                Идентификатор платежа ${res.requestId}`: res.message
                showPopUpHandler(type,message)
            })
            .finally(()=>setIsLoading(false))
    }

    return (
        <>
            <Loader isActive={isLoading}/>
            <div className={s.cardWrapper}>
                <div className={s.card}>
                    <form>
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
                            {errors.ccNumber.length > 0 &&
                                <span className={s.error}>{errors.ccNumber}</span>}
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
                                    {errors.ccDate.length > 0 &&
                                        <span className={s.error}>{errors.ccDate}</span>}
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
                                    placeholder={"xxx"}/>
                                {errors.ccCSC.length > 0 &&
                                    <span className={s.error}>{errors.ccCSC}</span>}
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
                            {errors.amount.length > 0 &&
                                <span className={s.error}>{errors.amount}</span>}
                        </div>
                        <div className={s.btn}>
                            <button disabled={
                                (errors.ccNumber.length>0 ||
                                errors.ccDate.length>0 ||
                                errors.ccCSC.length>0 ||
                                errors.amount.length>0)
                            } type={"submit"} onClick={onclickHandler}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Card;