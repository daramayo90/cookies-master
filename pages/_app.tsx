import '../styles/globals.css';

import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';

import Cookies from 'js-cookie';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { darkTheme, lightTheme, customTheme } from '../themes';

interface Props extends AppProps {
  theme: string;
}

// ...rest: The other arguments that came in the ServerSideProps
function MyApp({ Component, pageProps, theme = 'dark' }: Props) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light';
    const selectedTheme =
      cookieTheme === 'light' ? lightTheme : cookieTheme === 'dark' ? darkTheme : customTheme;

    setCurrentTheme(selectedTheme);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

/*
MyApp.getInitialProps = async (appContext: AppContext) => {
  const { theme } = appContext.ctx.req ? (appContext.ctx.req as any).cookies : { theme: 'light' };

  const validThemes = ['light', 'dark', 'custom'];

  return {
    theme: validThemes.includes(theme) ? theme : 'dark',
  };
};
*/

export default MyApp;
