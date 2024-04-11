import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import Countdown from "react-countdown";
import { sendVerifyEmail } from "../../utils/sendVerifyEmail";
import { verifyEmailToken } from "../../utils/verifyEmailToken";
import { ticketsReserve } from "../../utils/ticketsReserve";

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
  const { t, i18n } = i18next;

  const [email, setEmail] = useState("");
  const [ref, setRef] = useState("");
  const [expireAt, setExpireAt] = useState(new Date());
  const [sendVerifyEmailId, setSendVerifyEmailId] = useState("");
  const [otp, setOTP] = useState("");
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    // ส่งอีเมลไปยังเซิร์ฟเวอร์เพื่อขอ OTP
    // onConfirmEmail(email);

    setIsLoading(true);
    setShowOTPForm(true);
    try {
      setError(null);
      const response = await sendVerifyEmail(email); // เพิ่ม await เพื่อรอให้การส่งอีเมล์เสร็จสมบูรณ์ก่อน
      setRef(response.ref);
      setExpireAt(response.expireAt);
      setSendVerifyEmailId(response.id);
      setShowOTPForm(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending verification email:", error);
      setError(error);
      setIsLoading(false);
      setShowOTPForm(false);
      if ("EMAIL_IS_INVALID" === error?.response?.data?.code) {
        alert(t("error-email-is-invalid"));
      } else {
        alert(error?.response?.data?.message);
      }
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    // ส่ง OTP ไปยังเซิร์ฟเวอร์เพื่อยืนยัน
    setIsLoading(true);
    try {
      setError(null);
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
        setError(null);
        const response = await ticketsReserve({
          token: newAccessToken,
          ticketId: ticketId,
          ticketAmount: ticketAmount,
          discountCode: discountCode,
        });

        setReserveId(response.reserveDetail.reserveId);
        setReserveExpire(response.reserveDetail.expireAt);
        setManageState(2);
        setError(null);
      } catch (error) {
        console.error("Error ticketsReserve :", error);
        setError(error);
        alert(error?.response?.data?.message);
      }
    } catch (error) {
      console.error("Error sending verifyEmailToken :", error);
      setError(error);
      if ("EMAIL_REF_OTP_INVALID" === error?.response?.data?.code) {
        alert(t("error-otp-is-invalid"));
      } else {
        alert(error?.response?.data?.message);
      }
    }

    setIsLoading(false);
  };

  const handleResendOTP = async (e) => {
    // ส่งอีเมลไปยังเซิร์ฟเวอร์เพื่อขอ OTP ใหม่
    setIsLoading(true);
    try {
      setError(null);
      const response = await sendVerifyEmail(email); // เพิ่ม await เพื่อรอให้การส่งอีเมล์เสร็จสมบูรณ์ก่อน
      setRef(response.ref);
      setExpireAt(response.expireAt);
      setSendVerifyEmailId(response.id);
    } catch (error) {
      console.error("Error sending verification email:", error);
      setError(error);
      if ("EMAIL_REF_OTP_INVALID" === error?.response?.data?.code) {
        alert(t("error-otp-is-invalid"));
      } else {
        alert(error?.response?.data?.message);
      }
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
            <div className="bg-white rounded px-8 py-8 dark:bg-gray-800">
              <h2 className="text-2xl font-semibold text-center mb-4">
                {t("ticket-email-email-confirmation")}
              </h2>
              <form onSubmit={handleEmailSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-400"
                    htmlFor="email"
                  >
                    {t("ticket-email-email-address")}
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
                  {t("ticket-email-email-confirm-email")}
                </button>
              </form>
            </div>
          </div>
        )}

        {showOTPForm && !isLoading && (
          <div className="max-w-md mx-auto mt-8">
            <div className="bg-white rounded px-8 py-8 dark:bg-gray-800 ">
              <h2 className="text-2xl font-semibold text-center mb-4 ">
                {t("ticket-email-oto-confirmation")}
              </h2>
              <p className="text-center mb-4">{t("ticket-email-oto-enter")}</p>
              <p className="text-left text-gray-600 dark:text-gray-300 mb-2">
                Email: {email}
                <br />
                {t("ticket-email-oto-ref")}: {ref}
                <br />
                {t("ticket-email-oto-expire")}: <Countdown date={expireAt} />
              </p>
              <form onSubmit={handleOTPSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300"
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
                  {t("ticket-email-oto-confirm")}
                </button>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-blue-500 hover:underline"
                    onClick={handleResendOTP}
                  >
                    {t("ticket-email-oto-resend")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showOTPForm && isLoading && (
          <div className="max-w-md mx-auto mt-8">
            <div className="flex justify-center items-center">
              <ReactLoading
                type="spinningBubbles"
                color={"#049ee8"}
                height={200} // ปรับความสูง
                width={200} // ปรับความกว้าง
              />
            </div>
          </div>
        )}
      </div>

      {/* {error && (
        <div className="error text-red-500">
          <p>error message: {JSON.stringify(error?.message)}</p>
          <p>error name: {JSON.stringify(error?.name)}</p>
          <p>error code: {JSON.stringify(error?.code)}</p>
          <p>
            error response data code:{" "}
            {JSON.stringify(error?.response?.data?.code)}
          </p>
          <p>
            error response data message:{" "}
            {JSON.stringify(error?.response?.data?.message)}
          </p>
        </div>
      )} */}
    </>
  );
}
