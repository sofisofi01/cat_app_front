import { PropsWithChildren } from 'react';
import { HeaderProps } from '../Header/types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type PageProps = PropsWithChildren<{
    header: HeaderProps
}>;