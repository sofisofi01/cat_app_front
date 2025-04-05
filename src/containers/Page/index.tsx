'use client';

import classNames from 'classnames';

import { Footer } from '@/containers/Footer/index';
import { Header } from '@/containers/Header/index';

import styles from './Page.module.scss';
import { PageProps } from './types';
import {data} from './const'

export function Page({  children }: PageProps) {
  return (
    <body className={classNames(styles.body)}>
        <Header menu={data}  />
        <main className={styles.main}>{children}</main>
        <Footer />
    </body>
  );
}