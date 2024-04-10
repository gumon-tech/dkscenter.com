import { decodeJWT } from "./decodeJWT";

// ฟังก์ชั่นเพื่อดึงเวลาหมดอายุของ JWT
export const getJWTExpiration = (token) => {
  const decoded = decodeJWT(token);
  if (decoded && decoded.exp) {
    return new Date(decoded.exp * 1000); // คูณ 1000 เพื่อแปลงเป็น millisecond
  }
  return null;
};