import { render, screen } from '@testing-library/react';
import { Skeleton, BlogCardSkeleton } from '../skeleton';
import React from 'react';

interface MockMotionDivProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode;
  animate?: unknown;
  transition?: unknown;
}

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, animate, transition, ...props }: MockMotionDivProps) => (
      <div data-testid="motion-div" data-animate={JSON.stringify(animate)} data-transition={JSON.stringify(transition)} {...props}>
        {children}
      </div>
    ),
  },
}));

describe('Skeleton', () => {
  it('should render with default classes', () => {
    render(<Skeleton />);

    const skeleton = screen.getByTestId('motion-div');
    expect(skeleton).toHaveClass('bg-muted/70', 'rounded');
  });

  it('should render with custom className', () => {
    render(<Skeleton className="h-4 w-full custom-class" />);

    const skeleton = screen.getByTestId('motion-div');
    expect(skeleton).toHaveClass('bg-muted/70', 'rounded', 'h-4', 'w-full', 'custom-class');
  });

  it('should render with animation by default', () => {
    render(<Skeleton />);

    const skeleton = screen.getByTestId('motion-div');
    const animateData = JSON.parse(skeleton.getAttribute('data-animate') || '{}');

    expect(animateData).toEqual({
      opacity: [0.7, 1, 0.7],
    });
  });

  it('should render without animation when animate is false', () => {
    const { container } = render(<Skeleton animate={false} />);

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('bg-muted/70', 'rounded');
    expect(element.tagName).toBe('DIV');
  });

  it('should handle empty className', () => {
    render(<Skeleton className="" />);

    const skeleton = screen.getByTestId('motion-div');
    expect(skeleton).toHaveClass('bg-muted/70', 'rounded');
  });

  it('should render static skeleton when animate is false', () => {
    const { container } = render(<Skeleton animate={false} />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass('bg-muted/70', 'rounded');
    expect(skeleton.tagName).toBe('DIV');
  });
});

describe('BlogCardSkeleton', () => {
  it('should render complete blog card skeleton structure', () => {
    const { container } = render(<BlogCardSkeleton />);

    const mainContainer = container.querySelector('.bg-card.border.rounded-lg');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('bg-card', 'border', 'rounded-lg', 'p-6', 'space-y-4');
  });

  it('should render all skeleton elements', () => {
    render(<BlogCardSkeleton />);

    const skeletonElements = screen.getAllByTestId('motion-div');

    expect(skeletonElements.length).toBeGreaterThanOrEqual(7);
  });

  it('should have correct skeleton dimensions', () => {
    render(<BlogCardSkeleton />);

    const skeletonElements = screen.getAllByTestId('motion-div');

    expect(skeletonElements[0]).toHaveClass('h-4', 'w-20');
    expect(skeletonElements[1]).toHaveClass('h-6', 'w-3/4');
    expect(skeletonElements[2]).toHaveClass('h-16', 'w-full');
    expect(skeletonElements[3]).toHaveClass('h-5', 'w-16');
    expect(skeletonElements[4]).toHaveClass('h-5', 'w-20');
    expect(skeletonElements[5]).toHaveClass('h-5', 'w-14');
    expect(skeletonElements[6]).toHaveClass('h-4', 'w-24');
  });

  it('should have proper nested structure', () => {
    const { container } = render(<BlogCardSkeleton />);

    const spaceY2 = container.querySelector('.space-y-2');
    const spaceY4 = container.querySelector('.space-y-4');
    const flexWrap = container.querySelector('.flex.flex-wrap.gap-2');
    const flexJustifyBetween = container.querySelector('.flex.items-center.justify-between');

    expect(spaceY2).toBeInTheDocument();
    expect(spaceY4).toBeInTheDocument();
    expect(flexWrap).toBeInTheDocument();
    expect(flexJustifyBetween).toBeInTheDocument();
  });

  it('should render tags section with multiple tag skeletons', () => {
    render(<BlogCardSkeleton />);

    const tagSkeletons = screen.getAllByTestId('motion-div').slice(3, 6);

    expect(tagSkeletons).toHaveLength(3);
    tagSkeletons.forEach(skeleton => {
      expect(skeleton).toHaveClass('h-5');
    });
  });

  it('should render footer section with reading time and date skeletons', () => {
    render(<BlogCardSkeleton />);

    const footerSkeletons = screen.getAllByTestId('motion-div').slice(-2);

    expect(footerSkeletons).toHaveLength(2);
    expect(footerSkeletons[0]).toHaveClass('h-4', 'w-24');
    expect(footerSkeletons[1]).toHaveClass('h-4', 'w-16');
  });
});