import { cn } from '../utils'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    expect(cn('px-2 py-1', 'bg-blue-500')).toBe('px-2 py-1 bg-blue-500')
  })

  it('should override conflicting classes with later ones', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-sm', 'text-lg')).toBe('text-lg')
  })

  it('should handle conditional classes', () => {
    expect(cn('px-2', true && 'py-1', false && 'bg-red-500')).toBe('px-2 py-1')
  })

  it('should handle undefined and null values', () => {
    expect(cn('px-2', undefined, null, 'py-1')).toBe('px-2 py-1')
  })

  it('should handle arrays of classes', () => {
    expect(cn(['px-2', 'py-1'], 'bg-blue-500')).toBe('px-2 py-1 bg-blue-500')
  })

  it('should handle objects with boolean values', () => {
    expect(cn({
      'px-2': true,
      'py-1': false,
      'bg-blue-500': true
    })).toBe('px-2 bg-blue-500')
  })

  it('should handle complex scenarios', () => {
    expect(cn(
      'px-2 py-1',
      'bg-blue-500',
      { 'text-white': true, 'text-black': false },
      ['rounded', 'shadow'],
      false && 'hidden',
      true && 'block'
    )).toBe('px-2 py-1 bg-blue-500 text-white rounded shadow block')
  })

  it('should handle empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
    expect(cn(null, undefined, false)).toBe('')
  })

  it('should prioritize later conflicting Tailwind classes', () => {
    expect(cn('text-red-500 bg-blue-100', 'text-green-500 bg-red-100')).toBe('text-green-500 bg-red-100')
    expect(cn('p-4 m-2', 'p-6')).toBe('m-2 p-6')
  })
})