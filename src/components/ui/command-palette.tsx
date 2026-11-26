"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Search } from "@/components/ui/icons/pixel";
import { Button } from "@/components/ui/button";
import { TuiBox } from "@/components/ui/tui-box";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { buildCommands, Command, filterCommands, PostSummary } from "@/lib/commands";
import { cn } from "@/lib/utils";

const OPEN_EVENT = "open-command-palette";

export function CommandPaletteTrigger() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className="w-9 h-9 p-0 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
      aria-label="Open command palette"
      title="Command palette (Ctrl+K)"
    >
      <Search className="h-4 w-4 text-primary" />
    </Button>
  );
}

export function CommandPalette({ posts }: { posts: PostSummary[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [output, setOutput] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const listId = useId();
  const { setTheme } = useTheme();
  const scrollToSection = useScrollToSection();

  const commands = useMemo(() => buildCommands(posts), [posts]);
  const results = useMemo(() => filterCommands(commands, query), [commands, query]);

  useEffect(() => {
    function show() {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      setOpen(true);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) setOpen(false);
        else show();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(OPEN_EVENT, show);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(OPEN_EVENT, show);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      return;
    }
    setQuery("");
    setOutput(null);
    setActiveIndex(0);
    returnFocusRef.current?.focus();
  }, [open]);

  function run(command: Command) {
    const { action } = command;
    if (action.type === "print") {
      setOutput(action.text);
      return;
    }

    setOpen(false);
    if (action.type === "navigate") scrollToSection(action.href);
    else if (action.type === "theme") setTheme(action.value);
    else if (action.href.startsWith("mailto:")) window.location.href = action.href;
    else window.open(action.href, "_blank", "noopener,noreferrer");
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      run(results[activeIndex]);
    }
  }

  if (!open) return null;

  const activeId = results[activeIndex] ? `${listId}-${results[activeIndex].id}` : undefined;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-background/70 backdrop-blur-sm px-4 pt-[15vh]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div role="dialog" aria-modal="true" aria-label="Command palette" className="w-full max-w-xl bg-popover text-popover-foreground shadow-lg p-3 pt-5">
        <TuiBox title="Command Palette">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-primary" aria-hidden="true">&gt;</span>
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
                setOutput(null);
              }}
              onKeyDown={handleInputKeyDown}
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-activedescendant={activeId}
              aria-autocomplete="list"
              aria-label="Type a command"
              placeholder="type a command..."
              spellCheck={false}
              autoComplete="off"
              className="flex-1 min-w-0 bg-transparent text-base sm:text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          {output && (
            <p className="mt-3 text-sm text-muted-foreground" role="status">
              {output}
            </p>
          )}

          <ul id={listId} role="listbox" aria-label="Commands" className="mt-3 max-h-[50vh] overflow-y-auto overflow-x-hidden text-sm">
            {results.map((command, index) => (
              <li
                key={command.id}
                id={`${listId}-${command.id}`}
                role="option"
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => run(command)}
                className={cn(
                  "flex cursor-pointer items-baseline justify-between gap-4 px-2 py-1.5",
                  index === activeIndex && "bg-primary/15 text-primary"
                )}
              >
                <span className="min-w-0 truncate">{command.name}</span>
                <span className="hidden sm:block min-w-0 max-w-[50%] truncate text-xs text-muted-foreground">{command.description}</span>
              </li>
            ))}
          </ul>
          {results.length === 0 && (
            <p className="px-2 py-1.5 text-sm text-muted-foreground">command not found: {query.trim()}</p>
          )}

          <p className="mt-3 text-xs text-muted-foreground" aria-hidden="true">
            ↑↓ select · enter run · esc close
          </p>
        </TuiBox>
      </div>
    </div>
  );
}
