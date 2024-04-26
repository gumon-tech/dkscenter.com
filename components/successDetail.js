import Container from "./container";

const SuccessDetail = ({ orderData, i18next }) => {
  const { t } = i18next;

  if(!orderData) return <></>

  return (
    <Container>
      <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Order #{orderData?.orderId}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">สถานะ: {orderData?.orderStatus}</h2>
          <p>ราคารวม: {orderData?.totalPrice} บาท</p>
          <p>อีเมล: {orderData?.userEmail}</p>
          <p>Course Key: {orderData?.courseKey}</p>
          <p>Total Unit Price: {orderData?.totalUnitPrice} บาท</p>
          <p>เวลาที่ซื้อ: {new Date(orderData?.timestamp).toLocaleString()}</p>
          <p>Schedule Key: {orderData?.scheduleKey}</p>
          <p>Reserve ID: {orderData?.reserveId}</p>
          <p>Expire At: {new Date(orderData?.expireAt).toLocaleString()}</p>
          <h3>Attendees:</h3>
          <ul>
            {orderData?.attendees?.map((attendee, index) => (
              <li key={index}>
                {attendee.firstName} {attendee.lastName} - {attendee.email}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">รายละเอียดบัตร</h2>
          <p>จำนวนบัตร: {orderData?.ticketAmount}</p>
          <p>Event Name: {orderData?.ticketDetail?.eventName}</p>
          <p>Event Location: {orderData?.ticketDetail?.eventLocation}</p>
          <p>Event Date: {orderData?.ticketDetail?.eventDate}</p>
          <p>Event Time: {orderData?.ticketDetail?.eventTime}</p>
          <p>Detail Link: <a className="text-blue-500" href={orderData?.ticketDetail?.detailLink}>{orderData?.ticketDetail?.detailLink}</a></p>
          <p>Ticket Type: {orderData?.ticketDetail?.name}</p>
          <p>Ticket Price: {orderData?.ticketDetail?.price} บาท</p>
          <br/>

          {/* เพิ่มข้อมูล discountDetail ตามต้องการ */}
          {orderData?.discountDetail && (
            <div>
              <h2 className="text-xl font-semibold mb-2">รายละเอียดส่วนลด</h2>
              <p>Discount Code: {orderData?.discountDetail?.discountCode}</p>
              <p>Discount Type: {orderData?.discountDetail?.discountType}</p>
              <p>Discount Value: {orderData?.discountDetail?.discountValue}</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </Container>
  );
};

export default SuccessDetail;
