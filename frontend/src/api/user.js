import axios from "axios";
import.meta.env.VITE_B_URL

export const oauthLogin = async (code) => {
    const response = await axios.get(`${import.meta.env.VITE_B_URL}/auth/google?code=${code}`)
    console.log(response);
    const data = response.data
    return data
}