import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import Countdown from "react-countdown";
import { ticketsCheckout } from "../../utils/ticketsCheckout";
import { useRouter } from "next/router";
import { refreshEmailToken } from "../../utils/refreshEmailToken";

const API_URL = process.env.API_URL;

export default function CheckoutTicketSale({
  i18next,
  accessToken,
  setAccessToken,
  refreshToken,
  setRefreshToken,
  ticketAmount,
  reserveId,
  reserveExpire,
  setManageState,
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const initContacts = [];
  for (let i = 0; i < ticketAmount; i++) {
    initContacts.push({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    });
  }

  const [contacts, setContacts] = useState(initContacts);

  const handleInputFirstName = (index, event) => {
    const { value } = event.target;
    const list = [...contacts];
    list[index].firstName = value;
    setContacts(list);
  };
  const handleInputLastName = (index, event) => {
    const { value } = event.target;
    const list = [...contacts];
    list[index].lastName = value;
    setContacts(list);
  };

  const handleInputEmail = (index, event) => {
    const { value } = event.target;
    const list = [...contacts];
    list[index].email = value;
    setContacts(list);
  };

  const handleInputPhoneNumber = (index, event) => {
    const { value } = event.target;
    const list = [...contacts];
    list[index].phoneNumber = value;
    setContacts(list);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(contacts);
    // ส่งข้อมูลติดต่อไปยังเซิร์ฟเวอร์หรือทำการประมวลผลต่อไป

    setIsLoading(true);

    try {
      const response = await refreshEmailToken({
        refreshToken: refreshToken,
      });
      const newAccessToken = response.accessToken;
      setAccessToken(newAccessToken);

      try {
        const response = await ticketsCheckout({
          token: newAccessToken,
          reserveId: reserveId,
          attendees: contacts,
        });

        console.log("ticketsCheckout data", response);
        const paymentUrl = response.paymentUrl;
        router.replace(paymentUrl);
      } catch (error) {
        console.error("Error ticketsReserve :", error);
        // ทำการจัดการข้อผิดพลาดตามที่คุณต้องการ
      }
    } catch (error) {
      console.error("Error refreshEmailToken :", error);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ReactLoading
          type="spinningBubbles"
          color={"#049ee8"}
          height={100} // ปรับความสูง
          width={100} // ปรับความกว้าง
        />
      </div>
    );

  return (
    <div className="p-8">
      <p className="text-left text-gray-600 mb-2">
        ReserveId: {reserveId}
        <br />
        Expire At: <Countdown date={reserveExpire} />
      </p>
      <form onSubmit={handleSubmit}>
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded p-4 mb-8 border border-gray-200"
          >
            <h2 className="text-lg font-semibold mb-2">Contact {index + 1}</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                id={`firstName_${index}`}
                name={`firstName_${index}`}
                value={contacts[index]?.firstName || ""}
                onChange={(event) => handleInputFirstName(index, event)}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                id={`lastName_${index}`}
                name={`lastName_${index}`}
                value={contacts[index]?.lastName || ""}
                onChange={(event) => handleInputLastName(index, event)}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                id={`email_${index}`}
                name={`email_${index}`}
                value={contacts[index]?.email || ""}
                onChange={(event) => handleInputEmail(index, event)}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                id={`phoneNumber_${index}`}
                name={`phoneNumber_${index}`}
                value={contacts[index]?.phoneNumber || ""}
                onChange={(event) => handleInputPhoneNumber(index, event)}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
