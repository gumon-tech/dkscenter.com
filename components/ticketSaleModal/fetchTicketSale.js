import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import TicketSales from '../TicketSales';
import { getTickets } from '../../utils/getTickets';
import { useRouter } from 'next/router';

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
  const [isLoading, setIsLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [discountDetail, setDiscountDetail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!courseKey || !scheduleKey) {
      setIsLoading(false);
      return;
    }

    const fetchTickets = async () => {
      setIsLoading(true);
      try {
        const response = await getTickets({
          courseKey,
          scheduleKey,
          discountCode,
        });
        setTickets(response.tickets || []);
        setDiscountDetail(response.discountDetail || null);

        const { pathname, query } = router;
        const queryParams = { ...query, code: discountCode };
        router.push({ pathname, query: queryParams });
      } catch (error) {
        console.error('Error getTickets:', error);
        setDiscountDetail(null);
        setTickets([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTickets();
  }, [courseKey, discountCode, router, scheduleKey]);

  if (!courseKey || !scheduleKey) return null;

  if (isLoading)
    return (
      <div className="grid h-[320px] items-center justify-center">
        <ReactLoading
          type="spinningBubbles"
          color={'#2458ff'}
          height={120}
          width={120}
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
    </>
  );
}
