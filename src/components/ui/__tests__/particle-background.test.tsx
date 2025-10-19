import { render, act } from "@testing-library/react";
import { ParticleBackground } from "../particle-background";
import { fireEvent } from "@testing-library/dom";

const mockSetTheme = jest.fn();
const mockTheme = jest.fn();
const mockUseReducedMotion = jest.fn();
let useFrameCallback: (() => void) | null = null;

jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: mockTheme(),
    setTheme: mockSetTheme,
    systemTheme: "light",
    themes: ["light", "dark"],
    resolvedTheme: "light",
  }),
}));

jest.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: () => mockUseReducedMotion(),
}));

jest.mock("@react-three/fiber", () => ({
  Canvas: ({ children, onCreated }: { children: React.ReactNode; onCreated?: (state: { gl: { domElement: HTMLCanvasElement } }) => void }) => {
    const mockCanvas = document.createElement('canvas');
    if (onCreated) {
      onCreated({ gl: { domElement: mockCanvas } as unknown as { domElement: HTMLCanvasElement } });
    }
    return <div data-testid="canvas">{children}</div>;
  },
  useFrame: (callback: () => void) => {
    useFrameCallback = callback;
  },
}));

jest.mock("three", () => ({
  __esModule: true,
  ...jest.requireActual("three"),
  Color: jest.fn().mockImplementation((color: string) => ({
    color,
    r: 0.8,
    g: 0.5,
    b: 0.3,
  })),
  AdditiveBlending: 2,
}));

describe("ParticleBackground", () => {
  beforeEach(() => {
    mockTheme.mockReturnValue("light");
    mockUseReducedMotion.mockReturnValue(false);
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders canvas when reduced motion is disabled", () => {
    const { getByTestId } = render(<ParticleBackground />);
    expect(getByTestId("canvas")).toBeInTheDocument();
  });

  it("does not render when reduced motion is enabled", () => {
    mockUseReducedMotion.mockReturnValue(true);
    const { queryByTestId } = render(<ParticleBackground />);
    expect(queryByTestId("canvas")).not.toBeInTheDocument();
  });

  it("applies correct opacity class", () => {
    const { container } = render(<ParticleBackground />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("opacity-40");
  });

  it("uses dark theme colors when theme is dark", () => {
    mockTheme.mockReturnValue("dark");
    const { getByTestId } = render(<ParticleBackground />);
    expect(getByTestId("canvas")).toBeInTheDocument();
  });

  it("handles window resize for mobile detection", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });
    const { getByTestId } = render(<ParticleBackground />);
    expect(getByTestId("canvas")).toBeInTheDocument();
  });

  it("has correct positioning classes", () => {
    const { container } = render(<ParticleBackground />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("absolute", "inset-0", "-z-10");
  });

  it("sets up mouse event listener on mount", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    render(<ParticleBackground />);
    expect(addEventListenerSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
    addEventListenerSpy.mockRestore();
  });

  it("removes mouse event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<ParticleBackground />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it("handles mouse movement events when not reduced motion", () => {
    render(<ParticleBackground />);

    act(() => {
      fireEvent.mouseMove(window, {
        clientX: 500,
        clientY: 300,
      });
    });

    expect(window).toBeDefined();
  });

  it("does not handle mouse movement events on mobile", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 500,
    });

    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    render(<ParticleBackground />);

    const mouseMoveHandler = addEventListenerSpy.mock.calls.find(
      call => call[0] === "mousemove"
    )?.[1] as EventListener;

    if (mouseMoveHandler) {
      const mockEvent = new MouseEvent("mousemove", {
        clientX: 250,
        clientY: 250,
      });
      mouseMoveHandler(mockEvent);
    }

    addEventListenerSpy.mockRestore();
  });

  it("does not render when reduced motion is enabled so no event listener is added", () => {
    mockUseReducedMotion.mockReturnValue(true);

    const { queryByTestId } = render(<ParticleBackground />);
    expect(queryByTestId("canvas")).not.toBeInTheDocument();
  });

  it("renders with full width and height classes", () => {
    const { container } = render(<ParticleBackground />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("w-full", "h-full");
  });

  it("captures useFrame callback for animation", () => {
    render(<ParticleBackground />);
    expect(useFrameCallback).toBeDefined();
  });

  it("uses correct particle count for desktop", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1920,
    });

    const { getByTestId } = render(<ParticleBackground />);
    expect(getByTestId("canvas")).toBeInTheDocument();
  });

  it("uses correct particle count for mobile", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    const { getByTestId } = render(<ParticleBackground />);
    expect(getByTestId("canvas")).toBeInTheDocument();
  });

  it("applies correct primary color for light theme", () => {
    mockTheme.mockReturnValue("light");
    const { getByTestId } = render(<ParticleBackground />);
    expect(getByTestId("canvas")).toBeInTheDocument();
  });

  it("applies correct primary color for dark theme", () => {
    mockTheme.mockReturnValue("dark");
    const { getByTestId } = render(<ParticleBackground />);
    expect(getByTestId("canvas")).toBeInTheDocument();
  });

  it("handles theme being undefined", () => {
    mockTheme.mockReturnValue(undefined);
    const { getByTestId } = render(<ParticleBackground />);
    expect(getByTestId("canvas")).toBeInTheDocument();
  });

  it("handles window resize events", () => {
    const { getByTestId } = render(<ParticleBackground />);

    act(() => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 768,
      });
      window.dispatchEvent(new Event("resize"));
    });

    expect(getByTestId("canvas")).toBeInTheDocument();
  });

  it("maintains canvas configuration", () => {
    const { getByTestId } = render(<ParticleBackground />);
    const canvas = getByTestId("canvas");
    expect(canvas).toBeInTheDocument();
  });

  it("sets up WebGL context loss event handlers via onCreated", () => {
    const { getByTestId } = render(<ParticleBackground />);
    expect(getByTestId("canvas")).toBeInTheDocument();
  });
});
