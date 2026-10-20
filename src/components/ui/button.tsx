import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const variants = {
      default: "pixel-box pixel-box-raised bg-primary text-primary-foreground hover:bg-primary/90 active:translate-x-1 active:translate-y-1 active:pixel-box",
      secondary: "pixel-box pixel-box-raised bg-secondary text-secondary-foreground hover:bg-secondary/80 active:translate-x-1 active:translate-y-1 active:pixel-box",
      outline: "pixel-box bg-background hover:bg-accent hover:text-accent-foreground active:translate-x-0.5 active:translate-y-0.5",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-9 px-3",
      lg: "h-11 px-8 text-sm",
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center font-display text-xs leading-none transition-colors duration-100 focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-ring disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };