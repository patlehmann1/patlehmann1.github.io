import React from 'react'
import { render, screen } from '@testing-library/react'
import { FacebookIcon } from '../facebook-icon'

describe('FacebookIcon', () => {
  it('should render the Facebook icon with default className', () => {
    render(<FacebookIcon />)

    const icon = screen.getByRole('img', { name: 'Facebook' })
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('h-5 w-5')
  })

  it('should render the Facebook icon with custom className', () => {
    render(<FacebookIcon className="h-8 w-8 text-blue-600" />)

    const icon = screen.getByRole('img', { name: 'Facebook' })
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('h-8 w-8 text-blue-600')
    expect(icon).not.toHaveClass('h-5 w-5')
  })

  it('should render the Facebook icon as an SVG element', () => {
    const { container } = render(<FacebookIcon />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    expect(svg).toHaveAttribute('fill', 'currentColor')
  })

  it('should have proper accessibility attributes', () => {
    render(<FacebookIcon />)

    const icon = screen.getByRole('img', { name: 'Facebook' })
    expect(icon).toHaveAttribute('aria-label', 'Facebook')
    expect(icon).toHaveAttribute('role', 'img')
  })

  it('should contain the Facebook icon path', () => {
    const { container } = render(<FacebookIcon />)

    const path = container.querySelector('path')
    expect(path).toBeInTheDocument()
    expect(path).toHaveAttribute('d')
    expect(path?.getAttribute('d')).toContain('M24 12.073c0-6.627')
  })

  it('should handle empty className gracefully', () => {
    render(<FacebookIcon className="" />)

    const icon = screen.getByRole('img', { name: 'Facebook' })
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('')
  })

  it('should handle multiple CSS classes', () => {
    render(<FacebookIcon className="h-6 w-6 text-blue-500 hover:text-blue-700" />)

    const icon = screen.getByRole('img', { name: 'Facebook' })
    expect(icon).toHaveClass('h-6', 'w-6', 'text-blue-500', 'hover:text-blue-700')
  })
})