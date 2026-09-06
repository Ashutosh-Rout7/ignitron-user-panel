/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "var(--navy)",
        "navy-2": "var(--navy-2)",
        orange: "var(--orange)",
        "orange-hover": "var(--orange-hover)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
        "gradient-orange": "var(--gradient-orange)",
        "gradient-blue": "var(--gradient-blue)",
        "gradient-purple": "var(--gradient-purple)",
        "gradient-green": "var(--gradient-green)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        "glow-orange": "var(--shadow-glow-orange)",
      },
    },
  },
  plugins: [],
}