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
  setTicketAmount
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
        setTickets(response.data);
        setIsLoading(false);
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        const response = {
          code: "GET_TIEKETS_SUCCESS_AND_DISCOUNTED_PRICE_HAS_ADDED",
          message: "Get tickets success and discounted price has added!",
          courseKey: "2024-007-modern-web-frontend-with-react",
          scheduleKey: "2024-1",
          tickets: [
            {
              quantity: 20,
              eventName:
                "Modern Web Frontend with React (Next.js - App Router - Typescript)",
              available: 10,
              courseKey: "2024-007-modern-web-frontend-with-react",
              eventDate: "25 May 2024 - 26 May 2024",
              salesEnd: "2024-04-01T10:00:00.000Z",
              scheduleKey: "2024-1",
              eventLocation: "BTS Phaya Thai, Bangkok, Thailand",
              order: 1,
              name: "Early Bird",
              eventTime: "09:00 - 17:00",
              detailLink:
                "https://dkscenter.com/th/course/2024-007-modern-web-frontend-with-react",
              ticketId: "11156c00-417f-44b3-b659-95023795e314",
              updatedAt: "2024-04-04T19:49:05.322Z",
              price: 6900,
              salesStart: "2024-03-28T18:05:51.305Z",
              reserved: 4,
              remaining: 6,
              discountedPrice: 6555,
            },
            {
              quantity: 20,
              eventName:
                "Modern Web Frontend with React (Next.js - App Router - Typescript)",
              available: 2,
              courseKey: "2024-007-modern-web-frontend-with-react",
              eventDate: "25 May 2024 - 26 May 2024",
              salesEnd: "2024-05-18T10:00:00.000Z",
              scheduleKey: "2024-1",
              eventLocation: "BTS Phaya Thai, Bangkok, Thailand",
              order: 2,
              name: "Standard",
              eventTime: "09:00 - 17:00",
              detailLink:
                "https://dkscenter.com/th/course/2024-007-modern-web-frontend-with-react",
              ticketId: "6b6e31ac-62b1-4173-8c06-ac934195ec26",
              updatedAt: "2024-04-04T18:57:21.939Z",
              price: 7900,
              salesStart: "2024-04-01T10:00:00.000Z",
              reserved: 0,
              remaining: 2,
              discountedPrice: 7505,
            },
            {
              quantity: 20,
              eventName:
                "Modern Web Frontend with React (Next.js - App Router - Typescript)",
              available: 16,
              courseKey: "2024-007-modern-web-frontend-with-react",
              eventDate: "25 May 2024 - 26 May 2024",
              salesEnd: "2024-05-24T10:00:00.000Z",
              scheduleKey: "2024-1",
              eventLocation: "BTS Phaya Thai, Bangkok, Thailand",
              order: 3,
              name: "Special",
              eventTime: "09:00 - 17:00",
              detailLink:
                "https://dkscenter.com/th/course/2024-007-modern-web-frontend-with-react",
              ticketId: "9407e262-19ba-4059-92af-3079461770cf",
              updatedAt: "2024-04-04T20:04:57.811Z",
              price: 10000,
              salesStart: "2024-04-01T10:00:00.000Z",
              reserved: 4,
              remaining: 12,
              discountedPrice: 9500,
            },
          ],
          discountDetail: {
            isActive: true,
            note: "test",
            discountCode: "ADS999",
            courseKey: "2024-007-modern-web-frontend-with-react",
            discountValue: 5,
            discountCodeId: "65182e58-85f0-44ca-9c28-c31797152824",
            discountType: "PERCENTAGE",
            tag: "test",
          },
        };

        setTickets(response.tickets || []);
        setDiscountDetail(response.discountDetail || null);
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []); // เพื่อให้เรียก API ในครั้งเดียวเมื่อ component ถูก render เท่านั้น

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
      <TicketSales tickets={tickets} discountDetail={discountDetail}/>
    </>
  );
}
