import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(', '),
  },
  palette: {
    primary: {
      light: '#b2dfdb',
      main: '#80cbc4',
      dark: '#4db6ac'
    },
    secondary: {
      light: '#f06292',
      main: '#ec407a',
      dark: '#e91e63'
    }
  },
  overrides: {
    MuiCard: {
      root: {
        marginTop: 16,
        marginBottom: 16,
      }
    },
    MuiCardContent: {
      root: {
        padding: 8,
        '&:last-child': {
          paddingBottom: 8
        }
      }
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
