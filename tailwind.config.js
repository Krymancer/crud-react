/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}',
    ],
    theme: {
        extend: {
            colors: {
                primary: 'rgb(0, 123, 255)',
                secondary: 'rgb(108, 117, 125)',
                success: 'rgb(40, 167, 69)',
                danger: 'rgb(220, 53, 69)',
                warning: 'rgb(255, 193, 7)',
                info: 'rgb(23, 162, 184)',
                light: 'rgb(248, 249, 250)',
                dark: 'rgb(52, 58, 64)',
                white: 'rgb(255, 255, 255)',
            },
        },
    },
    plugins: [],
};
