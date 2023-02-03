import axios from "axios";

const baseUrl = "https://localhost:3001/user/register";

const sendData = async (req) => {
    console.log(req)
    const config = { 'content-type': 'application/json'}

    await axios.post(baseUrl, req)

        /*
        .then(function (res) {
            console.log(res)
        })
        .catch(function (res) {
            console.log(res)
        })

         */
}


export default sendData;