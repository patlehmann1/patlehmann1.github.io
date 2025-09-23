import { render, screen, act } from '@testing-library/react';
import { Typewriter } from '../typewriter';

// Mock timers
jest.useFakeTimers();

describe('Typewriter', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should render with cursor', () => {
    render(<Typewriter texts={['Hello']} />);
    expect(screen.getByText('|')).toBeInTheDocument();
  });

  it('should accept custom className', () => {
    render(<Typewriter texts={['Hello']} className="custom-class" />);
    const element = screen.getByText('|').parentElement;
    expect(element).toHaveClass('custom-class');
  });

  it('should handle empty texts array gracefully', () => {
    render(<Typewriter texts={[]} />);
    expect(screen.getByText('|')).toBeInTheDocument();
  });

  it('should accept all props without error', () => {
    expect(() => {
      render(
        <Typewriter
          texts={['Test']}
          speed={50}
          deleteSpeed={25}
          delayBetween={1000}
          className="test-class"
        />
      );
    }).not.toThrow();
  });

  it('should render with multiple texts', () => {
    render(<Typewriter texts={['Text 1', 'Text 2', 'Text 3']} />);
    expect(screen.getByText('|')).toBeInTheDocument();
  });

  it('should handle single character text', () => {
    render(<Typewriter texts={['A']} />);
    expect(screen.getByText('|')).toBeInTheDocument();
  });

  it('should handle special characters', () => {
    render(<Typewriter texts={['Hello!@#$%^&*()']} />);
    expect(screen.getByText('|')).toBeInTheDocument();
  });

  it('should start typing animation', () => {
    render(<Typewriter texts={['Hi']} speed={100} />);

    // Initially just cursor
    expect(screen.getByText('|')).toBeInTheDocument();

    // Should still have cursor after short time (testing initialization)
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(screen.getByText('|')).toBeInTheDocument();
  });

  it('should handle component unmount', () => {
    const { unmount } = render(<Typewriter texts={['Test']} />);
    expect(() => unmount()).not.toThrow();
  });

  it('should work with default props', () => {
    render(<Typewriter texts={['Default']} />);
    expect(screen.getByText('|')).toBeInTheDocument();
  });
});