import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { GitHubIcon } from '../github-icon';
import React from 'react';

describe('GitHubIcon', () => {
  it('should render with default classes', () => {
    render(<GitHubIcon />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveClass('h-5', 'w-5');
  });

  it('should render with custom className', () => {
    render(<GitHubIcon className="h-8 w-8 text-blue-500" />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveClass('h-8', 'w-8', 'text-blue-500');
  });

  it('should have correct SVG attributes', () => {
    render(<GitHubIcon />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
    expect(icon).toHaveAttribute('fill', 'currentColor');
    expect(icon).toHaveAttribute('aria-label', 'GitHub');
  });

  it('should contain the GitHub path element', () => {
    const { container } = render(<GitHubIcon />);

    const pathElement = container.querySelector('path');
    expect(pathElement).toBeInTheDocument();
    expect(pathElement).toHaveAttribute('d');
  });

  it('should handle empty className', () => {
    render(<GitHubIcon className="" />);

    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('class', '');
  });

  it('should be accessible as an image', () => {
    render(<GitHubIcon />);

    const icon = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
  });
});