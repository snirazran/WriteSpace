import {
  Box,
  Container,
  CSSReset,
  ThemeProvider,
  extendTheme,
} from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import '@fontsource/nunito/300.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/500.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/700.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/rubik/400.css';
import '@fontsource/rubik/500.css';
import '@fontsource/rubik/600.css';
import '@fontsource/rubik/700.css';

export const theme = extendTheme({
  styles: {
    global: (props) => ({
      '*': {
        boxSizing: 'border-box',
      },
      body: {
        margin: 0,
        fontFamily: 'Nunito, Rubik',
      },
    }),
  },
  colors: {
    mainColor: '#e76f51',
    secondaryColor: '#f4a261',
    yellow: '#e9c46a',
    green: '#2a9d8f',
    blue: '#264653',
    gray: '#919191',
    lightGray: '#bfbfbf',
  },
});
