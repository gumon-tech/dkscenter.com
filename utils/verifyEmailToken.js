import axios from "axios";

// ตรวจสอบว่าตัวแปร API_URL ได้ถูกกำหนดค่าหรือไม่
if (!process.env.API_URL) {
  throw new Error("API_URL is not defined in environment variables.");
}

const API_URL = process.env.API_URL;

export async function verifyEmailToken({ id, email, ref, otp }) {
  try {
    const response = await axios.post(`${API_URL}/verify-email-token`, {
      id: id,
      email: email,
      ref: ref,
      otp: otp,
    });

    // ตรวจสอบว่าการส่งอีเมล์เสร็จสมบูรณ์และไม่มีข้อผิดพลาดเกิดขึ้น
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to send verification email.");
    }
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
}
