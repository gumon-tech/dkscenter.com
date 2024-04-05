import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import Countdown from "react-countdown";
import { sendVerifyEmail } from "../../utils/sendVerifyEmail";
import { verifyEmailToken } from "../../utils/verifyEmailToken";
import { ticketsReserve } from "../../utils/ticketsReserve";

const API_URL = process.env.API_URL;

export default function EmailTicketSale({
  i18next,
  accessToken,
  setAccessToken,
  refreshToken,
  setRefreshToken,
  discountCode,
  ticketId,
  ticketAmount,
  reserveId,
  setReserveId,
  reserveExpire,
  setReserveExpire,
  setManageState,
}) {
  const [email, setEmail] = useState("");
  const [ref, setRef] = useState("");
  const [expireAt, setExpireAt] = useState(new Date());
  const [sendVerifyEmailId, setSendVerifyEmailId] = useState("");
  const [otp, setOTP] = useState("");
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    // ส่งอีเมลไปยังเซิร์ฟเวอร์เพื่อขอ OTP
    // onConfirmEmail(email);
    setIsLoading(true);
    setShowOTPForm(true);
    try {
      const response = await sendVerifyEmail(email); // เพิ่ม await เพื่อรอให้การส่งอีเมล์เสร็จสมบูรณ์ก่อน
      setRef(response.ref);
      setExpireAt(response.expireAt);
      setSendVerifyEmailId(response.id);
    } catch (error) {
      console.error("Error sending verification email:", error);
      // ทำการจัดการข้อผิดพลาดตามที่คุณต้องการ
    }
    // แสดงฟอร์มใส่ OTP หลังยืนยันอีเมล
    setIsLoading(false);
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    // ส่ง OTP ไปยังเซิร์ฟเวอร์เพื่อยืนยัน
    setIsLoading(true);
    try {
      const response = await verifyEmailToken({
        id: sendVerifyEmailId,
        email: email,
        ref: ref,
        otp: otp,
      });

      const newAccessToken = response.accessToken;
      const newRefreshToken = response.refreshToken;

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      // ยิง api ซื้อ
      try {
        const response = await ticketsReserve({
          token: newAccessToken,
          ticketId: ticketId,
          ticketAmount: ticketAmount,
          discountCode: discountCode,
        });

        console.log("ticketsReserve data", response);
        setReserveId(response.reserveDetail.reserveId);
        setReserveExpire(response.reserveDetail.expireAt);
        setManageState(2);
      } catch (error) {
        console.error("Error ticketsReserve :", error);
        // ทำการจัดการข้อผิดพลาดตามที่คุณต้องการ
      }
    } catch (error) {
      console.error("Error sending verifyEmailToken :", error);
      // ทำการจัดการข้อผิดพลาดตามที่คุณต้องการ
    }

    setIsLoading(false);
  };

  const handleResendOTP = async (e) => {
    // ส่งอีเมลไปยังเซิร์ฟเวอร์เพื่อขอ OTP ใหม่
    setIsLoading(true);
    try {
      const response = await sendVerifyEmail(email); // เพิ่ม await เพื่อรอให้การส่งอีเมล์เสร็จสมบูรณ์ก่อน
      setRef(response.ref);
      setExpireAt(response.expireAt);
      setSendVerifyEmailId(response.id);
    } catch (error) {
      console.error("Error sending verification email:", error);
      // ทำการจัดการข้อผิดพลาดตามที่คุณต้องการ
    }
    setShowOTPForm(true); // แสดงฟอร์มใส่ OTP หลังยืนยันอีเมล
    setIsLoading(false);
    setOTP("");
  };

  return (
    <>
      <div className="container mx-auto">
        {!showOTPForm && (
          <div className="max-w-md mx-auto mt-8">
            <div className="bg-white shadow-md rounded px-8 py-8">
              <h2 className="text-2xl font-semibold text-center mb-4">
                Email Confirmation
              </h2>
              <form onSubmit={handleEmailSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                >
                  Confirm Email
                </button>
              </form>
            </div>
          </div>
        )}

        {showOTPForm && !isLoading && (
          <div className="max-w-md mx-auto mt-8">
            <div className="bg-white shadow-md rounded px-8 py-8">
              <h2 className="text-2xl font-semibold text-center mb-4">
                OTP Confirmation
              </h2>
              <p className="text-center mb-4">
                Please enter the OTP sent to your email.
              </p>
              <p className="text-left text-gray-600 mb-2">
                Email: {email}
                <br />
                Ref: {ref}
                <br />
                Expire At: <Countdown date={expireAt} />
              </p>
              <form onSubmit={handleOTPSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="otp"
                  >
                    OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full mb-2"
                >
                  Confirm OTP
                </button>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-blue-500 hover:underline"
                    onClick={handleResendOTP}
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showOTPForm && isLoading && (
          <div className="flex justify-center items-center h-screen">
            <ReactLoading
              type="spinningBubbles"
              color={"#049ee8"}
              height={100} // ปรับความสูง
              width={100} // ปรับความกว้าง
            />
          </div>
        )}
      </div>
    </>
  );
}
