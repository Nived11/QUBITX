import nodemailer from "nodemailer";

export const sendOtpEmail = async (email: string, otp: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"QubitX" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Your OTP Code: <strong>${otp}</strong></h2>
          <p>This code will expire in <b>10 minutes</b>.</p>
          <br/>
          <p style="font-size: 12px; color: #888;">
            If you didn’t request this, please ignore this email.
          </p>
        </div>
      `,
    });

    console.log("✅ OTP sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    throw new Error("Failed to send OTP email");
  }
};
