/* eslint-disable react/prop-types */
import React from 'react';
import PageContainer from './ui/page-container';

const Container = ({ className, children }) => {
  return <PageContainer className={className}>{children}</PageContainer>;
};

export default Container;
