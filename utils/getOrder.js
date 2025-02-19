import axios from 'axios';
import env from '/config.env.json';
// ตรวจสอบว่าตัวแปร API_URL ได้ถูกกำหนดค่าหรือไม่
if (!env.apiUrl) {
  throw new Error('API_URL is not defined in environment variables.');
}

const API_URL = env.apiUrl;

export async function getOrder({ token, orderId }) {
  try {
    const response = await axios.get(`${API_URL}/tickets/order/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // ตรวจสอบว่าการส่งอีเมล์เสร็จสมบูรณ์และไม่มีข้อผิดพลาดเกิดขึ้น
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to getOrder');
    }
  } catch (error) {
    console.error('Error getOrder:', error);
    throw error;
  }
}
