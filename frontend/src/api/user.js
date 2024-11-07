import axios from "axios";
import { Cookie } from "lucide-react";

const BASE_URL = import.meta.env.VITE_B_URL

export const oAuthLogin = async (code) => {
    const response = await axios.get(`${BASE_URL}/auth/google?code=${code}`)
    const data = response.data
    return data
}

export const sendOtp = async (email) => {
    const response = await axios.post(`${BASE_URL}/auth/sendOtp`,{
        email: email
    })

    if(response.data.success === true){
        return true;
    }

    return false;
}

export const signUp = async (data, otp) => {
    try{

        const response = await axios.post(`${BASE_URL}/auth/signUp`,{
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password1,
            otp: otp
        })
        
        console.log(response);
        
        if(response.data.success === true){
            return response.data
        }
        
        return false;
    }catch(error){
        console.log("Error in signup after submitting Otp");
    }
}

export const login = async (data) => {
    try{
        const response = await axios.post(`${BASE_URL}/auth/login`,{
            email: data.email,
            password: data.password
        })

        if(response.data.success === true){
            return response.data
        }

        return false;
    }catch(error){
        console.log("Error in login");
    }
}

export const getUser = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/user/getUser`)
        if(response.data.success === true){
            return response.data
        }
        return false
    }catch(error){
        console.log("Error in getUser: ", error);
    }
}