import { useRouter } from "next/router";
import { useState } from "react";
import FetchTicketSale from "./fetchTicketSale";
import EmailTicketSale from "./emailTicketSale";
import CheckoutTicketSale from "./checkoutTicketSale";

export default function TicketSaleModalManage({
  i18next,
  courseKey,
  scheduleKey,
  discountCodeURL,
}) {
  const router = useRouter();
  const { t, i18n } = i18next;
  // console.log("courseKey", courseKey);
  // console.log("scheduleKey", scheduleKey);
  // console.log("discountCodeURL", discountCodeURL);

  if (!courseKey) return null;
  if (!scheduleKey) return null;

  const [manageState, setManageState] = useState(0);
  const [discountCode, setDiscountCode] = useState(discountCodeURL || "");
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [ticketId, setTicketId] = useState(null);
  const [ticketAmount, setTicketAmount] = useState(null);
  const [reserveId, setReserveId] = useState(null);
  const [reserveExpire, setReserveExpire] = useState(new Date());

  // 0 = หน้าแสดงบัตรทั้งหมด
  // 1 = หน้ายืนยัน email
  // 2 = หน้ากรกข้อมูลการซื้อบัตร

  if (manageState === 0) {
    return (
      <div>
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
      <div>
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
      <div>
        
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
