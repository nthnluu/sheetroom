// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    theme: {
        extend: {
            colors: {
                darkGray: '#323248',
                ...defaultTheme.colors
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [
        require('@tailwindcss/ui'),
    ]
}
