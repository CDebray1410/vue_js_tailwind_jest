module.exports = {
    // Indicate path of your templates
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
        colors: {
            'primaryColor': '#F24C4C',
            'secondaryColor': '#EC9B3B',
            'tercaryColor': '#F7D716',
            'lightSecondaryColor': '#7DA2BA',
            'lightSecondaryColorAdmin': '#FFB27D',
            'textColor1': '#141414',
            'textColor2': '#9A9A9A',
            'light': '#FEFEFE',
            'error': '#ba1422',
            'success': '#12b03c',
            'backgroundColor': '#293462',
            'gray': '#bbc2cc',
            'alertColor': '#E63946'
        },
        fontSize: {
            'xs': '.75rem',
            'sm': '.875rem',
            'tiny': '.875rem',
            'base': '1rem',
            'lg': '1.6rem',
            'xl': '2.1rem'
        }
    },
    plugins: [],
}