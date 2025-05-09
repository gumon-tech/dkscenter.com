import axios from 'axios';
import Cookies from 'js-cookie';

import env from '/config.env.json';
// ตรวจสอบว่าตัวแปร API_URL ได้ถูกกำหนดค่าหรือไม่
if (!env.apiUrl) {
  throw new Error('API_URL is not defined in environment variables.');
}

const API_URL = env.apiUrl;

export async function refreshEmailToken({ refreshToken }) {
  try {
    const response = await axios.post(`${API_URL}/refresh-email-token`, {
      refreshToken: refreshToken,
    });

    // ตรวจสอบว่าการส่งอีเมล์เสร็จสมบูรณ์และไม่มีข้อผิดพลาดเกิดขึ้น
    if (response.status === 200) {
      const accessToken = response.data.accessToken;
      Cookies.set('accessToken', accessToken, { expires: 7 }); // กำหนดเวลาในการหมดอายุของ Cookie

      return response.data;
    } else {
      throw new Error('Failed to send refreshEmailToken.');
    }
  } catch (error) {
    console.error('Error sending refreshEmailToken:', error);
    throw error;
  }
}
