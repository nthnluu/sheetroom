// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    theme: {
        extend: {
            colors: {
                light: 'rgba(255, 255, 255, 0.065)',
                frosted: 'rgba(255, 255, 255, 0.1)'
            },
            spacing: {
                ...defaultTheme.spacing,
                '86': '20rem',
                '99': '28.9rem'
            },
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            fontSize: {
                xs: '0.75rem',
                sm: '0.875rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
                '6xl': '4rem',
                '7xl': '5rem'
            },
        },
    },
    variants: {
        flex: ['responsive', 'group-hover'],
        visibility: ['responsive', 'group-hover']
    },
    plugins: [
        require('@tailwindcss/ui')
    ],
    experimental: {
        uniformColorPalette: true,
    },
    future: {
        removeDeprecatedGapUtilities: true,
    },
};
