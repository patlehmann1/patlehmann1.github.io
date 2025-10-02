import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import OGPreview from '../page';
import { OG_PREVIEW_TECH_STACK } from '@/lib/constants';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}));

describe('OGPreview Component', () => {
  beforeEach(() => {
    render(<OGPreview />);
  });

  describe('Component Structure', () => {
    it('renders with correct dimensions', () => {
      const rootContainer = document.querySelector('.w-\\[1200px\\].h-\\[630px\\]');
      expect(rootContainer).toBeInTheDocument();
      expect(rootContainer).toHaveClass('w-[1200px]', 'h-[630px]');
    });

    it('has proper background elements', () => {
      const backgroundGrid = document.querySelector('.bg-grid');
      expect(backgroundGrid).toBeInTheDocument();

      const floatingElements = document.querySelectorAll('.bg-primary\\/5, .bg-primary\\/3');
      expect(floatingElements).toHaveLength(2);
    });

    it('contains main content with proper z-index', () => {
      const mainContent = screen.getByText('Patrick').closest('.relative.z-10');
      expect(mainContent).toBeInTheDocument();
    });
  });

  describe('Header Content', () => {
    it('displays the correct tagline', () => {
      expect(screen.getByText('Focused on enterprise analytics & international solutions')).toBeInTheDocument();
    });

    it('renders Patrick Lehmann name with gradient styling', () => {
      expect(screen.getByText('Patrick')).toBeInTheDocument();
      const lehmannSpan = screen.getByText('Lehmann');
      expect(lehmannSpan).toBeInTheDocument();
      expect(lehmannSpan).toHaveClass('gradient-warm');
    });

    it('displays the correct job title', () => {
      expect(screen.getByText('Full-Stack Software Engineer')).toBeInTheDocument();
    });

    it('shows the experience description', () => {
      expect(screen.getByText('6+ years helping teams navigate technical changes and ship reliable software')).toBeInTheDocument();
    });

    it('includes animated pulse dot', () => {
      const pulseDot = document.querySelector('.animate-pulse');
      expect(pulseDot).toBeInTheDocument();
      expect(pulseDot).toHaveClass('w-2', 'h-2', 'bg-primary', 'rounded-full');
    });
  });

  describe('Tech Stack Section', () => {
    it('renders all tech stack items', () => {
      // Check tech names (unique)
      OG_PREVIEW_TECH_STACK.forEach((tech) => {
        expect(screen.getByText(tech.name)).toBeInTheDocument();
      });

      // Check years exist (may have duplicates)
      expect(screen.getByText('4+ years')).toBeInTheDocument(); // C#/.NET
      expect(screen.getAllByText('6+ years')).toHaveLength(2); // TypeScript and React
      expect(screen.getByText('2+ years')).toBeInTheDocument(); // Angular
    });

    it('displays tech stack with proper styling', () => {
      // Get tech stack containers specifically, not all text matching the pattern
      const techStackContainers = document.querySelectorAll('.bg-card\\/50');
      expect(techStackContainers).toHaveLength(4);

      techStackContainers.forEach((container) => {
        expect(container).toHaveClass('bg-card/50', 'border', 'border-border/30', 'rounded-lg');
      });
    });

    it('renders tech stack icons', () => {
      // Check that each tech item has an icon (SVG element)
      const techStackContainer = screen.getByText('C#/.NET').closest('.flex.items-center');
      const icon = techStackContainer?.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('uses consistent data from constants', () => {
      // Verify data consistency
      expect(screen.getByText('C#/.NET')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Angular')).toBeInTheDocument();

      // Verify years match constants
      expect(screen.getByText('4+ years')).toBeInTheDocument(); // C#/.NET
      expect(screen.getAllByText('6+ years')).toHaveLength(2); // TypeScript and React
      expect(screen.getByText('2+ years')).toBeInTheDocument(); // Angular
    });
  });

  describe('Contact Information', () => {
    it('displays website domain', () => {
      expect(screen.getByText('patricklehmann.io')).toBeInTheDocument();
    });

    it('displays contact email', () => {
      expect(screen.getByText('contact@patricklehmann.io')).toBeInTheDocument();
    });

    it('includes separator dot between contact items', () => {
      const separatorDot = document.querySelector('.w-1.h-1.bg-muted-foreground.rounded-full');
      expect(separatorDot).toBeInTheDocument();
    });

    it('has proper border styling for contact section', () => {
      const contactSection = screen.getByText('patricklehmann.io').closest('.border-t');
      expect(contactSection).toBeInTheDocument();
      expect(contactSection).toHaveClass('border-border/30');
    });
  });

  describe('Footer Elements', () => {
    it('displays tech stack attribution', () => {
      expect(screen.getByText('Built with Next.js • TypeScript • Tailwind CSS')).toBeInTheDocument();
    });

    it('positions footer text correctly', () => {
      const footer = screen.getByText('Built with Next.js • TypeScript • Tailwind CSS');
      expect(footer).toHaveClass('absolute', 'bottom-6', 'right-6', 'text-xs');
    });
  });

  describe('Layout and Responsiveness', () => {
    it('uses proper spacing and layout classes', () => {
      const mainContainer = screen.getByText('Patrick').closest('.space-y-8');
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass('max-w-4xl', 'mx-auto', 'px-12', 'text-center');
    });

    it('has proper overflow handling', () => {
      const rootContainer = screen.getByText('Patrick').closest('.w-\\[1200px\\]');
      expect(rootContainer).toHaveClass('overflow-hidden');
    });

    it('uses flexbox for centering', () => {
      const rootContainer = screen.getByText('Patrick').closest('.w-\\[1200px\\]');
      expect(rootContainer).toHaveClass('flex', 'items-center', 'justify-center');
    });
  });

  describe('Typography and Styling', () => {
    it('uses correct text sizes for hierarchy', () => {
      const name = screen.getByText('Patrick');
      expect(name).toHaveClass('text-6xl', 'font-bold', 'leading-tight');

      const title = screen.getByText('Full-Stack Software Engineer');
      expect(title).toHaveClass('text-3xl', 'font-light', 'text-muted-foreground');
    });

    it('applies proper color classes', () => {
      const tagline = screen.getByText('Focused on enterprise analytics & international solutions');
      expect(tagline).toHaveClass('text-primary', 'font-medium');
    });

    it('uses muted foreground for description text', () => {
      const description = screen.getByText('6+ years helping teams navigate technical changes and ship reliable software');
      expect(description).toHaveClass('text-muted-foreground');
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      // Check for proper heading structure (h1 equivalent)
      const mainHeading = screen.getByText('Patrick');
      expect(mainHeading.tagName).toBe('H1');
    });

    it('uses descriptive text content', () => {
      // Verify all text content is meaningful and descriptive
      expect(screen.getByText('Full-Stack Software Engineer')).toBeInTheDocument();
      expect(screen.getByText('Focused on enterprise analytics & international solutions')).toBeInTheDocument();
    });

    it('provides clear technology information', () => {
      // Each tech item should have name and experience level
      OG_PREVIEW_TECH_STACK.forEach((tech) => {
        expect(screen.getByText(tech.name)).toBeInTheDocument();
      });

      // Verify all expected years are present
      expect(screen.getByText('4+ years')).toBeInTheDocument(); // C#/.NET
      expect(screen.getAllByText('6+ years')).toHaveLength(2); // TypeScript and React
      expect(screen.getByText('2+ years')).toBeInTheDocument(); // Angular
    });
  });

  describe('Visual Design Elements', () => {
    it('includes backdrop blur effects', () => {
      const techStackItems = document.querySelectorAll('.backdrop-blur-sm');
      expect(techStackItems.length).toBeGreaterThan(0);
    });

    it('applies shadow effects', () => {
      const shadowElements = document.querySelectorAll('.shadow-warm');
      expect(shadowElements.length).toBeGreaterThan(0);
    });

    it('uses proper border radius', () => {
      const roundedElements = document.querySelectorAll('.rounded-lg, .rounded-full');
      expect(roundedElements.length).toBeGreaterThan(0);
    });
  });

  describe('Data Integration', () => {
    it('imports and uses constants correctly', () => {
      // Verify that the component uses imported constants
      expect(OG_PREVIEW_TECH_STACK).toBeDefined();
      expect(OG_PREVIEW_TECH_STACK).toHaveLength(4);

      // Verify each constant item is rendered
      OG_PREVIEW_TECH_STACK.forEach((tech) => {
        expect(screen.getByText(tech.name)).toBeInTheDocument();
      });
    });
  });
});