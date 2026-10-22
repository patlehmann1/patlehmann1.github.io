import { render, screen, fireEvent } from "@testing-library/react";
import { MusicToggle } from "../music-toggle";

const player = { start: jest.fn(), stop: jest.fn() };

jest.mock("@/lib/chiptune", () => ({
  createLofiPlayer: () => player,
}));

describe("MusicToggle", () => {
  beforeEach(() => {
    player.start.mockClear();
    player.stop.mockClear();
  });

  it("starts silent", () => {
    render(<MusicToggle />);
    const button = screen.getByRole("button", { name: "Play lo-fi music" });
    expect(button).toHaveAttribute("aria-pressed", "false");
    expect(player.start).not.toHaveBeenCalled();
  });

  it("plays and stops on click", () => {
    render(<MusicToggle />);

    fireEvent.click(screen.getByRole("button", { name: "Play lo-fi music" }));
    expect(player.start).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Stop lo-fi music" })).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: "Stop lo-fi music" }));
    expect(player.stop).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Play lo-fi music" })).toBeInTheDocument();
  });

  it("stops the music when unmounted", () => {
    const { unmount } = render(<MusicToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Play lo-fi music" }));
    unmount();
    expect(player.stop).toHaveBeenCalledTimes(1);
  });
});
