const jwtDecode = require('jwt-decode');

// ฟังก์ชั่นเพื่อถอดรหัส JWT และดึงข้อมูล payload
export const decodeJWT = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};
