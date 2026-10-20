/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      none: "0",
      sm: "0",
      DEFAULT: "0",
      md: "0",
      lg: "0",
      xl: "0",
      "2xl": "0",
      "3xl": "0",
      full: "0",
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "monospace"],
        pixel: ["var(--font-pixel)", "monospace"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderWidth: {
        DEFAULT: "2px",
      },
      boxShadow: {
        sm: "2px 2px 0 0 hsl(var(--foreground) / 0.2)",
        DEFAULT: "3px 3px 0 0 hsl(var(--foreground) / 0.2)",
        md: "4px 4px 0 0 hsl(var(--foreground) / 0.2)",
        lg: "6px 6px 0 0 hsl(var(--foreground) / 0.25)",
        xl: "8px 8px 0 0 hsl(var(--foreground) / 0.25)",
        "2xl": "12px 12px 0 0 hsl(var(--foreground) / 0.25)",
      },
      fontWeight: {
        '350': '350',
        '450': '450',
        '550': '550',
        '650': '650',
        '750': '750',
      },
      letterSpacing: {
        'tighter': '-0.02em',
        'micro': '0.01em',
        'wide': '0.05em',
        'ultra-wide': '0.15em',
      },
      lineHeight: {
        'super-tight': '0.9',
        'tight-plus': '1.1',
        'relaxed-plus': '1.7',
        'comfortable': '1.4',
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
    },
  },
  plugins: [],
};