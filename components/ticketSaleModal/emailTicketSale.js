import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

const API_URL = process.env.API_URL;

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
  setReserveId
}) {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      EmailTicketSale
    </>
  );
}
