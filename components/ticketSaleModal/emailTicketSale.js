import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import Countdown from 'react-countdown';
import { sendVerifyEmail } from '../../utils/sendVerifyEmail';
import { verifyEmailToken } from '../../utils/verifyEmailToken';
import { ticketsReserve } from '../../utils/ticketsReserve';
import Card from '../ui/card';
import Input from '../ui/input';
import Button from '../ui/button';
import Badge from '../ui/badge';

export default function EmailTicketSale({
  i18next,
  accessToken: _accessToken,
  setAccessToken,
  refreshToken: _refreshToken,
  setRefreshToken,
  discountCode,
  ticketId,
  ticketAmount,
  reserveId: _reserveId,
  setReserveId,
  reserveExpire: _reserveExpire,
  setReserveExpire,
  setManageState,
}) {
  const { t } = i18next;

  const [email, setEmail] = useState('');
  const [ref, setRef] = useState('');
  const [expireAt, setExpireAt] = useState(new Date());
  const [sendVerifyEmailId, setSendVerifyEmailId] = useState('');
  const [otp, setOTP] = useState('');
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
      setShowOTPForm(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending verification email:', error);
      setIsLoading(false);
      setShowOTPForm(false);
      if ('EMAIL_IS_INVALID' === error?.response?.data?.code) {
        alert(t('error-email-is-invalid'));
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

        setReserveId(response.reserveDetail.reserveId);
        setReserveExpire(response.reserveDetail.expireAt);
        setManageState(2);
      } catch (error) {
        console.error('Error ticketsReserve :', error);
        alert(error?.response?.data?.message);
      }
    } catch (error) {
      console.error('Error sending verifyEmailToken :', error);
      if ('EMAIL_REF_OTP_INVALID' === error?.response?.data?.code) {
        alert(t('error-otp-is-invalid'));
      } else {
        alert(error?.response?.data?.message);
      }
    }

    setIsLoading(false);
  };

  const handleResendOTP = async () => {
    // ส่งอีเมลไปยังเซิร์ฟเวอร์เพื่อขอ OTP ใหม่
    setIsLoading(true);
    try {
      const response = await sendVerifyEmail(email); // เพิ่ม await เพื่อรอให้การส่งอีเมล์เสร็จสมบูรณ์ก่อน
      setRef(response.ref);
      setExpireAt(response.expireAt);
      setSendVerifyEmailId(response.id);
    } catch (error) {
      console.error('Error sending verification email:', error);
      if ('EMAIL_REF_OTP_INVALID' === error?.response?.data?.code) {
        alert(t('error-otp-is-invalid'));
      } else {
        alert(error?.response?.data?.message);
      }
      // ทำการจัดการข้อผิดพลาดตามที่คุณต้องการ
    }
    setShowOTPForm(true); // แสดงฟอร์มใส่ OTP หลังยืนยันอีเมล
    setIsLoading(false);
    setOTP('');
  };

  return (
    <>
      <div className="mx-auto">
        {!showOTPForm && (
          <div className="mx-auto mt-4 max-w-xl">
            <Card className="px-6 py-6 sm:px-8 sm:py-8">
              <Badge>{t('ticket-email-email-confirmation')}</Badge>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-text">
                {t('ticket-email-email-confirmation')}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                {t('ticket-email-oto-enter')}
              </p>
              <form onSubmit={handleEmailSubmit}>
                <div className="mt-5">
                  <Input
                    type="email"
                    id="email"
                    label={t('ticket-email-email-address')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="mt-5 w-full">
                  {t('ticket-email-email-confirm-email')}
                </Button>
              </form>
            </Card>
          </div>
        )}

        {showOTPForm && !isLoading && (
          <div className="mx-auto mt-4 max-w-xl">
            <Card className="px-6 py-6 sm:px-8 sm:py-8">
              <Badge>{t('ticket-email-oto-confirmation')}</Badge>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-text">
                {t('ticket-email-oto-confirmation')}
              </h2>
              <p className="mt-3 text-sm leading-7 text-muted">{t('ticket-email-oto-enter')}</p>
              <div className="mt-4 rounded-2xl border border-border/70 bg-surface px-4 py-4 text-sm leading-7 text-muted">
                Email: {email}
                <br />
                {t('ticket-email-oto-ref')}: {ref}
                <br />
                {t('ticket-email-oto-expire')}: <Countdown date={expireAt} />
              </div>
              <form onSubmit={handleOTPSubmit}>
                <div className="mt-5">
                  <Input
                    type="text"
                    id="otp"
                    label="OTP"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="mt-5 mb-2 w-full">
                  {t('ticket-email-oto-confirm')}
                </Button>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm font-medium text-primary hover:text-primary-strong"
                    onClick={handleResendOTP}
                  >
                    {t('ticket-email-oto-resend')}
                  </button>
                </div>
              </form>
            </Card>
          </div>
        )}

        {showOTPForm && isLoading && (
          <div className="mx-auto mt-8 max-w-md">
            <div className="flex justify-center items-center">
              <ReactLoading
                type="spinningBubbles"
                color={'#2458ff'}
                height={120}
                width={120}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
