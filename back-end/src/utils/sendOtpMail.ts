// Install Brevo client: npm install @sendinblue/client
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

export const sendOtpEmail = async (email: string, otp: string) => {
  try {
    console.log(`📧 Sending OTP to: ${email}`);

    // Create email object
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    // Sender (verified Gmail)
    sendSmtpEmail.sender = { 
      name: "QubitX Team", 
      email: "nived4148@gmail.com" // Make sure this Gmail is verified in Brevo
    };

    // Recipient
    sendSmtpEmail.to = [{ email }];

    // Subject
    sendSmtpEmail.subject = "QubitX: Your OTP Code 🔐";

    // Plain text fallback
    sendSmtpEmail.textContent = `Hello! Your QubitX OTP is: ${otp}. It is valid for 10 minutes.`;

    // Simple, clean HTML content (minimalistic for Inbox)
    sendSmtpEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 15px;">
        <h2 style="color: #333;">QubitX Verification</h2>
        <p>Your OTP code is:</p>
        <h1 style="color:#007BFF; font-size: 36px; letter-spacing: 5px;">${otp}</h1>
        <p style="font-size: 14px; color: #555;">This OTP is valid for <b>10 minutes</b>.</p>
        <p style="font-size: 12px; color: #888;">If you didn't request this, please ignore this email.</p>
      </div>
    `;

    // Send email
    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email sent successfully:", response);
    return response;

  } catch (error: any) {
    console.error("❌ Error sending OTP:", error);
    throw new Error(`Failed to send OTP: ${error.message}`);
  }
};
