import Axios from "axios";

const baseUrl = "http://localhost:3001/user/register";
/*
*Aivan turha juttu toiminnan kannalta
*/

const sendData = (req) => {
  Axios.post(baseUrl, {
    req
  }).then(() => {
    alert("successful insert")
  });
};

export default sendData;
