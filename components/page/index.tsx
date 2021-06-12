import { FC } from 'react';
import Head from 'next/head';
import { PRODUCT_NAME } from '@utils/constants';
import { Header } from '@components/header';
import { NavBar, PageType } from '@components/nav-bar';
import { Footer } from '@components/footer';

import styles from './page.module.scss';

export interface Props {
  /** Document title to appear as the tab name */
  title: string;
  /** Content for the `<meta name="description">` tag */
  description: string;
  /** Active page to show in the Nav */
  activePage: PageType;
  /** Header at the top of the page */
  header?: string;
}

export const Page: FC<Props> = ({
  activePage,
  title,
  description,
  header,
  children,
}) => {
  const headerElem = header ? (
    <h2 className={styles.title}>{header}</h2>
  ) : undefined;

  return (
    <>
      <Head>
        <title>
          {title} ※ {PRODUCT_NAME}
        </title>
        <meta name="Description" content={description} />
        <meta name="theme-color" content="white" />
      </Head>
      <div className={styles.root}>
        <Header className={styles.header} />
        <NavBar active={activePage} />
        <main className={styles.main}>
          {headerElem}
          {children}
        </main>
        <Footer className={styles.footer} />
      </div>
    </>
  );
};
