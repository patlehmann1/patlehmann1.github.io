import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { BackToTop } from '../back-to-top';
import { useReducedMotion } from '@/hooks/useReducedMotion';

jest.mock('@/hooks/useReducedMotion');

const mockUseReducedMotion = useReducedMotion as jest.MockedFunction<typeof useReducedMotion>;

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('BackToTop', () => {
  beforeEach(() => {
    mockUseReducedMotion.mockReturnValue(false);
    window.scrollTo = jest.fn();
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not be visible when scroll position is below threshold', () => {
    render(<BackToTop />);

    expect(screen.queryByLabelText('Back to top')).not.toBeInTheDocument();
  });

  it('should become visible when scrolled past 400px', () => {
    render(<BackToTop />);

    Object.defineProperty(window, 'scrollY', { writable: true, value: 500 });
    fireEvent.scroll(window);

    expect(screen.getByLabelText('Back to top')).toBeInTheDocument();
  });

  it('should hide when scrolling back below threshold', () => {
    render(<BackToTop />);

    Object.defineProperty(window, 'scrollY', { writable: true, value: 500 });
    fireEvent.scroll(window);
    expect(screen.getByLabelText('Back to top')).toBeInTheDocument();

    Object.defineProperty(window, 'scrollY', { writable: true, value: 300 });
    fireEvent.scroll(window);
    expect(screen.queryByLabelText('Back to top')).not.toBeInTheDocument();
  });

  it('should scroll to top with smooth behavior when clicked', () => {
    mockUseReducedMotion.mockReturnValue(false);
    render(<BackToTop />);

    Object.defineProperty(window, 'scrollY', { writable: true, value: 500 });
    fireEvent.scroll(window);

    const button = screen.getByLabelText('Back to top');
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('should scroll to top with auto behavior when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<BackToTop />);

    Object.defineProperty(window, 'scrollY', { writable: true, value: 500 });
    fireEvent.scroll(window);

    const button = screen.getByLabelText('Back to top');
    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'auto',
    });
  });

  it('should have correct styling classes', () => {
    render(<BackToTop />);

    Object.defineProperty(window, 'scrollY', { writable: true, value: 500 });
    fireEvent.scroll(window);

    const button = screen.getByLabelText('Back to top');
    expect(button).toHaveClass('rounded-full', 'h-12', 'w-12');
  });

  it('should render ArrowUp icon', () => {
    render(<BackToTop />);

    Object.defineProperty(window, 'scrollY', { writable: true, value: 500 });
    fireEvent.scroll(window);

    const button = screen.getByLabelText('Back to top');
    const icon = button.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('should cleanup scroll listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<BackToTop />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
