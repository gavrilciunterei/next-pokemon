import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';
import { dark } from '../themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={dark}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
