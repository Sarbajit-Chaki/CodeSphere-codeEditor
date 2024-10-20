import axios from "axios";

const BASE_URL = import.meta.env.VITE_B_URL

export const oAuthLogin = async (code) => {
    const response = await axios.get(`${BASE_URL}/auth/google?code=${code}`)
    console.log(response);
    const data = response.data
    return data
}