import Head from 'next/head';
import React from 'react';
import { Navbar } from '../ui';

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const origin = typeof window === 'undefined' ? '' : window.location.origin;
export const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon'}</title>
        <meta name="description" content={`Información sobre ${title}`} />
        <meta name="keywords" content="PokeApp, pokemon, pokedex" />

        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta property="og:description" content={`Pagina sobre ${title}`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar />

      <main style={{ padding: '0px 20px' }}>{children}</main>
    </>
  );
};
