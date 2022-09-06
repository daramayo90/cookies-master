import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { Navbar } from '../ui';

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Cookie Master</title>
        <meta name='author' content='Damian Aramayo' />
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main style={{ padding: '20px 50px' }}>{children}</main>
    </>
  );
};
