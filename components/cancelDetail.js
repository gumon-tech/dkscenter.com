import React from 'react';
import Container from './container';
import Breadcrumb from './breadcrumb';

const CancelDetail = ({ order, i18next }) => {
  const { t } = i18next;

  if (!order)
    return (
      <Container>
        <Breadcrumb paths={[{ title: 'Training Course', path: '/course' }]} />
        {t('course-detail-1')}
      </Container>
    );

  return (
    <Container>
      <Breadcrumb paths={[{ title: 'Training Course', path: '/course' }]} />
      <h2>order: {order} Cancel!!!!</h2>
    </Container>
  );
};

export default CancelDetail;
