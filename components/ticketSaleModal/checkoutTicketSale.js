import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

const API_URL = process.env.API_URL;

export default function CheckoutTicketSale({
  i18next,
  accessToken,
  ticketAmount,
  reserveId,
  reserveExpire
}) {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      CheckoutTicketSale
    </>
  );
}
