import Error from 'next/error';
import React from 'react';

const notFound = () => {
  return <Error statusCode={500} title="予期せぬエラーが発生しました" />;
};

export default notFound;
