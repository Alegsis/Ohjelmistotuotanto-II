import axios from 'axios'

const baseUrl = "https://localhost:3001/register";
const getData = () => {
    axios.get(baseUrl)
        .then(response => {
            console.log(response)
        });
}

const sendData = (req, response) => {
    const body = req.body

    if(!body.AccountName){
        return response.status(400).json({
        })
    }

    axios.post(baseUrl, {
        AccountName: body.AccountName,
        AccountType: body.AccountType,
        Balance: body.Balance,
        BalanceDate: body.BalanceDate,
        UserID: body.UserID
    })
        .then(response =>{
            console.log(response)
        })
}

module.exports = {getData,sendData}