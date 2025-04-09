'use client';

import React from 'react';

type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => (
  <h1 className="mb-4 text-center text-2xl font-semibold">{title}</h1>
);

export default PageTitle;
