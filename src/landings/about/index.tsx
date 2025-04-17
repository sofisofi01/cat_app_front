import styles from './about.module.scss'
import { AboutPageProps } from './types' 
import { ExtraHeader } from '@/components/ExtraHeader';


export function AboutPage({title, caption, items, image}: AboutPageProps) {
    return (
    <div className={styles.wrapper}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.caption}>{caption}</h2>
        <div className={styles.itemsWrapper}>
            {items && items.map((item)=>(
                <div className={styles.item} key={item.id}>
                    <p className={styles.itemNum}>{item.id}</p>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <p className={styles.itemText}>{item.text}</p>
                </div>
                ))}
        </div>
        <ExtraHeader page={'about'}/>
    </div>
    );
}