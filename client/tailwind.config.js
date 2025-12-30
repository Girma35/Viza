/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                midnight: '#050505',
                brand: {
                    cream: '#fdf2d0',     /* Soft Vanilla */
                    pearl: '#fffef2',     /* Pearl White */
                    sky: '#b9d7fb',       /* Sky Blue */
                    ocean: '#84a5ff',     /* Electric Blue */
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                mono: ['var(--font-jetbrains-mono)', 'monospace'],
            },
        }
    },
    plugins: [],
}
