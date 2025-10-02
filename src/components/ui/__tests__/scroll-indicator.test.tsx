import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ScrollIndicator } from '../scroll-indicator';
import { useReducedMotion } from '@/hooks/useReducedMotion';

jest.mock('@/hooks/useReducedMotion');

const mockUseReducedMotion = useReducedMotion as jest.MockedFunction<typeof useReducedMotion>;

describe('ScrollIndicator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockUseReducedMotion.mockReturnValue(false);
    window.scrollY = 0;
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should not render immediately', () => {
    render(<ScrollIndicator />);

    const button = screen.queryByLabelText('Scroll to next section');
    expect(button).not.toBeInTheDocument();
  });

  it('should render after 2 second delay', async () => {
    render(<ScrollIndicator />);

    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      const button = screen.getByLabelText('Scroll to next section');
      expect(button).toBeInTheDocument();
    });
  });

  it('should hide when scrolled past 100px', async () => {
    render(<ScrollIndicator />);

    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByLabelText('Scroll to next section')).toBeInTheDocument();
    });

    Object.defineProperty(window, 'scrollY', { value: 150, writable: true });
    fireEvent.scroll(window);

    await waitFor(() => {
      expect(screen.queryByLabelText('Scroll to next section')).not.toBeInTheDocument();
    });
  });

  it('should scroll to about section when clicked', async () => {
    const mockAboutSection = document.createElement('div');
    mockAboutSection.id = 'about';
    const scrollIntoViewMock = jest.fn();
    mockAboutSection.scrollIntoView = scrollIntoViewMock;
    document.body.appendChild(mockAboutSection);

    render(<ScrollIndicator />);

    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByLabelText('Scroll to next section')).toBeInTheDocument();
    });

    const button = screen.getByLabelText('Scroll to next section');
    fireEvent.click(button);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'smooth'
    });

    document.body.removeChild(mockAboutSection);
  });

  it('should use auto scroll behavior when reduced motion is preferred', async () => {
    mockUseReducedMotion.mockReturnValue(true);

    const mockAboutSection = document.createElement('div');
    mockAboutSection.id = 'about';
    const scrollIntoViewMock = jest.fn();
    mockAboutSection.scrollIntoView = scrollIntoViewMock;
    document.body.appendChild(mockAboutSection);

    render(<ScrollIndicator />);

    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByLabelText('Scroll to next section')).toBeInTheDocument();
    });

    const button = screen.getByLabelText('Scroll to next section');
    fireEvent.click(button);

    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: 'auto'
    });

    document.body.removeChild(mockAboutSection);
  });

  it('should handle missing about section gracefully', async () => {
    render(<ScrollIndicator />);

    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByLabelText('Scroll to next section')).toBeInTheDocument();
    });

    const button = screen.getByLabelText('Scroll to next section');

    expect(() => fireEvent.click(button)).not.toThrow();
  });

  it('should clean up event listeners on unmount', async () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<ScrollIndicator />);

    jest.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByLabelText('Scroll to next section')).toBeInTheDocument();
    });

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});