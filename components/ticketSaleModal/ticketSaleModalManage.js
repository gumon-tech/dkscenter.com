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
  const [reserveExpire, setReserveExpire] = useState(null);


  console.log("discountCode", discountCode);

  // 0 = หน้าแสดงบัตรทั้งหมด
  // 1 = หน้ายืนยัน email
  // 2 = หน้ากรกข้อมูลการซื้อบัตร

  if (manageState === 0) {
    return (
      <div>
        หน้าแสดงบัตรทั้งหมด
        <br />
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
        />
        <button
          className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setManageState(1)}
        >
          next
        </button>
      </div>
    );
  }

  if (manageState === 1) {
    return (
      <div>
        หน้ายืนยัน email
        <br />
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
        />
        <button
          className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setManageState(2)}
        >
          next
        </button>
      </div>
    );
  }

  if (manageState === 2) {
    return (
      <div>
        หน้ากรอกข้อมูลการซื้อบัตร
        <br />
        <CheckoutTicketSale
          i18next={i18next}
          accessToken={accessToken}
          ticketAmount={ticketAmount}
          reserveId={reserveId}
          reserveExpire={reserveExpire}
        />
        <button
          className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setManageState(0)}
        >
          next
        </button>
      </div>
    );
  }

  return <></>;
}
