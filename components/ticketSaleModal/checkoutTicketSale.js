import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Countdown from 'react-countdown';
import { ticketsCheckout } from '../../utils/ticketsCheckout';
import { useRouter } from 'next/router';
import { refreshEmailToken } from '../../utils/refreshEmailToken';

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
  const { t, i18n } = i18next;
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initContacts = [];
  for (let i = 0; i < ticketAmount; i++) {
    initContacts.push({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
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
    setIsLoading(true);
    setError(null);
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
        setError(null);

        const paymentUrl = response.paymentUrl;
        router.replace(paymentUrl);
      } catch (error) {
        console.error('Error ticketsReserve :', error);
        setError(error);
        setIsLoading(false);
        // alert(error?.response?.data?.message);

        // ทำการจัดการข้อผิดพลาดตามที่คุณต้องการ
      }
    } catch (error) {
      console.error('Error refreshEmailToken :', error);
      setError(error);
      // alert(error?.response?.data?.message);
    }
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <div className="grid justify-center content-center items-center h-max">
        <ReactLoading
          type="spinningBubbles"
          color={'#049ee8'}
          height={200} // ปรับความสูง
          width={200} // ปรับความกว้าง
        />
      </div>
    );

  return (
    <>
      {error && (
        <div className="error text-red-500">
          {error?.response?.data?.errors &&
            error?.response?.data?.errors.map((error, index) => (
              <div key={'error_' + index}>
                <p>
                  {error.value} : {error.msg}
                </p>
              </div>
            ))}
          <br />
        </div>
      )}
      <div className="pb-8">
        <p className="text-left text-gray-600 mb-2  text-gray-200">
          {t('ticket-checkout-expire')}: <Countdown date={reserveExpire} />
        </p>
        <form onSubmit={handleSubmit}>
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded p-4 mb-8 border border-gray-200 dark:bg-gray-700 dark:border-gray-700"
            >
              <h2 className="text-lg font-semibold mb-2">
                {t('ticket-checkout-contact')} {index + 1}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t('ticket-checkout-first-name')}
                  id={`firstName_${index}`}
                  name={`firstName_${index}`}
                  value={contacts[index]?.firstName || ''}
                  onChange={(event) => handleInputFirstName(index, event)}
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 mb-4 md:mb-0 dark:border-gray-700"
                  required
                />
                <input
                  type="text"
                  placeholder={t('ticket-checkout-last-name')}
                  id={`lastName_${index}`}
                  name={`lastName_${index}`}
                  value={contacts[index]?.lastName || ''}
                  onChange={(event) => handleInputLastName(index, event)}
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 mb-4 md:mb-0"
                  required
                />
                <input
                  type="email"
                  placeholder={t('ticket-checkout-email')}
                  id={`email_${index}`}
                  name={`email_${index}`}
                  value={contacts[index]?.email || ''}
                  onChange={(event) => handleInputEmail(index, event)}
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 mb-4 md:mb-0"
                  required
                />
                <input
                  type="tel"
                  placeholder={t('ticket-checkout-phone-number')}
                  id={`phoneNumber_${index}`}
                  name={`phoneNumber_${index}`}
                  value={contacts[index]?.phoneNumber || ''}
                  onChange={(event) => handleInputPhoneNumber(index, event)}
                  className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 mb-4 md:mb-0"
                  required
                  maxLength={10}
                />
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full transition duration-300 ease-in-out"
          >
            {t('ticket-checkout-submit')}
          </button>
        </form>
      </div>
    </>
  );
}
