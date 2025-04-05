import { HeaderProps } from "./types";
import styles from './Header.module.scss'
import Link from "next/link";
import { Image } from '@/components/Image/index'
import logo from './assets/icon.png'

export function Header({ menu }: HeaderProps) {
    return (
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
            <Image className={styles.image} {...logo}/>
            <h1 className={styles.title}>О чем думает кот?</h1>
        </Link>
        <nav className={styles.nav}>
        {menu.map((item, index) => (
          <div className={styles.navItem} key={item.id}>
            <Link href={item.href}>{item.text}</Link>
          </div>
        ))}
        </nav>
      </header>
    );
  }