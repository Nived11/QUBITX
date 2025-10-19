import * as SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.SENDINBLUE_API_KEY) {
  throw new Error("SENDINBLUE_API_KEY is not defined in .env");
}

const client = new SibApiV3Sdk.TransactionalEmailsApi(
  new SibApiV3Sdk.ApiClient()
);
client.apiClient.authentications["api-key"].apiKey = process.env.SENDINBLUE_API_KEY;

export const sendOtpEmail = async (email: string, otp: string) => {
  try {
    const response = await client.sendTransacEmail({
      sender: { name: "QubitX", email: "no-reply@onresend.dev" },
      to: [{ email }],
      subject: "Your OTP Code",
      htmlContent: `<h2>Your OTP Code: ${otp}</h2><p>Expires in 10 minutes</p>`,
    });
    console.log("✅ OTP sent:", response);
  } catch (err) {
    console.error("❌ OTP email failed:", err);
    throw new Error("Failed to send OTP email");
  }
};
