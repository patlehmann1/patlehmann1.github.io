import React from 'react'
import { render, screen } from '@testing-library/react'
import { XIcon } from '../x-icon'

describe('XIcon', () => {
  it('should render the X icon with default className', () => {
    render(<XIcon />)

    const icon = screen.getByRole('img', { name: 'X' })
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('h-5 w-5')
  })

  it('should render the X icon with custom className', () => {
    render(<XIcon className="h-8 w-8 text-gray-900" />)

    const icon = screen.getByRole('img', { name: 'X' })
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('h-8 w-8 text-gray-900')
    expect(icon).not.toHaveClass('h-5 w-5')
  })

  it('should render the X icon as an SVG element', () => {
    const { container } = render(<XIcon />)

    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24')
    expect(svg).toHaveAttribute('fill', 'currentColor')
  })

  it('should have proper accessibility attributes', () => {
    render(<XIcon />)

    const icon = screen.getByRole('img', { name: 'X' })
    expect(icon).toHaveAttribute('aria-label', 'X')
    expect(icon).toHaveAttribute('role', 'img')
  })

  it('should contain the X icon path', () => {
    const { container } = render(<XIcon />)

    const path = container.querySelector('path')
    expect(path).toBeInTheDocument()
    expect(path).toHaveAttribute('d')
    expect(path?.getAttribute('d')).toContain('M18.901 1.153h3.68l-8.04 9.19L24')
  })

  it('should handle empty className gracefully', () => {
    render(<XIcon className="" />)

    const icon = screen.getByRole('img', { name: 'X' })
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('class', '')
  })

  it('should handle multiple CSS classes', () => {
    render(<XIcon className="h-6 w-6 text-black hover:text-gray-700" />)

    const icon = screen.getByRole('img', { name: 'X' })
    expect(icon).toHaveClass('h-6', 'w-6', 'text-black', 'hover:text-gray-700')
  })
})