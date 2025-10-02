import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { Toast } from '../toast';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.useFakeTimers();

describe('Toast', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should not render when isVisible is false', () => {
    render(<Toast message="Test message" isVisible={false} onClose={mockOnClose} />);

    expect(screen.queryByText('Test message')).not.toBeInTheDocument();
  });

  it('should render when isVisible is true', () => {
    render(<Toast message="Test message" isVisible={true} onClose={mockOnClose} />);

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should display the correct message', () => {
    render(<Toast message="Success!" isVisible={true} onClose={mockOnClose} />);

    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('should render with check icon', () => {
    render(<Toast message="Test" isVisible={true} onClose={mockOnClose} />);

    const icon = screen.getByText('Test').previousElementSibling;
    expect(icon?.tagName).toBe('svg');
  });

  it('should call onClose after 2 seconds when visible', () => {
    render(<Toast message="Test" isVisible={true} onClose={mockOnClose} />);

    expect(mockOnClose).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when isVisible is false', () => {
    render(<Toast message="Test" isVisible={false} onClose={mockOnClose} />);

    jest.advanceTimersByTime(2000);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should clear timeout on unmount', () => {
    const { unmount } = render(<Toast message="Test" isVisible={true} onClose={mockOnClose} />);

    unmount();
    jest.advanceTimersByTime(2000);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should clear previous timeout when isVisible changes', () => {
    const { rerender } = render(<Toast message="Test" isVisible={true} onClose={mockOnClose} />);

    jest.advanceTimersByTime(1000);

    rerender(<Toast message="Test" isVisible={false} onClose={mockOnClose} />);
    jest.advanceTimersByTime(1000);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should restart timer when isVisible changes from false to true', () => {
    const { rerender } = render(<Toast message="Test" isVisible={false} onClose={mockOnClose} />);

    rerender(<Toast message="Test" isVisible={true} onClose={mockOnClose} />);

    jest.advanceTimersByTime(2000);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should have correct styling classes', () => {
    render(<Toast message="Test" isVisible={true} onClose={mockOnClose} />);

    const toast = screen.getByText('Test').closest('div');
    expect(toast).toHaveClass('fixed', 'bottom-6', 'right-6', 'z-50');
  });
});
