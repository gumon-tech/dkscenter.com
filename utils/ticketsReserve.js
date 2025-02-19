import axios from 'axios';
import env from '/config.env.json';
// ตรวจสอบว่าตัวแปร API_URL ได้ถูกกำหนดค่าหรือไม่
if (!env.apiUrl) {
  throw new Error('API_URL is not defined in environment variables.');
}

const API_URL = env.apiUrl;

export async function ticketsReserve({
  token,
  ticketId,
  ticketAmount,
  discountCode,
}) {
  try {
    const response = await axios.post(
      `${API_URL}/tickets/reserve`,
      {
        ticketId: ticketId,
        ticketAmount: ticketAmount,
        discountCode: discountCode,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    // ตรวจสอบว่าการส่งอีเมล์เสร็จสมบูรณ์และไม่มีข้อผิดพลาดเกิดขึ้น
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to send ticketsReserve.');
    }
  } catch (error) {
    console.error('Error sending ticketsReserve:', error);
    throw error;
  }
}
