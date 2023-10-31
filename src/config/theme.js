// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const breakpoints = {
    base: "0px",
    sm: "670px",
    md: "900px",
    lg: "1064px",
    xl: "1400px",
    "2xl": "1536px",
  };

const fontFamily = {
  montserrat : 'Montserrat',
  raleway : "Raleway"
}

// 3. extend the theme
const theme = extendTheme({ config, breakpoints, fontFamily })

export default theme