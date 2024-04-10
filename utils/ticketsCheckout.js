import axios from "axios";
import env from "/config.env.json"
// ตรวจสอบว่าตัวแปร API_URL ได้ถูกกำหนดค่าหรือไม่
if (!env.apiUrl) {
  throw new Error("API_URL is not defined in environment variables.");
}

const API_URL = env.apiUrl;

export async function ticketsCheckout({ token, reserveId, attendees = [] }) {
  const attendeesData = attendees.map((item) => {
    return {
      firstName: item.firstName || 'firstName',
      lastName: item.lastName || 'lastName',
      email: item.email || 'email',
      phoneNumber: item.phoneNumber || '00000000',
    };
  });
  try {
    const response = await axios.post(
      `${API_URL}/tickets/checkout`,
      {
        reserveId: reserveId,
        attendees: attendeesData,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // ตรวจสอบว่าการส่งอีเมล์เสร็จสมบูรณ์และไม่มีข้อผิดพลาดเกิดขึ้น
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to send ticketsCheckout.");
    }
  } catch (error) {
    console.error("Error sending ticketsCheckout:", error);
    throw error;
  }
}
