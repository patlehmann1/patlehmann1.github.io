import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TuiBoxProps {
  title: string;
  className?: string;
  children: ReactNode;
}

/**
 * Terminal UI style frame with the title set into the top border, like `┌─[ quick_stats ]──┐`.
 * The top edge is drawn as two line segments around the label so it works on any background.
 */
export function TuiBox({ title, className, children }: TuiBoxProps) {
  return (
    <div className={cn("border-2 border-t-0 border-foreground/40", className)}>
      <div className="flex items-center gap-2 -mx-[2px] -mt-2 text-xs leading-4 text-primary" aria-hidden="true">
        <span className="h-[2px] w-4 bg-foreground/40" />
        <span>[ {title.toLowerCase().replaceAll(" ", "_")} ]</span>
        <span className="h-[2px] flex-1 bg-foreground/40" />
      </div>
      <h4 className="sr-only">{title}</h4>
      <div className="p-4 sm:p-6 pt-3 sm:pt-4">{children}</div>
    </div>
  );
}
