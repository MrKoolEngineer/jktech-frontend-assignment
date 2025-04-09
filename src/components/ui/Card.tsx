'use client';

import React from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className = '' }: CardProps) => (
  <div className={`rounded-2xl bg-white p-6 shadow-md ${className}`}>{children}</div>
);

export default Card;
