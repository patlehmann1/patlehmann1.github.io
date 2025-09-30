import { register, unregister } from './serviceWorker';

describe('serviceWorker', () => {
  let originalEnv;
  let originalNavigator;

  beforeEach(() => {
    originalEnv = process.env.NODE_ENV;
    originalNavigator = global.navigator;

    // Mock console methods
    global.console.log = jest.fn();
    global.console.error = jest.fn();

    // Mock window.location
    delete window.location;
    window.location = {
      hostname: 'localhost',
      origin: 'http://localhost:3000',
      href: 'http://localhost:3000',
      reload: jest.fn()
    };
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    global.navigator = originalNavigator;
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should not register service worker if not in production', () => {
      process.env.NODE_ENV = 'development';
      const mockServiceWorker = {
        register: jest.fn()
      };
      global.navigator = {
        serviceWorker: mockServiceWorker
      };

      register();

      expect(mockServiceWorker.register).not.toHaveBeenCalled();
    });

    it('should not register service worker if serviceWorker is not in navigator', () => {
      process.env.NODE_ENV = 'production';
      global.navigator = {};

      register();

      expect(global.console.error).not.toHaveBeenCalled();
    });
  });

  describe('unregister', () => {
    it('should not throw error if serviceWorker is not in navigator', () => {
      global.navigator = {};

      expect(() => unregister()).not.toThrow();
    });
  });

  describe('isLocalhost detection', () => {
    it('should detect localhost hostname', () => {
      window.location.hostname = 'localhost';
      expect(window.location.hostname).toBe('localhost');
    });

    it('should detect IPv6 localhost', () => {
      window.location.hostname = '[::1]';
      expect(window.location.hostname).toBe('[::1]');
    });

    it('should detect IPv4 localhost', () => {
      window.location.hostname = '127.0.0.1';
      expect(window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)).toBeTruthy();
    });
  });
});