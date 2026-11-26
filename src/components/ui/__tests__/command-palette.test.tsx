import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CommandPalette, CommandPaletteTrigger } from '../command-palette'

const mockSetTheme = jest.fn()
jest.mock('next-themes', () => ({
  useTheme: () => ({ setTheme: mockSetTheme })
}))

const mockScrollToSection = jest.fn()
jest.mock('@/hooks/useScrollToSection', () => ({
  useScrollToSection: () => mockScrollToSection
}))

jest.mock('@/components/ui/icons/pixel', () => ({
  Search: () => <span data-testid="search-icon" />
}))

const posts = [{ slug: 'hello-world', title: 'Hello World' }]

function setup() {
  render(
    <>
      <CommandPaletteTrigger />
      <CommandPalette posts={posts} />
    </>
  )
}

function openWithShortcut() {
  fireEvent.keyDown(window, { key: 'k', metaKey: true })
}

const input = () => screen.getByRole('combobox', { name: 'Type a command' })

describe('CommandPalette', () => {
  beforeEach(() => jest.clearAllMocks())

  it('is closed by default', () => {
    setup()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens with Cmd+K and focuses the input', () => {
    setup()
    openWithShortcut()
    expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeInTheDocument()
    expect(input()).toHaveFocus()
  })

  it('opens from the trigger button and toggles closed with Ctrl+K', () => {
    setup()
    fireEvent.click(screen.getByRole('button', { name: 'Open command palette' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.keyDown(window, { key: 'K', ctrlKey: true })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes on Escape and on backdrop click', () => {
    setup()
    openWithShortcut()
    fireEvent.keyDown(input(), { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    openWithShortcut()
    fireEvent.mouseDown(screen.getByRole('dialog').parentElement!)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('filters commands and runs the active one on Enter', () => {
    setup()
    openWithShortcut()
    fireEvent.change(input(), { target: { value: 'hello' } })
    expect(screen.getAllByRole('option')).toHaveLength(1)
    fireEvent.keyDown(input(), { key: 'Enter' })
    expect(mockScrollToSection).toHaveBeenCalledWith('/blog/hello-world')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('moves the selection with arrow keys and wraps around', () => {
    setup()
    openWithShortcut()
    fireEvent.change(input(), { target: { value: 'theme' } })
    const options = screen.getAllByRole('option')
    expect(options[0]).toHaveAttribute('aria-selected', 'true')

    fireEvent.keyDown(input(), { key: 'ArrowUp' })
    expect(screen.getAllByRole('option')[options.length - 1]).toHaveAttribute('aria-selected', 'true')

    fireEvent.keyDown(input(), { key: 'ArrowDown' })
    fireEvent.keyDown(input(), { key: 'ArrowDown' })
    expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true')
    expect(input()).toHaveAttribute('aria-activedescendant', screen.getAllByRole('option')[1].id)
  })

  it('switches themes on click', () => {
    setup()
    openWithShortcut()
    fireEvent.change(input(), { target: { value: 'theme ocean' } })
    fireEvent.click(screen.getByRole('option', { name: /theme ocean/ }))
    expect(mockSetTheme).toHaveBeenCalledWith('ocean')
  })

  it('opens external links in a new tab', () => {
    const open = jest.spyOn(window, 'open').mockImplementation(() => null)
    setup()
    openWithShortcut()
    fireEvent.change(input(), { target: { value: 'github' } })
    fireEvent.keyDown(input(), { key: 'Enter' })
    expect(open).toHaveBeenCalledWith('https://github.com/patlehmann1', '_blank', 'noopener,noreferrer')
    open.mockRestore()
  })

  it('prints easter egg output and stays open', () => {
    setup()
    openWithShortcut()
    fireEvent.change(input(), { target: { value: 'sudo make me a sandwich' } })
    fireEvent.keyDown(input(), { key: 'Enter' })
    expect(screen.getByRole('status')).toHaveTextContent('not in the sudoers file')
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('shows a not-found message and ignores Enter with no results', () => {
    setup()
    openWithShortcut()
    fireEvent.change(input(), { target: { value: 'xyzzy' } })
    expect(screen.getByText('command not found: xyzzy')).toBeInTheDocument()
    fireEvent.keyDown(input(), { key: 'ArrowDown' })
    fireEvent.keyDown(input(), { key: 'ArrowUp' })
    fireEvent.keyDown(input(), { key: 'Enter' })
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(mockScrollToSection).not.toHaveBeenCalled()
  })
})
