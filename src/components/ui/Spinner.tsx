'use client';

import React from 'react';

const Spinner = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div
        className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
};

export default Spinner;
