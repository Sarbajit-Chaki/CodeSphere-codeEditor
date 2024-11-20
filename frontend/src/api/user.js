import axios from "axios";
import { Cookie, Phone } from "lucide-react";

const BASE_URL = import.meta.env.VITE_B_URL

export const oAuthLogin = async (code) => {
    const response = await axios.get(`${BASE_URL}/auth/google?code=${code}`, { withCredentials: true })
    const data = response.data
    return data
}

export const sendOtp = async (email) => {
    const response = await axios.post(`${BASE_URL}/auth/sendOtp`, {
        email: email
    })

    if (response.data.success === true) {
        return true;
    }

    return false;
}

export const signUp = async (data, otp) => {
    try {

        const response = await axios.post(`${BASE_URL}/auth/signUp`, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password1,
            otp: otp
        }, {
            withCredentials: true,
        })

        console.log(response);

        if (response.data.success === true) {
            return response.data
        }

        return false;
    } catch (error) {
        console.log("Error in signup after submitting Otp");
    }
}

export const login = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, {
            email: data.email,
            password: data.password
        }, {
            withCredentials: true,
        })

        if (response.data.success === true) {
            return response.data
        }

        return false;
    } catch (error) {
        console.log("Error in login");
    }
}

export const getUser = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user/getUser`, { withCredentials: true })
        if (response.data.success === true) {
            return response.data
        }
        return false
    } catch (error) {
        console.log("Error in getUser: ");
    }
}

export const logout = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/logout`, { withCredentials: true })
        if (response.data.success === true) {
            return response.data
        }
        return false
    } catch (error) {
        console.log("Error in logout: ");
    }
}

export const updateProfile = async (data) => {
    try {
        const response = await axios.put(`${BASE_URL}/user/updateProfile`, {
            data
        }, {
            withCredentials: true
        })

        console.log("update profile response: ", response);

        if (response.data.success === true) {
            return response.data
        }

        return false
    } catch (error) {
        console.log("Error in updateProfile: ", error);
    }
}

export const updatePassword = async (data) => {
    try {
        const response = await axios.put(`${BASE_URL}/user/updatePassword`, {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }, {
            withCredentials: true
        })

        if (response.data.success === true) {
            return response.data
        }

        return false
    } catch (error) {
        console.log("Error in updatePassword: ");
    }
}

export const deleteUser = async () => {
    try {
        const response = await axios.delete(`${BASE_URL}/user/deleteUser`, { withCredentials: true })
        if (response.data.success === true) {
            return response.data
        }

        return false
    } catch (error) {
        console.log("Error in deleteUser: ");
    }
}

export const contactUs = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/contact/contactForm`, {
            firstname: data.firstName,
            lastname: data.lastName,
            email: data.email,
            phone: data.phone,
            message: data.message
        })

        if (response.data.success === true) {
            return response.data.data
        }

        return false
    } catch (error) {
        console.log("Error in contactUs", error);
    }
}

export const createRoom = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/room/createRoom`, {
            roomName: data.roomName,
            language: data.language,
            isVisible: data.isVisible,
            isMsgEnable: data.isMsgEnable
        }, {
            withCredentials: true
        })

        if (response.data.success === true) {
            return response.data
        }

        return false
    } catch (error) {
        console.log("Error in createRoom: ", error);
    }
}

export const joinRoom = async (roomId) => {
    try {
        const response = await axios.post(`${BASE_URL}/room/joinRoom`, {
            roomId
        }, {
            withCredentials: true
        })

        if (response.data.success === true) {
            return response.data
        }

        return false
    } catch (error) {
        console.log("Error in joinRoom: ", error);
    }
}

export const getMembers = async (roomId) => {
    try {
        const response = await axios.post(`${BASE_URL}/room/getMembers`, {
            roomId
        }, {
            withCredentials: true
        })

        if (response.data.success === true) {
            return response.data
        }

        return false
    } catch (error) {
        console.log("Error in getMembers", error);
    }
}

export const getRoomDetails = async (roomId) => {
    try {
        const response = await axios.post(`${BASE_URL}/room/getRoomDetails`, {
            roomId
        }, {
            withCredentials: true
        })

        if (response.data.success === true) {
            return response.data
        }

        return false
    } catch (error) {
        console.log("Error in getRoomDetails: ", error);
    }
}

export const getMessages = async (roomId) => {
    try {
        const response = await axios.post(`${BASE_URL}/message/getMessages`, {
            roomId
        }, {
            withCredentials: true
        })

        if (response.data.success === true) {
            return response.data
        }

        return false
    } catch (error) {
        console.log('Error in getMessages: ', error);
    }
}

export const compileCode = async (data) => {
    try {
        const { input, code, language } = data;

        const response = await axios.post(`https://emkc.org/api/v2/piston/execute`, {
            language: language,
            version: "*",
            files: [
                {
                    "content": code
                }
            ],
            "stdin": input,
            timeout: 3,
        })

        if (response.data.run.signal === "SIGKILL") {
            return "Time Limit Exceeded";
        }
        else if (response.data.run.stderr) {
            return response.data.run.stderr;
        }
        else if (response.data.run.code === 0) {
            return response.data.run.stdout;
        }

        return false;
    } catch (error) {
        console.log("Error in compileCode: ", error);
    }
}

export const getCode = async (roomId) => {
    try {
        const response = await axios.post(`${BASE_URL}/code/getCode`, {
            roomId,
        }, { withCredentials: true });

        if (response.data.success === true) {
            return response.data;
        }

        return false
    } catch (error) {
        console.log("Error in getCode: ", error);
    }
}

export const getRemoteCode = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/code/getRemoteCode`, {
            roomId: data.roomId,
            userId: data.userId
        }, { withCredentials: true });

        if (response.data.success === true) {
            return response.data;
        }

        return false
    } catch (error) {
        console.log("Error in getCode: ", error);
    }
}