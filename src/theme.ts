import { createTheme, ThemeOptions } from '@mui/material/styles'
import { COLORS } from './constants/Colors'
import { TEXT } from './constants/Text'

declare module '@mui/material/styles' {
  interface Palette {
    gradient?: {
      main: string
      contrastText: string
    }
    tertiary?: {
      main: string
      contrastText: string
    }
  }
  interface PaletteOptions {
    gradient?: {
      main: string
      contrastText: string
    }
    tertiary?: {
      main: string
      contrastText: string
    }
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    gradient: true
    tertiary: true
  }
}

const generateType = (token: any) => ({
  ...token,
  letterSpacing: `${token.letterSpacing}`,
})

const typography = {
  h1: generateType(TEXT.DISPLAY_2_XL_BOLD),
  h2: generateType(TEXT.DISPLAY_XL_SEMIBOLD),
  h3: generateType(TEXT.DISPLAY_LG_SEMIBOLD),
  h4: generateType(TEXT.DISPLAY_MD_MEDIUM),
  h5: generateType(TEXT.DISPLAY_SM_MEDIUM),
  h6: generateType(TEXT.DISPLAY_XS_MEDIUM),
  subtitle1: generateType(TEXT.TEXT_MD_NORMAL),
  subtitle2: generateType(TEXT.TEXT_SM_MEDIUM),
  body1: generateType(TEXT.TEXT_MD_NORMAL),
  body2: generateType(TEXT.TEXT_SM_NORMAL),
  button: generateType(TEXT.TEXT_SM_MEDIUM),
  caption: generateType(TEXT.TEXT_XS_NORMAL),
  overline: generateType(TEXT.TEXT_XS_NORMAL),
}

const customTheme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  typography,
  palette: {
    common: {
      black: COLORS.BASE_BLACK,
      white: COLORS.BASE_WHITE,
    },
    type: 'dark',
    primary: {
      '25': COLORS.PRIMARY_25,
      '50': COLORS.PRIMARY_50,
      '100': COLORS.PRIMARY_100,
      '200': COLORS.PRIMARY_200,
      '300': COLORS.PRIMARY_300,
      '400': COLORS.PRIMARY_400,
      '500': COLORS.PRIMARY_500,
      '600': COLORS.PRIMARY_600,
      '700': COLORS.PRIMARY_700,
      '800': COLORS.PRIMARY_800,
      '900': COLORS.PRIMARY_900,
      light: COLORS.PRIMARY_200,
      main: COLORS.PRIMARY_500,
      dark: COLORS.PRIMARY_700,
      contrastText: COLORS.BASE_WHITE,
    },
    secondary: {
      '25': COLORS.SECONDARY_25,
      '50': COLORS.SECONDARY_50,
      '100': COLORS.SECONDARY_100,
      '200': COLORS.SECONDARY_200,
      '300': COLORS.SECONDARY_300,
      '400': COLORS.SECONDARY_400,
      '500': COLORS.SECONDARY_500,
      '600': COLORS.SECONDARY_600,
      '700': COLORS.SECONDARY_700,
      '800': COLORS.SECONDARY_800,
      '900': COLORS.SECONDARY_900,
      light: COLORS.SECONDARY_200,
      main: COLORS.SECONDARY_500,
      dark: COLORS.SECONDARY_700,
      contrastText: COLORS.BASE_WHITE,
    },
    error: {
      '25': COLORS.ERROR_25,
      '50': COLORS.ERROR_50,
      '100': COLORS.ERROR_100,
      '200': COLORS.ERROR_200,
      '300': COLORS.ERROR_300,
      '400': COLORS.ERROR_400,
      '500': COLORS.ERROR_500,
      '600': COLORS.ERROR_600,
      '700': COLORS.ERROR_700,
      '800': COLORS.ERROR_800,
      '900': COLORS.ERROR_900,
      light: COLORS.ERROR_200,
      main: COLORS.ERROR_500,
      dark: COLORS.ERROR_700,
      contrastText: COLORS.BASE_WHITE,
    },
    warning: {
      '25': COLORS.WARNING_25,
      '50': COLORS.WARNING_50,
      '100': COLORS.WARNING_100,
      '200': COLORS.WARNING_200,
      '300': COLORS.WARNING_300,
      '400': COLORS.WARNING_400,
      '500': COLORS.WARNING_500,
      '600': COLORS.WARNING_600,
      '700': COLORS.WARNING_700,
      '800': COLORS.WARNING_800,
      '900': COLORS.WARNING_900,
      light: COLORS.WARNING_200,
      main: COLORS.WARNING_500,
      dark: COLORS.WARNING_700,
      contrastText: COLORS.BASE_WHITE,
    },
    info: {
      light: COLORS.INFO_200,
      main: COLORS.INFO_500,
      dark: COLORS.INFO_700,
      contrastText: COLORS.BASE_WHITE,
    },
    success: {
      '25': COLORS.SUCCESS_25,
      '50': COLORS.SUCCESS_50,
      '100': COLORS.SUCCESS_100,
      '200': COLORS.SUCCESS_200,
      '300': COLORS.SUCCESS_300,
      '400': COLORS.SUCCESS_400,
      '500': COLORS.SUCCESS_500,
      '600': COLORS.SUCCESS_600,
      '700': COLORS.SUCCESS_700,
      '800': COLORS.SUCCESS_800,
      '900': COLORS.SUCCESS_900,
      light: COLORS.SUCCESS_200,
      main: COLORS.SUCCESS_500,
      dark: COLORS.SUCCESS_700,
      contrastText: COLORS.BASE_WHITE,
    },
    grey: {
      '25': COLORS.GRAY_25,
      '50': COLORS.GRAY_50,
      '100': COLORS.GRAY_100,
      '200': COLORS.GRAY_200,
      '300': COLORS.GRAY_300,
      '400': COLORS.GRAY_400,
      '500': COLORS.GRAY_500,
      '600': COLORS.GRAY_600,
      '700': COLORS.GRAY_700,
      '800': COLORS.GRAY_800,
      '900': COLORS.GRAY_900,
      A100: COLORS.GRAY_100,
      A200: COLORS.GRAY_200,
      A400: COLORS.GRAY_400,
      A700: COLORS.GRAY_700,
    },
    text: {
      primary: COLORS.GRAY_700,
      secondary: COLORS.GRAY_600,
      disabled: COLORS.GRAY_400,
      hint: COLORS.GRAY_500,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          lineHeight: 1.5,
          color: 'white',
          textTransform: 'none',
          borderRadius: '100px',
        },
        contained: {
          color: COLORS.BASE_WHITE,
          backgroundColor: COLORS.PRIMARY_600,
        },
        containedPrimary: {},
        containedSecondary: {},
        outlined: {
          color: COLORS.GRAY_600,
          borderColor: COLORS.GRAY_300,
        },
        outlinedPrimary: {},
        outlinedSecondary: {},
        text: {},
      },
    },
  },
}

const theme = createTheme(customTheme as ThemeOptions)

export { theme, customTheme }
