// Tailwind v4 é "CSS-first", mas o shadcn/ui CLI ainda costuma
// depender da presença do tailwind.config.* para autodetecção.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: any = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
