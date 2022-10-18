import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@mui/material/styles";

const customTheme = {
    typography: {
        fontFamily: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      },
  palette: {
    primary: {
      main: "#07939C",
    },
    // secondary: {
    //   light: "",
    //   main: "",
    //   dark: "",
    // },
    text: {
      primary: '#101828',
      secondary: '#667085',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '100px',
          height: '40px',
          textTransform: 'none',
        },
        contained: {},
        containedPrimary: {},
        containedSecondary: {},
        outlined: {},
        outlinedPrimary: {},
        outlinedSecondary: {},
        text: {},
      },
    },
  }
};

const theme = createTheme(customTheme as ThemeOptions);

export { theme, customTheme };
