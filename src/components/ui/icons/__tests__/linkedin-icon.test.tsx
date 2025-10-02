import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { LinkedInIcon } from '../linkedin-icon';
import React from 'react';

describe('LinkedInIcon', () => {
  it('should render with default classes', () => {
    render(<LinkedInIcon />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveClass('h-5', 'w-5');
  });

  it('should render with custom className', () => {
    render(<LinkedInIcon className="h-8 w-8 text-blue-600" />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveClass('h-8', 'w-8', 'text-blue-600');
  });

  it('should have correct SVG attributes', () => {
    render(<LinkedInIcon />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
    expect(icon).toHaveAttribute('fill', 'currentColor');
    expect(icon).toHaveAttribute('aria-label', 'LinkedIn');
  });

  it('should contain the LinkedIn path element', () => {
    const { container } = render(<LinkedInIcon />);

    const pathElement = container.querySelector('path');
    expect(pathElement).toBeInTheDocument();
    expect(pathElement).toHaveAttribute('d');
  });

  it('should handle empty className', () => {
    render(<LinkedInIcon className="" />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('class', '');
  });

  it('should be accessible as an image', () => {
    render(<LinkedInIcon />);

    const icon = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
  });
});