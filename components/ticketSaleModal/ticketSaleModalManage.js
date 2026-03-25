import React from 'react';
import { useState } from 'react';
import FetchTicketSale from './fetchTicketSale';
import EmailTicketSale from './emailTicketSale';
import CheckoutTicketSale from './checkoutTicketSale';
import Badge from '../ui/badge';

export default function TicketSaleModalManage({
  i18next,
  courseKey,
  scheduleKey,
  discountCodeURL,
}) {
  const locale = i18next?.i18n?.language || 'th';
  const [manageState, setManageState] = useState(0);
  const [discountCode, setDiscountCode] = useState(discountCodeURL || '');
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [ticketId, setTicketId] = useState(null);
  const [ticketAmount, setTicketAmount] = useState(null);
  const [reserveId, setReserveId] = useState(null);
  const [reserveExpire, setReserveExpire] = useState(new Date());

  if (!courseKey || !scheduleKey) return null;

  // 0 = หน้าแสดงบัตรทั้งหมด
  // 1 = หน้ายืนยัน email
  // 2 = หน้ากรกข้อมูลการซื้อบัตร

  if (manageState === 0) {
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{locale === 'th' ? '1. เลือกบัตร' : '1. Select tickets'}</Badge>
          <Badge variant="neutral">
            {locale === 'th' ? '2. ยืนยันอีเมล' : '2. Verify email'}
          </Badge>
          <Badge variant="neutral">
            {locale === 'th' ? '3. กรอกข้อมูล' : '3. Checkout details'}
          </Badge>
        </div>
        <FetchTicketSale
          i18next={i18next}
          courseKey={courseKey}
          scheduleKey={scheduleKey}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          ticketId={ticketId}
          setTicketId={setTicketId}
          ticketAmount={ticketAmount}
          setTicketAmount={setTicketAmount}
          setManageState={setManageState}
        />
      </div>
    );
  }

  if (manageState === 1) {
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="neutral">
            {locale === 'th' ? '1. เลือกบัตร' : '1. Select tickets'}
          </Badge>
          <Badge>{locale === 'th' ? '2. ยืนยันอีเมล' : '2. Verify email'}</Badge>
          <Badge variant="neutral">
            {locale === 'th' ? '3. กรอกข้อมูล' : '3. Checkout details'}
          </Badge>
        </div>
        <EmailTicketSale
          i18next={i18next}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          refreshToken={refreshToken}
          setRefreshToken={setRefreshToken}
          discountCode={discountCode}
          ticketId={ticketId}
          ticketAmount={ticketAmount}
          reserveId={reserveId}
          setReserveId={setReserveId}
          reserveExpire={reserveExpire}
          setReserveExpire={setReserveExpire}
          setManageState={setManageState}
        />
      </div>
    );
  }

  if (manageState === 2) {
    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="neutral">
            {locale === 'th' ? '1. เลือกบัตร' : '1. Select tickets'}
          </Badge>
          <Badge variant="neutral">
            {locale === 'th' ? '2. ยืนยันอีเมล' : '2. Verify email'}
          </Badge>
          <Badge>{locale === 'th' ? '3. กรอกข้อมูล' : '3. Checkout details'}</Badge>
        </div>
        <CheckoutTicketSale
          i18next={i18next}
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          refreshToken={refreshToken}
          setRefreshToken={setRefreshToken}
          ticketAmount={ticketAmount}
          reserveId={reserveId}
          reserveExpire={reserveExpire}
          setManageState={setManageState}
        />
      </div>
    );
  }

  return <></>;
}
