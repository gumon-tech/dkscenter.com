import React from 'react';
import Container from './container';
import Breadcrumb from './breadcrumb';
import { useEffect, useState } from 'react';
import { getOrder } from '../utils/getOrder';
import Cookies from 'js-cookie';
import { refreshEmailToken } from '../utils/refreshEmailToken';
import SuccessDetail from './successDetail';
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';

const fetchSuccessDetail = ({ orderId, i18next }) => {
  const { t } = i18next;
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (orderId) {
      const fetchOrder = async () => {
        setIsLoading(true);
        try {
          let accessToken = Cookies.get('accessToken') || '';
          let refreshToken = Cookies.get('refreshToken') || '';
          if (!refreshToken) {
            alert('INVALID_REFRESH_TOKEN');
            router.replace('/');
            throw new Error('INVALID_REFRESH_TOKEN');
          }

          const refreshData = await refreshEmailToken({
            refreshToken: refreshToken,
          });
          accessToken = refreshData.accessToken;
          Cookies.set('accessToken', accessToken, { expires: 7 });

          const response = await getOrder({
            token: accessToken,
            orderId: orderId,
          });
          setOrderData(response.order);
          setIsLoading(false);
          setError(null);
        } catch (error) {
          console.error('Error order:', error);
          setIsLoading(false);
          setError(error);
        }
        setIsLoading(false);
      };
      fetchOrder();
    }
  }, [orderId]);

  if (!orderId) {
    return (
      <Container>
        <Breadcrumb paths={[{ title: 'Training Course', path: '/course' }]} />
        {t('course-detail-1')}
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <Breadcrumb paths={[{ title: 'Training Course', path: '/course' }]} />
        <div className="grid justify-center content-center items-center h-max">
          <ReactLoading
            type="spinningBubbles"
            color={'#049ee8'}
            height={200} // ปรับความสูง
            width={200} // ปรับความกว้าง
          />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Breadcrumb paths={[{ title: 'Training Course', path: '/course' }]} />
      <SuccessDetail i18next={i18next} orderData={orderData} />
    </Container>
  );
};

export default fetchSuccessDetail;
