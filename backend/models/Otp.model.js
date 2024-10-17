import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 10*60*1000,
    }
});


async function sendVerificationEmail(email, otp) {
    // send email
    try {
        
    } catch (error) {
        console.log("Error while sending email: ", error);
        throw error;
    }
}

otpSchema.pre('save', async function() {
    await sendVerificationEmail(this.email, this.otp);
    next();
});

export const Otp = mongoose.model('Otp', otpSchema);