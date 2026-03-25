/* eslint-disable react/prop-types */
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
import Card from './ui/card';
import Heading from './ui/heading';
import Button from './ui/button';
import Link from './link';

const FetchSuccessDetail = ({ orderId, i18next, mode = 'success' }) => {
  const { t } = i18next;
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorCode, setErrorCode] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (orderId) {
      const fetchOrder = async () => {
        setIsLoading(true);
        try {
          let accessToken = Cookies.get('accessToken') || '';
          let refreshToken = Cookies.get('refreshToken') || '';
          if (!refreshToken) {
            setErrorCode('INVALID_REFRESH_TOKEN');
            setIsLoading(false);
            return;
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
        } catch (error) {
          console.error('Error order:', error);
          setErrorCode(error?.response?.data?.code || 'ORDER_FETCH_FAILED');
          setIsLoading(false);
        }
        setIsLoading(false);
      };
      fetchOrder();
    }
  }, [orderId, router]);

  if (!orderId) {
    return (
      <Container>
        <Breadcrumb paths={[{ title: 'Training Course', path: '/course' }]} />
        <Card className="mt-6 p-6 sm:p-8">
          <Heading
            title={t('order-status-missing-title')}
            description={t('order-status-missing-description')}
          />
        </Card>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <Breadcrumb paths={[{ title: 'Training Course', path: '/course' }]} />
        <div className="grid h-[320px] items-center justify-center">
          <ReactLoading
            type="spinningBubbles"
            color={'#2458ff'}
            height={120}
            width={120}
          />
        </div>
      </Container>
    );
  }

  if (errorCode || !orderData) {
    return (
      <Container className="pb-section">
        <Breadcrumb paths={[{ title: 'Training Course', path: '/course' }]} />
        <Card className="mt-6 p-6 sm:p-8">
          <Heading
            eyebrow={mode === 'cancel' ? t('order-cancel-badge') : t('order-success-badge')}
            title={t('order-status-error-title')}
            description={t('order-status-error-description')}
          />
          <div className="mt-6 flex flex-wrap gap-3">
            <Button as={Link} href="/about-us">
              {t('nav-about-us')}
            </Button>
            <Button as={Link} href="/course" variant="secondary">
              {t('nav-course')}
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Breadcrumb paths={[{ title: 'Training Course', path: '/course' }]} />
      <SuccessDetail i18next={i18next} orderData={orderData} mode={mode} />
    </Container>
  );
};

export default FetchSuccessDetail;
