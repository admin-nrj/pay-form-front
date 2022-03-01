const apiUrl="http://localhost:5000"
export const api = {
    sendPayment:async (payData)=>{
        const paymentDto = createDTO(payData);
        return fetch(`${apiUrl}/payment`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(paymentDto)

        })
            .then(async response => {
                if (response.ok) {
                    return {isOk: true, ...await response.json()}
                } else {
                    return {isOk: false, ...await response.json()}
                }
            })
            .catch((e)=>{
                console.log(e.message)
            })
    }
}

function createDTO(payData) {
    return { cardNumber: payData.ccNumber.replace(/\s/g, ''),
        expDate: `${payData.ccMonth}/${payData.ccYear}`,
        cvv: payData.ccCSC,
        amount: payData.amount }
}