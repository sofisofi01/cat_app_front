'use client';

import classNames from 'classnames';

import { Footer } from '@/containers/Footer/index';
import { Header } from '@/containers/Header/index';

import styles from './Page.module.scss';
import { PageProps } from './types';

export function Page({  children, header }: PageProps) {
  return (
    <body className={classNames(styles.body)}>
        <Header {...header} />
        <main className={styles.main}>{children}</main>
        <Footer />
    </body>
  );
}