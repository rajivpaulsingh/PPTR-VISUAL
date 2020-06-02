1. npm init
2. npm install puppeteer jest jest-image-snapshot
3. npm install prettier
4. Created .prettierrc and add below to it:
    {
     "semi": false,
     "singleQuotes": true,
     "useTabs": true,
     "tabWidth": 2,
     "bracketSpacing": true,
     "arrowParens": "avoid",
     "trailingComma": "es5"
    }
5. Added node scripts to run the tests
6. Jest config setup for visual testing
7. Write tests for:
    - Full page snapshot comparison
    - Single element snapshot comparison
    - Mobile snapshot comparison
    - Tablet snapshot comparison    