import styles from './about.module.scss'
import { AboutPageProps } from './types' 


export function AboutPage({title, caption, items, image}: AboutPageProps) {
    return (
    <div className={styles.wrapper}>
        <h1 className={styles.title}>{title}</h1>
    </div>
    );
}