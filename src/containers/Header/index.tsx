import { HeaderProps } from "./types";
import styles from './Header.module.scss'
import Link from "next/link";
import { Image } from '@/components/Image/index'
import logo from './assets/icon.png'

export function Header({ menu }: HeaderProps) {
    return (
      <header className={styles.header}>
        <Link className={styles.logo} href="/">
            <h1 className={styles.title}>О чем думает кот?</h1>
            <Image className={styles.image} {...logo}/>
        </Link>
        <nav className={styles.nav}>
        {menu.map((item, index) => (
          <div className={styles.navItem} key={item.id}>
            <Link className={styles.link} href={item.href}>{item.text}</Link>
          </div>
        ))}
        </nav>
      </header>
    );
  }