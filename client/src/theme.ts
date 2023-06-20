import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'radial-gradient(circle, transparent 20%, #ECF0F1 20%, #ECF0F1 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #ECF0F1 20%, #ECF0F1 80%, transparent 80%, transparent) 35px 35px, linear-gradient(#BDC3C7 2.8000000000000003px, transparent 2.8000000000000003px) 0 -1.4000000000000001px, linear-gradient(90deg, #BDC3C7 2.8000000000000003px, #ECF0F1 2.8000000000000003px) -1.4000000000000001px 0',
          backgroundColor: '#ECF0F1',
          backgroundSize: '70px 70px, 70px 70px, 35px 35px, 35px 35px',
        },
      }
    }
  }
});

export default theme;
