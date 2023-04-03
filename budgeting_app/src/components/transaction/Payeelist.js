import Axios from "axios";

export const getPayeeList = () => {
    const userID = localStorage.getItem('UserID');
    const baseUrl = `http://localhost:3001/category/${userID}`;
    const updatedArray = [];
    return Axios.get(baseUrl).then((response) => {
        for (let x = 0; x < response.data.length; x++) {
            const payee = response.data[x].Recipient;
            updatedArray.push({value: payee});
        }
        return updatedArray;
    }).catch((response) => {
        alert(response.response.data);
    });
};

//Tämä Account, Accountiin kuhan on bäckkis
/**
getPayeeList().then((data) => setPayeeList(data)).catch((error) => {
    console.log(error)
    alert('error retrieving Payeelist')
})

 **/