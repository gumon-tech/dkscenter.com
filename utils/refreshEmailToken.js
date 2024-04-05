import axios from "axios";

// ตรวจสอบว่าตัวแปร API_URL ได้ถูกกำหนดค่าหรือไม่
if (!process.env.API_URL) {
  throw new Error("API_URL is not defined in environment variables.");
}

const API_URL = process.env.API_URL;

export async function refreshEmailToken({ refreshToken }) {
  try {
    const response = await axios.post(`${API_URL}/refresh-email-token`, {
      refreshToken: refreshToken,
    });

    // ตรวจสอบว่าการส่งอีเมล์เสร็จสมบูรณ์และไม่มีข้อผิดพลาดเกิดขึ้น
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to send refreshEmailToken.");
    }
  } catch (error) {
    console.error("Error sending refreshEmailToken:", error);
    throw error;
  }
}
