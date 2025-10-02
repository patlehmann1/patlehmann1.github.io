import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { TextToSpeech } from '../text-to-speech';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { BlogPost } from '@/lib/types';

jest.mock('@/hooks/useTextToSpeech');

const mockUseTextToSpeech = useTextToSpeech as jest.MockedFunction<typeof useTextToSpeech>;

describe('TextToSpeech', () => {
  const mockSpeak = jest.fn();
  const mockPause = jest.fn();
  const mockResume = jest.fn();
  const mockStop = jest.fn();
  const mockSetSpeed = jest.fn();
  const mockSetPitch = jest.fn();
  const mockSetVoice = jest.fn();

  const mockVoices = [
    { voiceURI: 'voice1', name: 'Voice 1', lang: 'en-US', default: true, localService: true },
    { voiceURI: 'voice2', name: 'Voice 2', lang: 'en-GB', default: false, localService: true },
  ] as SpeechSynthesisVoice[];

  const defaultMockReturn = {
    isSupported: true,
    isSpeaking: false,
    isPaused: false,
    speed: 1,
    pitch: 1,
    voices: mockVoices,
    selectedVoice: null,
    speak: mockSpeak,
    pause: mockPause,
    resume: mockResume,
    stop: mockStop,
    setSpeed: mockSetSpeed,
    setPitch: mockSetPitch,
    setVoice: mockSetVoice,
  };

  const mockPost: BlogPost = {
    slug: 'test-post' as unknown as BlogPost['slug'],
    title: 'Test Post',
    description: 'Test description',
    content: 'Test content',
    publishedAt: '2025-01-01',
    tags: ['test'],
    readingTime: 5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTextToSpeech.mockReturnValue(defaultMockReturn);
  });

  it('should render Listen button when not speaking', () => {
    render(<TextToSpeech post={mockPost} />);

    expect(screen.getByLabelText('Play')).toBeInTheDocument();
  });

  it('should show unsupported message when browser does not support TTS', () => {
    mockUseTextToSpeech.mockReturnValue({
      ...defaultMockReturn,
      isSupported: false,
    });

    render(<TextToSpeech post={mockPost} />);

    expect(screen.getByText(/Text-to-speech not supported/i)).toBeInTheDocument();
  });

  it('should call speak with processed content when play is clicked', () => {
    const postWithContent: BlogPost = {
      ...mockPost,
      content: '# Heading\n\nSome **bold** text',
    };
    render(<TextToSpeech post={postWithContent} />);

    const playButton = screen.getByLabelText('Play');
    fireEvent.click(playButton);

    expect(mockSpeak).toHaveBeenCalledWith(expect.stringContaining('Heading'));
    expect(mockSpeak).toHaveBeenCalledWith(expect.stringContaining('bold text'));
  });

  it('should show Pause button when speaking', () => {
    mockUseTextToSpeech.mockReturnValue({
      ...defaultMockReturn,
      isSpeaking: true,
      isPaused: false,
    });

    render(<TextToSpeech post={mockPost} />);

    expect(screen.getByLabelText('Pause')).toBeInTheDocument();
  });

  it('should call pause when Pause button is clicked', () => {
    mockUseTextToSpeech.mockReturnValue({
      ...defaultMockReturn,
      isSpeaking: true,
      isPaused: false,
    });

    render(<TextToSpeech post={mockPost} />);

    const pauseButton = screen.getByLabelText('Pause');
    fireEvent.click(pauseButton);

    expect(mockPause).toHaveBeenCalledTimes(1);
  });

  it('should call resume when paused and play button is clicked', () => {
    mockUseTextToSpeech.mockReturnValue({
      ...defaultMockReturn,
      isSpeaking: true,
      isPaused: true,
    });

    render(<TextToSpeech post={mockPost} />);

    const playButton = screen.getByLabelText('Play');
    fireEvent.click(playButton);

    expect(mockResume).toHaveBeenCalledTimes(1);
  });

  it('should show Stop button when speaking', () => {
    mockUseTextToSpeech.mockReturnValue({
      ...defaultMockReturn,
      isSpeaking: true,
    });

    render(<TextToSpeech post={mockPost} />);

    expect(screen.getByLabelText('Stop')).toBeInTheDocument();
  });

  it('should call stop when Stop button is clicked', () => {
    mockUseTextToSpeech.mockReturnValue({
      ...defaultMockReturn,
      isSpeaking: true,
    });

    render(<TextToSpeech post={mockPost} />);

    const stopButton = screen.getByLabelText('Stop');
    fireEvent.click(stopButton);

    expect(mockStop).toHaveBeenCalledTimes(1);
  });

  it('should cycle through speeds when speed button is clicked', () => {
    render(<TextToSpeech post={mockPost} />);

    const speedButton = screen.getByLabelText('Speed: 1x');
    fireEvent.click(speedButton);

    expect(mockSetSpeed).toHaveBeenCalledWith(1.25);
  });

  it('should display current speed', () => {
    mockUseTextToSpeech.mockReturnValue({
      ...defaultMockReturn,
      speed: 1.5,
    });

    render(<TextToSpeech post={mockPost} />);

    expect(screen.getByLabelText('Speed: 1.5x')).toBeInTheDocument();
  });

  it('should strip code blocks from markdown', () => {
    const postWithCode: BlogPost = {
      ...mockPost,
      content: '# Title\n\n```javascript\nconst x = 1;\n```\n\nSome text',
    };
    render(<TextToSpeech post={postWithCode} />);

    const playButton = screen.getByLabelText('Play');
    fireEvent.click(playButton);

    const calledText = mockSpeak.mock.calls[0][0];
    expect(calledText).not.toContain('const x = 1');
    expect(calledText).toContain('Title');
    expect(calledText).toContain('Some text');
  });

  it('should strip inline code from markdown', () => {
    const postWithInlineCode: BlogPost = {
      ...mockPost,
      content: 'Use `console.log()` to debug',
    };
    render(<TextToSpeech post={postWithInlineCode} />);

    const playButton = screen.getByLabelText('Play');
    fireEvent.click(playButton);

    const calledText = mockSpeak.mock.calls[0][0];
    expect(calledText).toContain('Use');
    expect(calledText).toContain('to debug');
  });

  it('should strip links from markdown', () => {
    const postWithLinks: BlogPost = {
      ...mockPost,
      content: 'Check out [my website](https://example.com)',
    };
    render(<TextToSpeech post={postWithLinks} />);

    const playButton = screen.getByLabelText('Play');
    fireEvent.click(playButton);

    const calledText = mockSpeak.mock.calls[0][0];
    expect(calledText).toContain('my website');
    expect(calledText).not.toContain('https://example.com');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <TextToSpeech post={mockPost} className="custom-class" />
    );

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('should use ttsContent when provided', () => {
    const postWithTtsContent: BlogPost = {
      ...mockPost,
      content: 'Regular content with C#',
      ttsContent: 'TTS-specific content with C sharp',
    };
    render(<TextToSpeech post={postWithTtsContent} />);

    const playButton = screen.getByLabelText('Play');
    fireEvent.click(playButton);

    const calledText = mockSpeak.mock.calls[0][0];
    expect(calledText).toContain('TTS-specific');
    expect(calledText).toContain('C sharp');
  });

  it('should preprocess technical terms automatically', () => {
    const postWithTechTerms: BlogPost = {
      ...mockPost,
      content: 'Working with C# at homes.com using TypeScript',
    };
    render(<TextToSpeech post={postWithTechTerms} />);

    const playButton = screen.getByLabelText('Play');
    fireEvent.click(playButton);

    const calledText = mockSpeak.mock.calls[0][0];
    expect(calledText).toContain('C sharp');
    expect(calledText).toContain('homes dot com');
    expect(calledText).toContain('type script');
  });

  it('should toggle settings panel when settings button is clicked', () => {
    render(<TextToSpeech post={mockPost} />);

    const settingsButton = screen.getByLabelText('Voice settings');
    fireEvent.click(settingsButton);

    expect(screen.getByLabelText('Voice')).toBeInTheDocument();
    expect(screen.getByLabelText(/Pitch:/)).toBeInTheDocument();
  });

  it('should render voice options in dropdown', () => {
    render(<TextToSpeech post={mockPost} />);

    const settingsButton = screen.getByLabelText('Voice settings');
    fireEvent.click(settingsButton);

    const voiceSelect = screen.getByLabelText('Voice') as HTMLSelectElement;
    expect(voiceSelect.options).toHaveLength(3);
    expect(voiceSelect.options[1].textContent).toContain('Voice 1');
    expect(voiceSelect.options[2].textContent).toContain('Voice 2');
  });

  it('should call setVoice when voice is selected', () => {
    render(<TextToSpeech post={mockPost} />);

    const settingsButton = screen.getByLabelText('Voice settings');
    fireEvent.click(settingsButton);

    const voiceSelect = screen.getByLabelText('Voice');
    fireEvent.change(voiceSelect, { target: { value: 'voice1' } });

    expect(mockSetVoice).toHaveBeenCalledWith(mockVoices[0]);
  });

  it('should call setPitch when pitch slider changes', () => {
    render(<TextToSpeech post={mockPost} />);

    const settingsButton = screen.getByLabelText('Voice settings');
    fireEvent.click(settingsButton);

    const pitchSlider = screen.getByLabelText(/Pitch:/);
    fireEvent.change(pitchSlider, { target: { value: '1.5' } });

    expect(mockSetPitch).toHaveBeenCalledWith(1.5);
  });

  it('should display current pitch value', () => {
    mockUseTextToSpeech.mockReturnValue({
      ...defaultMockReturn,
      pitch: 1.7,
    });

    render(<TextToSpeech post={mockPost} />);

    const settingsButton = screen.getByLabelText('Voice settings');
    fireEvent.click(settingsButton);

    expect(screen.getByText(/Pitch: 1\.7/)).toBeInTheDocument();
  });
});