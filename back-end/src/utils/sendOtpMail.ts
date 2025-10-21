import * as SibApiV3Sdk from '@sendinblue/client';
import dotenv from "dotenv";
dotenv.config();

if (!process.env.BREVO_API_KEY) {
  throw new Error("BREVO_API_KEY is not defined");
}

// Initialize Brevo API
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendOtpEmail = async (email: string, otp: string, purpose: "signup" | "forgot-password") => {
  try {
    console.log(`📧 Sending OTP to: ${email} for ${purpose}`);

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = { 
      name: "QubitX Team", 
      email: "nived4148@gmail.com" // Verified sender
    };
    sendSmtpEmail.to = [{ email }];

    if (purpose === "signup") {
      sendSmtpEmail.subject = "QubitX: Complete Your Signup 🔐";
      sendSmtpEmail.textContent = `Hello! Your QubitX signup OTP is: ${otp}. It is valid for 2 minutes.`;
      sendSmtpEmail.htmlContent = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 15px;">
          <h2 style="color: #333;">Welcome to QubitX!</h2>
          <p>Your signup OTP is:</p>
          <h1 style="color:#007BFF; font-size: 36px; letter-spacing: 5px;">${otp}</h1>
          <p style="font-size: 14px; color: #555;">This OTP is valid for <b>2 minutes</b>.</p>
          <p style="font-size: 12px; color: #888;">If you didn't request this, please ignore this email.</p>
        </div>
      `;
    } else if (purpose === "forgot-password") {
      sendSmtpEmail.subject = "QubitX: Reset Your Password 🔐";
      sendSmtpEmail.textContent = `Hello! Your password reset OTP is: ${otp}. It is valid for 10 minutes.`;
      sendSmtpEmail.htmlContent = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 15px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Your OTP to reset password is:</p>
          <h1 style="color:#FF5733; font-size: 36px; letter-spacing: 5px;">${otp}</h1>
          <p style="font-size: 14px; color: #555;">This OTP is valid for <b>2 minutes</b>.</p>
          <p style="font-size: 12px; color: #888;">If you didn't request this, please ignore this email.</p>
        </div>
      `;
    }

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully:", response);
    return response;

  } catch (error: any) {
    console.error("Error sending OTP:", error);
    throw new Error(`Failed to send OTP: ${error.message}`);
  }
};