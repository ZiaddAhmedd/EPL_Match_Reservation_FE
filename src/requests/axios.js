import axios from "axios";

const instance  = axios.create({
    baseURL: "https://epl-match-reservation-be.vercel.app/",
    headers: {
        Authorization: "Bearer "+ sessionStorage.getItem("token"),
        ID: sessionStorage.getItem("id")
    }
})

export default instance