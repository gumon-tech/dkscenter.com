import React, { useState } from 'react';
import dayjs from 'dayjs';

const TicketTable = ({ tickets }) => {
  const [quantities, setQuantities] = useState(tickets.map((ticket) => 0));
  const [promoCode, setPromoCode] = useState('');
  const currentTime = new Date();

  const handleQuantityChange = (index, quantity) => {
    const newQuantities = [...quantities];
    newQuantities[index] = quantity < 0 ? 0 : quantity;
    setQuantities(newQuantities);
  };

  const calculateSubtotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < tickets.length; i++) {
      totalPrice += quantities[i] * tickets[i].price;
    }
    return totalPrice;
  };

  const handlePurchase = () => {
    // ส่งข้อมูลการซื้อไปยัง API นี่
    // เช่น axios.post('/purchase', { quantities, promoCode })
  };

  return (
    <div className="container mx-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Ticket</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={ticket.ticketId}>
              <td className="border border-gray-300 px-4 py-2">
                {ticket.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {ticket.price}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(ticket.salesStart) <= currentTime &&
                currentTime <= new Date(ticket.salesEnd) ? (
                  <>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() =>
                        handleQuantityChange(index, quantities[index] - 1)
                      }
                    >
                      -
                    </button>
                    <span className="px-4">{quantities[index]}</span>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() =>
                        handleQuantityChange(index, quantities[index] + 1)
                      }
                    >
                      +
                    </button>
                  </>
                ) : (
                  <span>Not available</span>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {calculateSubtotal(ticket.price, quantities[index])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <input
          className="border border-gray-300 rounded px-4 py-2"
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter promo code"
        />
      </div>
      <div className="mt-4">Total: {calculateTotalPrice()}</div>
      <div className="mt-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={handlePurchase}
        >
          Purchase
        </button>
      </div>
    </div>
  );
};

export default TicketTable;
