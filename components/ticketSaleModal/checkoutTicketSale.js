import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import Countdown from 'react-countdown';
import { ticketsCheckout } from '../../utils/ticketsCheckout';
import { useRouter } from 'next/router';
import { refreshEmailToken } from '../../utils/refreshEmailToken';
import Card from '../ui/card';
import Input from '../ui/input';
import Button from '../ui/button';
import Badge from '../ui/badge';

export default function CheckoutTicketSale({
  i18next,
  accessToken: _accessToken,
  setAccessToken,
  refreshToken,
  setRefreshToken: _setRefreshToken,
  ticketAmount,
  reserveId,
  reserveExpire,
  setManageState: _setManageState,
}) {
  const { t } = i18next;
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
      {error && (
        <div className="mb-5 rounded-2xl border border-danger/20 bg-danger/10 px-4 py-4 text-sm text-danger">
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
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <Badge>{t('ticket-checkout-expire')}: <Countdown date={reserveExpire} /></Badge>
        </div>
        <p className="mb-5 text-sm leading-7 text-muted">
          {t('ticket-checkout-expire')}: <Countdown date={reserveExpire} />
        </p>
        <form onSubmit={handleSubmit}>
          {contacts.map((contact, index) => (
            <Card key={index} className="mb-6 p-5">
              <h2 className="mb-4 text-lg font-semibold tracking-[-0.03em] text-text">
                {t('ticket-checkout-contact')} {index + 1}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  id={`firstName_${index}`}
                  name={`firstName_${index}`}
                  label={t('ticket-checkout-first-name')}
                  placeholder={t('ticket-checkout-first-name')}
                  value={contacts[index]?.firstName || ''}
                  onChange={(event) => handleInputFirstName(index, event)}
                  required
                />
                <Input
                  type="text"
                  id={`lastName_${index}`}
                  name={`lastName_${index}`}
                  label={t('ticket-checkout-last-name')}
                  placeholder={t('ticket-checkout-last-name')}
                  value={contacts[index]?.lastName || ''}
                  onChange={(event) => handleInputLastName(index, event)}
                  required
                />
                <Input
                  type="email"
                  id={`email_${index}`}
                  name={`email_${index}`}
                  label={t('ticket-checkout-email')}
                  placeholder={t('ticket-checkout-email')}
                  value={contacts[index]?.email || ''}
                  onChange={(event) => handleInputEmail(index, event)}
                  required
                />
                <Input
                  type="tel"
                  id={`phoneNumber_${index}`}
                  name={`phoneNumber_${index}`}
                  label={t('ticket-checkout-phone-number')}
                  placeholder={t('ticket-checkout-phone-number')}
                  value={contacts[index]?.phoneNumber || ''}
                  onChange={(event) => handleInputPhoneNumber(index, event)}
                  required
                  maxLength={10}
                />
              </div>
            </Card>
          ))}
          <Button type="submit" className="w-full">
            {t('ticket-checkout-submit')}
          </Button>
        </form>
      </div>
    </>
  );
}
