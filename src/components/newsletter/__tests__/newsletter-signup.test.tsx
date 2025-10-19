import { render } from '@testing-library/react'
import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { NewsletterSignup } from '../newsletter-signup'

const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>

describe('NewsletterSignup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'subscriber-123' }),
    } as Response)
  })

  describe('Rendering', () => {
    it('should render the newsletter signup form', () => {
      render(<NewsletterSignup />)

      expect(screen.getByText('Stay Updated')).toBeInTheDocument()
      expect(screen.getByText(/Get notified when I publish new articles/)).toBeInTheDocument()
      expect(screen.getByPlaceholderText('First name')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
    })

    it('should apply custom className when provided', () => {
      render(<NewsletterSignup className="custom-newsletter" />)

      const container = screen.getByText('Stay Updated').closest('[class*="custom-newsletter"]')
      expect(container).toHaveClass('custom-newsletter')
    })

    it('should have proper form structure', () => {
      render(<NewsletterSignup />)

      const firstNameInput = screen.getByPlaceholderText('First name')
      const emailInput = screen.getByPlaceholderText('Email address')

      expect(firstNameInput).toHaveAttribute('type', 'text')
      expect(emailInput).toHaveAttribute('type', 'email')
    })
  })

  describe('Form Validation', () => {
    it('should show validation error for empty first name', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const submitButton = screen.getByRole('button', { name: /subscribe/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('First name is required')).toBeInTheDocument()
      })
    })

    it('should show validation error for long first name', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const firstNameInput = screen.getByPlaceholderText('First name')
      const longName = 'a'.repeat(51)

      await user.type(firstNameInput, longName)
      await user.click(screen.getByRole('button', { name: /subscribe/i }))

      await waitFor(() => {
        expect(screen.getByText('First name must be less than 50 characters')).toBeInTheDocument()
      })
    })

    it('should not show validation errors for valid input', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const firstNameInput = screen.getByPlaceholderText('First name')
      const emailInput = screen.getByPlaceholderText('Email address')

      await user.type(firstNameInput, 'John')
      await user.type(emailInput, 'john@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))

      await waitFor(() => {
        expect(screen.queryByText('First name is required')).not.toBeInTheDocument()
        expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
      })
    })
  })

  describe('Form Submission', () => {
    it('should call Cloudflare Worker API with correct data on successful submission', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const firstNameInput = screen.getByPlaceholderText('First name')
      const emailInput = screen.getByPlaceholderText('Email address')
      const submitButton = screen.getByRole('button', { name: /subscribe/i })

      await user.type(firstNameInput, 'John')
      await user.type(emailInput, 'john@example.com')
      await user.click(submitButton)

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining('CLOUDFLARE_WORKER_URL_PLACEHOLDER'),
          expect.objectContaining({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: 'john@example.com',
              firstName: 'John',
            }),
          })
        )
      })
    })

    it('should show loading state during submission', async () => {
      const user = userEvent.setup()

      mockFetch.mockImplementation(() =>
        new Promise(resolve =>
          setTimeout(() => resolve({
            ok: true,
            json: async () => ({ id: 'subscriber-123' }),
          } as Response), 100)
        )
      )

      render(<NewsletterSignup />)

      const firstNameInput = screen.getByPlaceholderText('First name')
      const emailInput = screen.getByPlaceholderText('Email address')

      await user.type(firstNameInput, 'John')
      await user.type(emailInput, 'john@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))

      expect(screen.getByText('Subscribing...')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeDisabled()

      await waitFor(() => {
        expect(screen.queryByText('Subscribing...')).not.toBeInTheDocument()
      })
    })

    it('should show success message after successful submission', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const firstNameInput = screen.getByPlaceholderText('First name')
      const emailInput = screen.getByPlaceholderText('Email address')

      await user.type(firstNameInput, 'John')
      await user.type(emailInput, 'john@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))

      await waitFor(() => {
        expect(screen.getByText('Thanks for subscribing!')).toBeInTheDocument()
        expect(screen.getByText("You'll hear from me when I publish something new.")).toBeInTheDocument()
      })

      expect(screen.queryByPlaceholderText('First name')).not.toBeInTheDocument()
      expect(screen.queryByPlaceholderText('Email address')).not.toBeInTheDocument()
    })

    it('should show error message on API failure', async () => {
      const user = userEvent.setup()

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
      } as Response)

      render(<NewsletterSignup />)

      const firstNameInput = screen.getByPlaceholderText('First name')
      const emailInput = screen.getByPlaceholderText('Email address')

      await user.type(firstNameInput, 'John')
      await user.type(emailInput, 'john@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))

      await waitFor(() => {
        expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument()
      })

      expect(screen.getByPlaceholderText('First name')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument()
    })

    it('should show error message on network error', async () => {
      const user = userEvent.setup()

      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      render(<NewsletterSignup />)

      const firstNameInput = screen.getByPlaceholderText('First name')
      const emailInput = screen.getByPlaceholderText('Email address')

      await user.type(firstNameInput, 'John')
      await user.type(emailInput, 'john@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))

      await waitFor(() => {
        expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument()
      })
    })

    it('should reset form after successful submission', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const firstNameInput = screen.getByPlaceholderText('First name')
      const emailInput = screen.getByPlaceholderText('Email address')

      await user.type(firstNameInput, 'John')
      await user.type(emailInput, 'john@example.com')
      await user.click(screen.getByRole('button', { name: /subscribe/i }))

      await waitFor(() => {
        expect(screen.getByText('Thanks for subscribing!')).toBeInTheDocument()
      })

      expect(mockFetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('should have proper input placeholders', () => {
      render(<NewsletterSignup />)

      const firstNameInput = screen.getByPlaceholderText('First name')
      const emailInput = screen.getByPlaceholderText('Email address')

      expect(firstNameInput).toBeInTheDocument()
      expect(emailInput).toBeInTheDocument()
    })

    it('should associate error messages with inputs', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      await user.click(screen.getByRole('button', { name: /subscribe/i }))

      await waitFor(() => {
        const errorMessage = screen.getByText('First name is required')
        expect(errorMessage).toBeInTheDocument()
        expect(errorMessage).toHaveClass('text-destructive')
      })
    })

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup()
      render(<NewsletterSignup />)

      const firstNameInput = screen.getByPlaceholderText('First name')
      const emailInput = screen.getByPlaceholderText('Email address')
      const submitButton = screen.getByRole('button', { name: /subscribe/i })

      await user.tab()
      expect(firstNameInput).toHaveFocus()

      await user.tab()
      expect(emailInput).toHaveFocus()

      await user.tab()
      expect(submitButton).toHaveFocus()
    })
  })
})
