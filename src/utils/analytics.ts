type TrackEventPayload = {
  page: string;
};

export const trackEvent = (event: string, payload: TrackEventPayload) => {
  console.log('[Tracking Event]', event, payload); // replace with actual send logic
};
