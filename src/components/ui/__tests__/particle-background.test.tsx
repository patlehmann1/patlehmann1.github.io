import { render } from "@testing-library/react";
import { ParticleBackground } from "../particle-background";

const mockSetTheme = jest.fn();
const mockTheme = jest.fn();
const mockUseReducedMotion = jest.fn();

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
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="canvas">{children}</div>,
  useFrame: jest.fn(),
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
});
