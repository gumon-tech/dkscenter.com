import React from 'react';
import Container from './container';
import {
  EnvelopeIcon,
  CalendarIcon,
  MapPinIcon,
  TagIcon,
  TicketIcon,
  UsersIcon,
  DocumentTextIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

const SuccessDetail = ({ orderData, i18next }) => {
  const { t } = i18next;

  if (!orderData) return <></>;

  return (
    <Container>
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-semibold mb-6 flex items-center">
          <TicketIcon className="h-8 w-8 text-blue-500 dark:text-blue-400 mr-2" />
          Order #{orderData?.orderId}
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center text-gray-900 dark:text-gray-100">
            <CheckCircleIcon className="h-6 w-6 text-green-500 dark:text-green-400 mr-2" />
            <span>
              Please check your email for further details and updates regarding
              your order.
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Order Status: {orderData?.ticketDetail?.eventName}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 flex items-center">
              <TagIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
              {orderData?.orderStatus}
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center">
              <TagIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
              Total Price: {orderData?.totalPrice} บาท
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center">
              <EnvelopeIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
              Email: {orderData?.userEmail}
            </p>

            <p className="text-gray-700 dark:text-gray-300 flex items-center">
              <TagIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
              Total Unit Price: {orderData?.totalUnitPrice} บาท
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center">
              <CalendarIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
              Purchase Time: {new Date(orderData?.timestamp).toLocaleString()}
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center">
              <TagIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
              Schedule Key: {orderData?.scheduleKey}
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center">
              <TagIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
              Reserve ID: {orderData?.reserveId}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mt-4 mb-2 flex items-center text-gray-900 dark:text-gray-100">
              <UsersIcon className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-2" />
              Attendees
            </h3>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {orderData?.attendees?.map((attendee, index) => (
                <li key={index}>
                  {attendee.firstName} {attendee.lastName} - {attendee.email}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-gray-100">
            <DocumentTextIcon className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-2" />
            Ticket Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 flex items-center">
                <TicketIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                Number of Tickets: {orderData?.ticketAmount}
              </p>
              <p className="text-gray-700 dark:text-gray-300 flex items-center">
                <MapPinIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                Location: {orderData?.ticketDetail?.eventLocation}
              </p>
              <p className="text-gray-700 dark:text-gray-300 flex items-center">
                <CalendarIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                Date: {orderData?.ticketDetail?.eventDate}
              </p>
              <p className="text-gray-700 dark:text-gray-300 flex items-center">
                <CalendarIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                Time: {orderData?.ticketDetail?.eventTime}
              </p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 flex items-center">
                <TagIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                <a
                  target="_blank"
                  className="text-blue-500 dark:text-blue-400 underline"
                  href={orderData?.ticketDetail?.detailLink}
                  rel="noreferrer"
                >
                  Detail Link: Clink to course detail{' '}
                </a>
              </p>
              <p className="text-gray-700 dark:text-gray-300 flex items-center">
                <TagIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                Ticket Type: {orderData?.ticketDetail?.name}
              </p>
              <p className="text-gray-700 dark:text-gray-300 flex items-center">
                <TagIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                Price: {orderData?.ticketDetail?.price} บาท
              </p>
            </div>
          </div>
        </div>

        {orderData?.discountDetail && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-900 dark:text-gray-100">
              <TagIcon className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-2" />
              Discount Details
            </h2>
            <p className="text-gray-700 dark:text-gray-300 flex items-center">
              <TagIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
              Code: {orderData?.discountDetail?.discountCode}
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center">
              <TagIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
              Type: {orderData?.discountDetail?.discountType}
            </p>
            <p className="text-gray-700 dark:text-gray-300 flex items-center">
              <TagIcon className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
              Value: {orderData?.discountDetail?.discountValue}
            </p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default SuccessDetail;
