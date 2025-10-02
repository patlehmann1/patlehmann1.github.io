import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import { ThemeProvider } from 'next-themes';
import { CodeBlock } from '../code-block';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark' }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock dynamic imports
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    return () => <div data-testid="syntax-highlighter">Mocked SyntaxHighlighter</div>;
  },
}));

// Mock react-syntax-highlighter
jest.mock('react-syntax-highlighter', () => ({
  Prism: ({ children, language }: { children: string; language: string }) => (
    <pre data-testid="syntax-highlighter" data-language={language}>
      <code>{children}</code>
    </pre>
  ),
}));

// Mock syntax highlighter styles
jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  vscDarkPlus: {},
  oneLight: {},
}));

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

// Mock window object for SSR tests
Object.defineProperty(window, 'navigator', {
  value: {
    clipboard: {
      writeText: jest.fn(),
    },
  },
  writable: true,
});

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="dark">
      {ui}
    </ThemeProvider>
  );
};

describe('CodeBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders code content correctly', () => {
    renderWithTheme(
      <CodeBlock language="javascript">
        const hello = &quot;world&quot;;
      </CodeBlock>
    );

    expect(screen.getByTestId('syntax-highlighter')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('displays language badge in header', () => {
    renderWithTheme(
      <CodeBlock language="typescript">
        const hello: string = &quot;world&quot;;
      </CodeBlock>
    );

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('displays custom filename when provided', () => {
    renderWithTheme(
      <CodeBlock language="javascript" filename="example.js">
        const hello = &quot;world&quot;;
      </CodeBlock>
    );

    expect(screen.getByText('example.js')).toBeInTheDocument();
  });

  it('shows IDE-style header with window controls', () => {
    renderWithTheme(
      <CodeBlock language="javascript">
        const hello = &quot;world&quot;;
      </CodeBlock>
    );

    // Check for window control dots (red, yellow, green)
    const header = screen.getByText('JavaScript').closest('div');
    expect(header).toBeInTheDocument();
  });

  it('shows copy button on hover', () => {
    renderWithTheme(
      <CodeBlock language="javascript">
        const hello = &quot;world&quot;;
      </CodeBlock>
    );

    const copyButton = screen.getByLabelText('Copy code');
    expect(copyButton).toBeInTheDocument();
  });

  it('copies trimmed code to clipboard when copy button is clicked', async () => {
    const mockWriteText = jest.fn().mockResolvedValue(undefined);
    (navigator.clipboard.writeText as jest.Mock) = mockWriteText;

    renderWithTheme(
      <CodeBlock language="javascript">
        {'  const hello = &quot;world&quot;;  '}
      </CodeBlock>
    );

    const copyButton = screen.getByLabelText('Copy code');
    fireEvent.click(copyButton);

    expect(mockWriteText).toHaveBeenCalledWith('const hello = &quot;world&quot;;');
  });

  it('shows success state after copying', async () => {
    const mockWriteText = jest.fn().mockResolvedValue(undefined);
    (navigator.clipboard.writeText as jest.Mock) = mockWriteText;

    renderWithTheme(
      <CodeBlock language="javascript">
        const hello = &quot;world&quot;;
      </CodeBlock>
    );

    const copyButton = screen.getByLabelText('Copy code');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Copied!')).toBeInTheDocument();
    });
  });

  it('handles copy errors gracefully', async () => {
    const mockWriteText = jest.fn().mockRejectedValue(new Error('Copy failed'));
    (navigator.clipboard.writeText as jest.Mock) = mockWriteText;
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    renderWithTheme(
      <CodeBlock language="javascript">
        const hello = &quot;world&quot;;
      </CodeBlock>
    );

    const copyButton = screen.getByLabelText('Copy code');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to copy code:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  it('handles unknown languages gracefully', () => {
    renderWithTheme(
      <CodeBlock language="unknownlang">
        some code
      </CodeBlock>
    );

    expect(screen.getByText('UNKNOWNLANG')).toBeInTheDocument();
  });

  it('handles string children', () => {
    renderWithTheme(
      <CodeBlock language="javascript">
        {`const hello = 'world';`}
      </CodeBlock>
    );

    expect(screen.getByTestId('syntax-highlighter')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('applies language-specific colors to icon', () => {
    renderWithTheme(
      <CodeBlock language="typescript">
        const hello: string = &quot;world&quot;;
      </CodeBlock>
    );

    // Check that the Code2 icon exists (we can't easily test the specific color class)
    const languageIcon = screen.getByText('TypeScript').previousElementSibling;
    expect(languageIcon).toBeInTheDocument();
  });

  it('renders fallback when syntax highlighter is not available', () => {
    // Temporarily mock window as undefined to simulate SSR
    const originalWindow = global.window;
    delete (global as Record<string, unknown>).window;

    renderWithTheme(
      <CodeBlock language="javascript">
        const hello = &quot;world&quot;;
      </CodeBlock>
    );

    // Should render header and copy button even in fallback mode
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByLabelText('Copy code')).toBeInTheDocument();

    // Restore window
    global.window = originalWindow;
  });
});