export const trackEvent = (event: string, payload: any) => {
  if (process.env.NODE_ENV === 'production') {
    console.log('[Tracking Event]', event, payload); // replace with actual send logic
  }
};
