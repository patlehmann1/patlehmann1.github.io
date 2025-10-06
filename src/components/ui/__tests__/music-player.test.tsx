import { render, screen } from '@testing-library/react'
import { MusicPlayer } from '../music-player'

describe('MusicPlayer Component', () => {
  const defaultProps = {
    embedUrl: 'https://embed.music.apple.com/us/playlist/test-playlist/pl.test123',
  }

  describe('Rendering', () => {
    it('should render iframe with correct src', () => {
      render(<MusicPlayer {...defaultProps} />)

      const iframe = screen.getByTitle('Apple Music Player')
      expect(iframe).toBeInTheDocument()
      expect(iframe).toHaveAttribute('src', defaultProps.embedUrl)
    })

    it('should render with optional title', () => {
      render(<MusicPlayer {...defaultProps} title="Test Playlist" />)

      expect(screen.getByText('Test Playlist')).toBeInTheDocument()
      const iframe = screen.getByTitle('Test Playlist')
      expect(iframe).toBeInTheDocument()
    })

    it('should render with optional description', () => {
      render(
        <MusicPlayer
          {...defaultProps}
          description="This is a test description for the playlist"
        />
      )

      expect(screen.getByText('This is a test description for the playlist')).toBeInTheDocument()
    })

    it('should render with both title and description', () => {
      render(
        <MusicPlayer
          {...defaultProps}
          title="My Playlist"
          description="My favorite coding music"
        />
      )

      expect(screen.getByText('My Playlist')).toBeInTheDocument()
      expect(screen.getByText('My favorite coding music')).toBeInTheDocument()
    })

    it('should render without title and description', () => {
      render(<MusicPlayer {...defaultProps} />)

      const iframe = screen.getByTitle('Apple Music Player')
      expect(iframe).toBeInTheDocument()
    })
  })

  describe('Iframe Attributes', () => {
    it('should have correct allow attribute', () => {
      render(<MusicPlayer {...defaultProps} />)

      const iframe = screen.getByTitle('Apple Music Player')
      expect(iframe).toHaveAttribute('allow', 'autoplay *; encrypted-media *;')
    })

    it('should have correct sandbox attribute', () => {
      render(<MusicPlayer {...defaultProps} />)

      const iframe = screen.getByTitle('Apple Music Player')
      expect(iframe).toHaveAttribute(
        'sandbox',
        'allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation'
      )
    })

    it('should have frameBorder set to 0', () => {
      render(<MusicPlayer {...defaultProps} />)

      const iframe = screen.getByTitle('Apple Music Player')
      expect(iframe).toHaveAttribute('frameborder', '0')
    })

    it('should have loading lazy attribute', () => {
      render(<MusicPlayer {...defaultProps} />)

      const iframe = screen.getByTitle('Apple Music Player')
      expect(iframe).toHaveAttribute('loading', 'lazy')
    })

    it('should have default height of 450', () => {
      render(<MusicPlayer {...defaultProps} />)

      const iframe = screen.getByTitle('Apple Music Player')
      expect(iframe).toHaveAttribute('height', '450')
    })

    it('should accept custom height', () => {
      render(<MusicPlayer {...defaultProps} height={300} />)

      const iframe = screen.getByTitle('Apple Music Player')
      expect(iframe).toHaveAttribute('height', '300')
    })
  })

  describe('Styling', () => {
    it('should apply title styling with primary color', () => {
      render(<MusicPlayer {...defaultProps} title="Test Title" />)

      const title = screen.getByText('Test Title')
      expect(title).toHaveClass('font-semibold', 'mb-3', 'text-primary')
    })

    it('should apply description styling with muted foreground', () => {
      render(<MusicPlayer {...defaultProps} description="Test Description" />)

      const description = screen.getByText('Test Description')
      expect(description).toHaveClass('text-body', 'text-muted-foreground', 'mb-4')
    })

    it('should have responsive wrapper styling', () => {
      const { container } = render(<MusicPlayer {...defaultProps} />)

      const wrapper = container.querySelector('div > div')
      expect(wrapper).toHaveClass('w-full')
    })
  })

  describe('Accessibility', () => {
    it('should have title attribute for screen readers', () => {
      render(<MusicPlayer {...defaultProps} />)

      const iframe = screen.getByTitle('Apple Music Player')
      expect(iframe).toHaveAttribute('title')
    })

    it('should use custom title as iframe title when provided', () => {
      render(<MusicPlayer {...defaultProps} title="Custom Playlist Title" />)

      const iframe = screen.getByTitle('Custom Playlist Title')
      expect(iframe).toBeInTheDocument()
    })
  })
})
