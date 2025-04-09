import { trackEvent } from '@utils/analytics';

describe('trackEvent', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    // Mock console.log before each test
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocks after each test
  });

  it('should log the event and payload', () => {
    const event = 'signup_button_click';
    const payload = { page: 'signup' };

    // Call the trackEvent function
    trackEvent(event, payload);

    // Check if console.log was called with the correct parameters
    expect(logSpy).toHaveBeenCalledWith('[Tracking Event]', event, payload);
  });

  it('should log the event with different payload', () => {
    const event = 'login_button_click';
    const payload = { page: 'login' };

    // Call the trackEvent function
    trackEvent(event, payload);

    // Check if console.log was called with the correct parameters
    expect(logSpy).toHaveBeenCalledWith('[Tracking Event]', event, payload);
  });
});
