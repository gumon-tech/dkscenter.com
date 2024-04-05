import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import TicketSales from "../TicketSales";

const API_URL = process.env.API_URL;

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
  setManageState
}) {
  if (!courseKey) return null;
  if (!scheduleKey) return null;

  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [discountDetail, setDiscountDetail] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/tickets/courses/${courseKey}/schedules/${scheduleKey}`,
          {
            params: {
              discount_code: discountCode,
            },
          }
        );
        setTickets(response.data.tickets || []);
        setDiscountDetail(response.data.discountDetail || null);
        setIsLoading(false);
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setIsLoading(false);
      }
    };
    // setIsLoading(true);

    fetchTickets();
  }, [discountCode]); // เพื่อให้เรียก API ในครั้งเดียวเมื่อ component ถูก render เท่านั้น

  if (isLoading)
    return (
      <ReactLoading
        type="spinningBubbles"
        color={"#049ee8"}
        height={"50%"}
        width={"50%"}
      />
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
    </>
  );
}
