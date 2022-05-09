import Head from 'next/head';
import React from 'react';
import { Navbar } from '../ui';

type Props = {
  children?: React.ReactNode;
  title?: string;
};

export const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon'}</title>
        <meta name="description" content="PokeApp description" />
        <meta name="keywords" content="PokeApp, pokemon, pokedex" />
      </Head>

      <Navbar />

      <main style={{ padding: '0px 20px' }}>{children}</main>
    </>
  );
};
