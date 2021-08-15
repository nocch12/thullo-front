import Error from 'next/error';
import React from 'react';

const notFound = () => {
  return <Error statusCode={404} title="ページが見つかりません" />;
};

export default notFound;
