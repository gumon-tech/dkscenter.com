import React, { useState, useEffect } from 'react';
import Button from './ui/button';
import Badge from './ui/badge';
import Card from './ui/card';
import Input from './ui/input';
import Divider from './ui/divider';

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString('th-TH', {
    style: 'currency',
    currency: 'THB',
  });

const TicketCard = ({
  i18next,
  ticket,
  onQuantityChange,
  discountDetail,
  cartItems,
}) => {
  const { t } = i18next;
  const salesStartTime = new Date(ticket.salesStart);
  const currentTime = new Date();
  const salesEndTime = new Date(ticket.salesEnd);

  const [quantity, setQuantity] = useState(0);

  let timeSaleType = 'isBeforeSales';
  if (currentTime < salesStartTime) {
    timeSaleType = 'isBeforeSales';
  }
  if (salesStartTime <= currentTime && currentTime <= salesEndTime) {
    timeSaleType = 'isInSales';
  }
  if (salesEndTime < currentTime) {
    timeSaleType = 'isAfterSales';
  }

  let availableText =
    t('ticket-card-available') + ':' + (ticket.remaining || 0);
  if (timeSaleType === 'isAfterSales') availableText = ' ';

  let availableFromText = '';
  if (timeSaleType === 'isBeforeSales') {
    const localizedTime = salesStartTime.toLocaleDateString('th-TH', {
      dateStyle: 'medium',
    });
    availableFromText = t('ticket-card-available-until') + ': ' + localizedTime;
  }
  if (timeSaleType === 'isInSales') {
    const localizedTime = salesEndTime.toLocaleDateString('th-TH', {
      dateStyle: 'medium',
    });
    availableFromText = t('ticket-card-available-on') + ': ' + localizedTime;
  }
  if (timeSaleType === 'isAfterSales') {
    availableFromText = '';
  }

  useEffect(() => {
    // ตรวจสอบว่า ticketId ของการ์ดปัจจุบันมีอยู่ในตะกร้าหรือไม่
    const isInCart = cartItems.some(
      (item) => item.ticketId === ticket.ticketId,
    );
    // ถ้า ticketId ของการ์ดปัจจุบันไม่อยู่ในตะกร้า ให้กำหนดจำนวนเป็น 0
    if (!isInCart) {
      setQuantity(0);
    }
  }, [cartItems, ticket.ticketId]); // ทำการเรียกใช้ effect เมื่อ cartItems หรือ ticketId ของการ์ดปัจจุบันเปลี่ยนแปลง

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

  return (
    <Card className="mb-4 p-5">
      <div className="flex flex-wrap items-start gap-4">
        <div className="mr-auto">
          <h3 className="text-xl font-semibold tracking-[-0.03em] text-text">
            {ticket.name}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {timeSaleType === 'isBeforeSales' && (
              <Badge variant="warning">{t('ticket-card-available-until')}</Badge>
            )}
            {timeSaleType === 'isInSales' && (
              <Badge variant="success">{t('ticket-card-available')}</Badge>
            )}
            {timeSaleType === 'isAfterSales' && (
              <Badge variant="danger">{t('ticket-card-sold-out')}</Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {ticket.discountedPrice || ticket.discountedPrice === 0 ? (
            <p className="mr-1 text-sm text-soft line-through">
              {formatCurrency(ticket.price)}
            </p>
          ) : (
            <p className="text-lg font-semibold text-text">
              {formatCurrency(ticket.price)}
            </p>
          )}
          {(ticket.discountedPrice || ticket.discountedPrice === 0) && (
            <p className="text-lg font-semibold text-primary">
              {formatCurrency(ticket.discountedPrice)}
            </p>
          )}
          {timeSaleType === 'isBeforeSales' && <></>}
          {timeSaleType === 'isInSales' && (
            <div className="ml-2 inline-flex items-center gap-3 rounded-full border border-border/80 bg-surface px-2 py-2">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-surface-elevated text-text"
                onClick={handleDecrease}
              >
                -
              </button>
              <span className="min-w-[1.5rem] text-center font-semibold text-text">
                {quantity}
              </span>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white"
                onClick={handleIncrease}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm leading-7 text-muted">
        <p>{availableText}</p>
        <p>{availableFromText}</p>
        {discountDetail?.discountCode && (
          <p className="text-primary">
            {t('ticket-card-discount-on')}: {discountDetail.discountCode}
          </p>
        )}
      </div>
    </Card>
  );
};

const CartDetails = ({
  i18next,
  cartItems,
  setDiscountCode,
  discountDetail,
  setTicketId,
  setTicketAmount,
  setManageState,
}) => {
  const { t } = i18next;

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
      if (item.discountedPrice || item.discountedPrice === 0) {
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
    <Card className="p-5">
      <h2 className="text-lg font-semibold tracking-[-0.03em] text-text">
        {t('ticket-cart-cart-details')}
      </h2>
      <div className="mt-4 space-y-3">
        {cartItems.map((item) => (
          <div key={item.ticketId} className="rounded-2xl border border-border/70 bg-surface px-4 py-4">
            <p className="font-medium text-text">{item.name}</p>
            <p className="mt-1 text-sm text-muted">
              {formatCurrency(item.price)} x {item.quantity}
            </p>
          </div>
        ))}
      </div>
      <Divider className="my-5" />
      <div className="space-y-2 text-sm leading-7 text-muted">
        <p>
          {t('ticket-cart-subtotal')} : {formatCurrency(calculateSubtotal())}
        </p>
        <p>
          {t('ticket-cart-discount')} : {formatCurrency(calculateDiscount())}
        </p>
      </div>
      <Divider className="my-5" />
      <p className="text-base font-semibold text-text">
        {t('ticket-cart-total')} : {formatCurrency(calculateTotal())}
      </p>
      <Button
        className={`mt-5 w-full ${isCartEmpty ? 'pointer-events-none opacity-50' : ''}`}
        onClick={checkoutCart}
        disabled={isCartEmpty}
      >
        {t('ticket-cart-checkout')}
      </Button>
    </Card>
  );
};

const TicketSales = ({
  i18next,
  tickets,
  discountCode,
  setDiscountCode,
  ticketId: _ticketId,
  setTicketId,
  ticketAmount: _ticketAmount,
  setTicketAmount,
  discountDetail,
  setManageState,
}) => {
  const { t } = i18next;
  const [cartItems, setCartItems] = useState([]);
  const [temDiscountCode, setTemDiscountCode] = useState(discountCode);

  const handleQuantityChange = (ticketId, newQuantity, ticketObj = {}) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.ticketId === ticketId,
    );
    if (existingItemIndex !== -1) {
      let updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity = newQuantity;
      if (newQuantity === 0) {
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
    setDiscountCode(temDiscountCode);
  };

  return (
    <div className="mx-auto mt-2 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div>
        {tickets.map((ticket) => (
          <TicketCard
            i18next={i18next}
            key={ticket.ticketId}
            ticket={ticket}
            onQuantityChange={handleQuantityChange}
            discountDetail={discountDetail}
            cartItems={cartItems}
          />
        ))}
      </div>
      <div className="space-y-4">
        <Card className="p-5">
          <h3 className="text-base font-semibold text-text">
            {t('ticket-sales-discount-code')}
          </h3>
          <div className="mt-4 flex items-end gap-3">
            <Input
              type="text"
              name="discountCode"
              id="discountCode"
              placeholder={t('ticket-sales-discount-code')}
              value={temDiscountCode}
              onChange={handleDiscountCodeChange}
              className="flex-1"
            />
            <Button variant="secondary" onClick={applyDiscountCode}>
              {t('ticket-sales-apply')}
            </Button>
          </div>
        </Card>

        <CartDetails
          i18next={i18next}
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
