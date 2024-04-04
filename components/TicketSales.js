import React, { useState } from "react";
import dayjs from "dayjs";

const TicketCard = ({ ticket, onQuantityChange }) => {
  const salesStartTime = new Date(ticket.salesStart);
  const currentTime = new Date();
  const salesEndTime = new Date(ticket.salesEnd);

  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => {
    if (quantity < ticket.available - ticket.reserved) {
      setQuantity(quantity + 1);
      onQuantityChange(ticket.ticketId, quantity + 1, ticket);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      onQuantityChange(ticket.ticketId, quantity - 1, ticket);
    }
  };

  const localizedSalesStart = salesStartTime.toLocaleDateString("th-TH", {
    dateStyle: "medium",
  });

  let timeSaleType = "isBeforeSales";
  if (currentTime < salesStartTime) {
    timeSaleType = "isBeforeSales";
  }
  if (salesStartTime <= currentTime && currentTime <= salesEndTime) {
    timeSaleType = "isInSales";
  }
  if (salesEndTime < currentTime) {
    timeSaleType = "isAfterSales";
  }

  return (
    <div className="border border-gray-300 rounded p-4 mb-4 relative">
      <h3 className="text-xl font-semibold mb-2">{ticket.name}</h3>
      <div className="absolute top-4 right-4 flex items-center">
        <p className="text-lg text-gray-800 mb-2 mx-4">
          {ticket.price.toLocaleString("th-TH", {
            style: "currency",
            currency: "THB",
          })}
        </p>
        {timeSaleType == "isBeforeSales" && <></>}
        {timeSaleType == "isInSales" && (
          <>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={handleDecrease}
            >
              -
            </button>
            <span className="mx-2">{quantity}</span>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded"
              onClick={handleIncrease}
            >
              +
            </button>
          </>
        )}
        {timeSaleType == "isAfterSales" && (
          <span class="text-red sold-out-text">ขายหมดแล้ว</span>
        )}
      </div>
      <p>Available: {ticket.remaining || ticket.available || 0}</p>
      <p>Available from: {localizedSalesStart}</p>
      {ticket.discountCode && <p>Discount from: {ticket.discountCode}</p>}
    </div>
  );
};

const CartDetails = ({ cartItems }) => {
  const calculateSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * item.quantity;
    });
    return subtotal;
  };

  const calculateDiscount = () => {
    let discount = 0;
    cartItems.forEach((item) => {
      if (item.discountCode) {
        discount += (item.originalPrice - item.price) * item.quantity;
      }
    });
    return discount;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  return (
    <div className="border border-gray-300 rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Cart Details</h2>
      {cartItems.map((item) => (
        <div key={item.ticketId} className="cart-item mb-2">
          <p>{item.name}</p>
          <p>
            {item.price.toLocaleString("th-TH", {
              style: "currency",
              currency: "THB",
            })}{" "}
            x {item.quantity}{" "}
          </p>
        </div>
      ))}
      <hr />
      <br />
      <p>
        Subtotal x{" "}
        {calculateSubtotal().toLocaleString("th-TH", {
          style: "currency",
          currency: "THB",
        })}
      </p>
      <p>
        Discount x{" "}
        {calculateDiscount().toLocaleString("th-TH", {
          style: "currency",
          currency: "THB",
        })}
      </p>
      <hr />
      <p>
        Total:{" "}
        {calculateTotal().toLocaleString("th-TH", {
          style: "currency",
          currency: "THB",
        })}
      </p>
      <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
        Checkout
      </button>
    </div>
  );
};

const TicketSales = ({ tickets }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleQuantityChange = (ticketId, newQuantity, ticketObj = {}) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.ticketId === ticketId
    );
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity = newQuantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([
        ...cartItems,
        {
          ...ticketObj,
          ticketId: ticketId,
          quantity: newQuantity,
        },
      ]);
    }
  };

  return (
    <div className="container mx-auto flex flex-col md:flex-row">
      <div className="md:w-3/4 mr-4 mb-4 md:mb-0">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.ticketId}
            ticket={ticket}
            onQuantityChange={handleQuantityChange}
          />
        ))}
      </div>
      <div className="md:w-1/4">
        <CartDetails cartItems={cartItems} />
      </div>
    </div>
  );
};

export default TicketSales;
