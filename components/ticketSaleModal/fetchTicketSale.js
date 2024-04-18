import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import TicketSales from "../TicketSales";
import { getTickets } from "../../utils/getTickets";
import { useRouter } from "next/router";

export default function FetchTicketSale({
  i18next,
  courseKey,
  scheduleKey,
  discountCode,
  setDiscountCode,
  ticketId,
  setTicketId,
  ticketAmount,
  setTicketAmount,
  setManageState,
}) {
  if (!courseKey) return null;
  if (!scheduleKey) return null;

  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [discountDetail, setDiscountDetail] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      try {
        const response = await getTickets({
          courseKey: courseKey,
          scheduleKey: scheduleKey,
          discountCode: discountCode,
        });
        setTickets(response.tickets || []);
        setDiscountDetail(response.discountDetail || null);
        setIsLoading(false);
        setError(null);

        const { pathname, query } = router;
        const queryParams = { ...query, code: discountCode };
        router.push({ pathname, query: queryParams });
      } catch (error) {
        console.error("Error getTickets:", error);
        setIsLoading(false);
        setError(error);
      }
      setIsLoading(false);
    };
    fetchTickets();
  }, [discountCode]); // เพื่อให้เรียก API ในครั้งเดียวเมื่อ component ถูก render เท่านั้น

  if (isLoading)
    return (
      <div className="grid justify-center content-center items-center h-max">
        <ReactLoading
          type="spinningBubbles"
          color={"#049ee8"}
          height={200} // ปรับความสูง
          width={200} // ปรับความกว้าง
        />
      </div>
    );

  return (
    <>
      <TicketSales
        i18next={i18next}
        tickets={tickets}
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
        ticketId={ticketId}
        setTicketId={setTicketId}
        ticketAmount={ticketAmount}
        setTicketAmount={setTicketAmount}
        discountDetail={discountDetail}
        setManageState={setManageState}
      />
      {/* {error && false && (
        <div className="error text-red-500">
          <p>error message: {JSON.stringify(error.message)}</p>
          <p>error name: {JSON.stringify(error.name)}</p>
          <p>error code: {JSON.stringify(error.code)}</p>
          <p>error status: {JSON.stringify(error.status)}</p>
          <p>error stack: {JSON.stringify(error.stack)}</p>
          <p>error config: {JSON.stringify(error.config)}</p>
          <p>error response: {JSON.stringify(error.response)}</p>
        </div>
      )} */}
    </>
  );
}
