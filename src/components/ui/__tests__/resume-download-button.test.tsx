import { render, screen } from '@testing-library/react'
import { ResumeDownloadButton } from '../resume-download-button'

describe('ResumeDownloadButton', () => {
  it('renders the download button', () => {
    render(<ResumeDownloadButton />)

    expect(screen.getByRole('link', { name: /download.*resume/i })).toBeInTheDocument()
  })

  it('has correct PDF link', () => {
    render(<ResumeDownloadButton />)

    const link = screen.getByRole('link', { name: /download.*resume/i })
    expect(link).toHaveAttribute('href', '/Patrick W. Lehmann - Software Engineer.pdf')
  })

  it('has download attribute with suggested filename', () => {
    render(<ResumeDownloadButton />)

    const link = screen.getByRole('link', { name: /download.*resume/i })
    expect(link).toHaveAttribute('download', 'Patrick-Lehmann-Resume.pdf')
  })

  it('opens in new tab', () => {
    render(<ResumeDownloadButton />)

    const link = screen.getByRole('link', { name: /download.*resume/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has proper aria-label for accessibility', () => {
    render(<ResumeDownloadButton />)

    const link = screen.getByLabelText(/download patrick lehmann.*resume/i)
    expect(link).toBeInTheDocument()
  })

  it('renders section heading', () => {
    render(<ResumeDownloadButton />)

    expect(screen.getByText('Want to Learn More?')).toBeInTheDocument()
  })

  it('renders description text', () => {
    render(<ResumeDownloadButton />)

    expect(screen.getByText(/download my resume/i)).toBeInTheDocument()
  })

  it('renders download icon', () => {
    const { container } = render(<ResumeDownloadButton />)

    // lucide-react icons render as SVG
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})
