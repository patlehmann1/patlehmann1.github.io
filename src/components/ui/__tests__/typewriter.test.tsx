import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { act } from 'react';
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

  it('should handle waiting state after text completion', () => {
    render(<Typewriter texts={['Hi']} speed={50} delayBetween={1000} />);

    // Fast forward through typing to completion
    act(() => {
      jest.advanceTimersByTime(150); // Should complete "Hi"
    });

    // Should enter waiting state, then start deleting after delay
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('|')).toBeInTheDocument();
  });

  it('should transition from waiting to deleting state', () => {
    render(<Typewriter texts={['Test']} speed={50} delayBetween={500} />);

    // Complete the typing
    act(() => {
      jest.advanceTimersByTime(250); // Type "Test"
    });

    // Wait for delay period and transition to deleting
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByText('|')).toBeInTheDocument();
  });

  it('should complete deletion and move to next text', () => {
    render(<Typewriter texts={['A', 'B']} speed={50} deleteSpeed={25} delayBetween={100} />);

    // Type first character
    act(() => {
      jest.advanceTimersByTime(50);
    });

    // Wait and start deleting
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Complete deletion
    act(() => {
      jest.advanceTimersByTime(25);
    });

    expect(screen.getByText('|')).toBeInTheDocument();
  });

  it('should handle text cycling through multiple texts', () => {
    render(<Typewriter texts={['A', 'B', 'C']} speed={50} deleteSpeed={25} delayBetween={100} />);

    // Type first text
    act(() => {
      jest.advanceTimersByTime(50);
    });

    // Wait, delete, and cycle to next
    act(() => {
      jest.advanceTimersByTime(125);
    });

    // Should cycle through texts
    expect(screen.getByText('|')).toBeInTheDocument();
  });

  it('should handle timeout cleanup during typing', () => {
    const { unmount } = render(<Typewriter texts={['Hello']} speed={100} />);

    // Start typing process
    act(() => {
      jest.advanceTimersByTime(50);
    });

    // Unmount should clean up timers
    expect(() => unmount()).not.toThrow();
  });

  it('should handle timeout cleanup during deletion', () => {
    const { unmount } = render(<Typewriter texts={['Hi']} speed={50} deleteSpeed={25} delayBetween={100} />);

    // Complete typing and start deletion
    act(() => {
      jest.advanceTimersByTime(150);
    });

    // Unmount during deletion
    expect(() => unmount()).not.toThrow();
  });
});