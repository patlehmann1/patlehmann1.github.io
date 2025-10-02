import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ScrollToTop } from '../scroll-to-top';
import React from 'react';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('ScrollToTop', () => {
  let mockScrollTo: jest.Mock;

  beforeEach(() => {
    mockScrollTo = jest.fn();
    Object.defineProperty(window, 'scrollTo', {
      value: mockScrollTo,
      writable: true,
    });

    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });

    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not render button when not scrolled', () => {
    render(<ScrollToTop />);

    const button = screen.queryByRole('button', { name: /scroll to top/i });
    expect(button).not.toBeInTheDocument();
  });

  it('should render button when scrolled past threshold', async () => {
    render(<ScrollToTop />);

    Object.defineProperty(window, 'scrollY', {
      value: 900,
      writable: true,
    });

    fireEvent.scroll(window);

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /scroll to top/i });
      expect(button).toBeInTheDocument();
    });
  });

  it('should hide button when scrolled back to top', async () => {
    render(<ScrollToTop />);

    Object.defineProperty(window, 'scrollY', {
      value: 900,
      writable: true,
    });
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /scroll to top/i })).toBeInTheDocument();
    });

    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true,
    });
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /scroll to top/i })).not.toBeInTheDocument();
    });
  });

  it('should scroll to top when button is clicked', async () => {
    render(<ScrollToTop />);

    Object.defineProperty(window, 'scrollY', {
      value: 900,
      writable: true,
    });
    fireEvent.scroll(window);

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /scroll to top/i });
      expect(button).toBeInTheDocument();

      fireEvent.click(button);

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth',
      });
    });
  });

  it('should clean up scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<ScrollToTop />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });

  it('should have correct accessibility attributes', async () => {
    render(<ScrollToTop />);

    Object.defineProperty(window, 'scrollY', {
      value: 900,
      writable: true,
    });
    fireEvent.scroll(window);

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /scroll to top/i });
      expect(button).toHaveAttribute('aria-label', 'Scroll to top');
    });
  });

  it('should handle edge case when innerHeight is 0', async () => {
    Object.defineProperty(window, 'innerHeight', {
      value: 0,
      writable: true,
    });

    render(<ScrollToTop />);

    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true,
    });
    fireEvent.scroll(window);

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /scroll to top/i });
      expect(button).toBeInTheDocument();
    });
  });
});