import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CodeBlock } from '../code-block';

Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('CodeBlock', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders code content correctly', () => {
    render(
      <CodeBlock language="javascript">
        const hello = "world";
      </CodeBlock>
    );

    expect(screen.getByText('const hello = "world";')).toBeInTheDocument();
  });

  it('shows copy button on hover', () => {
    render(
      <CodeBlock language="javascript">
        const hello = "world";
      </CodeBlock>
    );

    const copyButton = screen.getByLabelText('Copy code');
    expect(copyButton).toBeInTheDocument();
  });

  it('copies code to clipboard when copy button is clicked', async () => {
    const mockWriteText = jest.fn().mockResolvedValue(undefined);
    (navigator.clipboard.writeText as jest.Mock) = mockWriteText;

    render(
      <CodeBlock language="javascript">
        const hello = "world";
      </CodeBlock>
    );

    const copyButton = screen.getByLabelText('Copy code');
    fireEvent.click(copyButton);

    expect(mockWriteText).toHaveBeenCalledWith('const hello = "world";');
  });

  it('shows success state after copying', async () => {
    const mockWriteText = jest.fn().mockResolvedValue(undefined);
    (navigator.clipboard.writeText as jest.Mock) = mockWriteText;

    render(
      <CodeBlock language="javascript">
        const hello = "world";
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

    render(
      <CodeBlock language="javascript">
        const hello = "world";
      </CodeBlock>
    );

    const copyButton = screen.getByLabelText('Copy code');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to copy code:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  it('applies custom className', () => {
    render(
      <CodeBlock className="custom-class" language="javascript">
        const hello = "world";
      </CodeBlock>
    );

    const preElement = screen.getByText('const hello = "world";').closest('pre');
    expect(preElement).toHaveClass('custom-class');
  });

  it('handles string children', () => {
    render(
      <CodeBlock language="javascript">
        {"const hello = 'world';"}
      </CodeBlock>
    );

    expect(screen.getByText("const hello = 'world';")).toBeInTheDocument();
  });
});