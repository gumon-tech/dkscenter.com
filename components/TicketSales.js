import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

const TicketCard = ({
  ticket,
  onQuantityChange,
  discountDetail,
  cartItems,
}) => {
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

  useEffect(() => {
    // ตรวจสอบว่า ticketId ของการ์ดปัจจุบันมีอยู่ในตะกร้าหรือไม่
    const isInCart = cartItems.some((item) => item.ticketId === ticket.ticketId);
    // ถ้า ticketId ของการ์ดปัจจุบันไม่อยู่ในตะกร้า ให้กำหนดจำนวนเป็น 0
    if (!isInCart) {
      setQuantity(0);
    }
  }, [cartItems, ticket.ticketId]); // ทำการเรียกใช้ effect เมื่อ cartItems หรือ ticketId ของการ์ดปัจจุบันเปลี่ยนแปลง


  return (
    <div className="border border-gray-300 rounded p-4 mb-4 relative">
      <h3 className="text-xl font-semibold mb-2">{ticket.name}</h3>
      <div className="absolute top-4 right-4 flex items-center">
        {ticket.discountedPrice ? (
          <p className="text-gray-500 line-through mr-2">
            {ticket.price.toLocaleString("th-TH", {
              style: "currency",
              currency: "THB",
            })}
          </p>
        ) : (
          <p className="text-lg text-gray-800 mb-2 mx-4">
            {ticket.price.toLocaleString("th-TH", {
              style: "currency",
              currency: "THB",
            })}
          </p>
        )}
        {ticket.discountedPrice && (
          <p className="text-lg text-indigo-600 font-semibold mb-2 mx-4">
            {ticket.discountedPrice.toLocaleString("th-TH", {
              style: "currency",
              currency: "THB",
            })}
          </p>
        )}
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
      {discountDetail?.discountCode && (
        <p>Discount from: {discountDetail.discountCode}</p>
      )}
    </div>
  );
};

const CartDetails = ({
  cartItems,
  setDiscountCode,
  discountDetail,
  setTicketId,
  setTicketAmount,
  setManageState
}) => {
  const isCartEmpty = cartItems.length === 0;


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
      if (item.discountedPrice) {
        discount += (item.price - item.discountedPrice) * item.quantity;
      }
    });
    return discount;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount();
  };

  const checkoutCart = () => {
    setDiscountCode(discountDetail?.discountCode || undefined);
    setTicketId(cartItems[0].ticketId);
    setTicketAmount(cartItems[0].quantity);
    setManageState(1);
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
      <button
        className={`bg-green-500 text-white px-4 py-2 rounded mt-4 ${
          isCartEmpty && "opacity-50 cursor-not-allowed"
        }`}
        onClick={checkoutCart}
        disabled={isCartEmpty}
      >
        Checkout
      </button>
    </div>
  );
};

const TicketSales = ({
  i18next,
  tickets,
  discountCode,
  setDiscountCode,
  ticketId,
  setTicketId,
  ticketAmount,
  setTicketAmount,
  discountDetail,
  setManageState
}) => {
  const [cartItems, setCartItems] = useState([]);
  const [temDiscountCode, setTemDiscountCode] = useState(discountCode);

  const handleQuantityChange = (ticketId, newQuantity, ticketObj = {}) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.ticketId === ticketId
    );
    if (existingItemIndex !== -1) {
      let updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity = newQuantity;
      if(newQuantity === 0){
        updatedCartItems = [];
      }
      setCartItems(updatedCartItems);
    } else {
      setCartItems([
        // ...cartItems,
        {
          ...ticketObj,
          ticketId: ticketId,
          quantity: newQuantity,
        },
      ]);
    }
  };

  const handleDiscountCodeChange = (event) => {
    setTemDiscountCode(event.target.value);
  };

  const applyDiscountCode = () => {
    setDiscountCode(temDiscountCode); // เมื่อยืนยัน discount code เรียบร้อยแล้วให้ล้างค่า discount code ออก
  };

  return (
    <div className="container mx-auto flex flex-col md:flex-row">
      <div className="md:w-3/4 mr-4 mb-4 md:mb-0">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.ticketId}
            ticket={ticket}
            onQuantityChange={handleQuantityChange}
            discountDetail={discountDetail}
            cartItems={cartItems}
          />
        ))}
      </div>
      <div className="md:w-1/4">
        <div className="mb-4 flex items-center">
          <div className="mt-1 relative rounded-md shadow-sm flex-1">
            <input
              type="text"
              name="discountCode"
              id="discountCode"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter discount code"
              value={temDiscountCode}
              onChange={handleDiscountCodeChange}
            />
          </div>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 ml-4"
            onClick={applyDiscountCode}
          >
            Apply
          </button>
        </div>

        <hr />
        <CartDetails
          cartItems={cartItems}
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          discountDetail={discountDetail}
          setTicketId={setTicketId}
          setTicketAmount={setTicketAmount}
          setManageState={setManageState}
        />
      </div>
    </div>
  );
};

export default TicketSales;
