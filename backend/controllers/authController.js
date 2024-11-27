import otpGenerator from 'otp-generator';
import { Otp } from '../models/Otp.model.js';
import { User } from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { oauth2Client } from '../config/googleConfig.js';
import mailSender from '../utils/mailSender.js';
import forgotPasswordTemplate from '../utils/forgotMail.js';


const cookieOptions = {
    httpOnly: false,
    expires: new Date(Date.now() + 1 * 365 * 24 * 60 * 60 * 1000),
    sameSite: "none",
    secure: true,
    path: "/"
}

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(204).json({
                success: false,
                message: 'User already exists'
            })
        }

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        }).toString();

        const otpModel = await Otp.create({ email, otp });

        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully'
        });
    } catch (error) {
        console.log("Error in sendOtp: ", error);
    }
}

export const emailSignup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, otp } = req.body;
        if (!firstName || !lastName || !email || !password || !otp) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const recentOtp = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (recentOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found"
            });
        }
        else if (recentOtp[0].otp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ firstName, lastName, email, password: hashedPassword });
        user.password = undefined;

        const payload = {
            name: user.firstName + " " + user.lastName,
            email: user.email,
            id: user._id,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.cookie("token", token, cookieOptions).status(201).json({
            success: true,
            message: 'User created successfully',
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const emailLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Unauthorize'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'InvalidPassword'
            });
        }

        const payload = {
            name: user.firstName + " " + user.lastName,
            email: user.email,
            id: user._id,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        user.password = undefined;
        return res.cookie("token", token, cookieOptions).status(200).json({
            success: true,
            message: 'User logged in successfully',
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const googleSignup = async (req, res) => {
    try {
        const code = req.query.code;
        const { tokens } = await oauth2Client.getToken(code); //
        oauth2Client.setCredentials(tokens);

        // Fetch user info from google userinfo API
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`);
        const data = await response.json();
        console.log(data);

        const email = data.email;

        const user = await User.findOne({ email });
        if (user) {
            const payload = {
                name: user.firstName + " " + user.lastName,
                email: user.email,
                id: user._id,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET);

            user.password = undefined;
            return res.cookie("token", token, cookieOptions).status(200).json({
                success: true,
                message: 'User logged in successfully',
                user
            });
        }

        const newUser = await User.create({
            email: data.email,
            firstName: data.given_name,
            lastName: data.family_name,
            imageUrl: data.picture,
            googleId: data.id
        });

        const payload = {
            name: newUser.firstName + " " + newUser.lastName,
            email: newUser.email,
            id: newUser._id,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.cookie("token", token, cookieOptions).status(201).json({
            success: true,
            message: 'User created successfully',
            user: newUser
        });

    } catch (error) {
        console.log("Error in googleSignup: ", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error in Google Signup'
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", { path: "/" });
        return res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        });
    } catch (error) {
        console.log("Error in logout: ", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const sendMailForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '15m' })

        await mailSender(email, 'Forgot Password? Add a new One', forgotPasswordTemplate(token, email));

        return res.status(200).json({
            success: true,
            message: 'Forgot Password mail sent successfully'
        })

    } catch (error) {
        console.log("Error in sendMailForgotPassword");
    }
}

export const verifyToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Token is required'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Token verified successfully',
            decoded
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error
        });
    }
}

export const resetPassword = async (req, res) => {
    try {
        const { password, email } = req.body;
        if (!password || !email) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });

    } catch (error) {
        console.log("Error in resetPassword");
    }
}