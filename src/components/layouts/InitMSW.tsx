'use client';

import { useEffect } from 'react';

export default function InitMSW() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      import('@mocks/browser').then(({ worker }) => worker.start());
    }
  }, []);

  return null;
}
