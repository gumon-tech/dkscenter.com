import axios from "axios";

import env from "/config.env.json"
// ตรวจสอบว่าตัวแปร API_URL ได้ถูกกำหนดค่าหรือไม่
if (!env.apiUrl) {
  throw new Error("API_URL is not defined in environment variables.");
}

const API_URL = env.apiUrl;

export async function getTickets({ courseKey, scheduleKey,discountCode }) {
  try {
    const response = await axios.get(
      `${API_URL}/tickets/courses/${courseKey}/schedules/${scheduleKey}`,
      {
        params: {
          discount_code: discountCode,
        },
      }
    );

    // ตรวจสอบว่าการส่งอีเมล์เสร็จสมบูรณ์และไม่มีข้อผิดพลาดเกิดขึ้น
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to send getTickets.");
    }
  } catch (error) {
    console.error("Error sending getTickets:", error);
    throw error;
  }
}
