import styles from './about.module.scss'
import { AboutPageProps } from './types' 
import { Image } from '@/components/Image'
import { ExtraHeader } from '@/components/ExtraHeader';
import book1 from './assets/book1.svg'
import book2 from './assets/book2.svg'
import book3 from './assets/book3.svg'
import book4 from './assets/book4.svg'
import book5 from './assets/book5.svg'


export function AboutPage({title, caption, items, image}: AboutPageProps) {
    return (
    <div className={styles.wrapper}>
        <Image {...image} className={styles.image}/>
        <div className={styles.head}>
            <h1 className={styles.title}>{title}</h1>
            <h2 className={styles.caption}>{caption}</h2>
        </div>
        <div className={styles.itemsWrapper}>
            {items && items.map((item)=>(
                <div className={styles.item} key={item.id}>
                    <p className={styles.itemNum}>{item.id}</p>
                    <div>
                        <h3 className={styles.itemTitle}>{item.title}</h3>
                        <p className={styles.itemText}>{item.text}</p>
                    </div>
                </div>
                ))}
        </div>
        <Image className={styles.book} {...book1}/>
        <Image className={styles.book} {...book2}/>
        <Image className={styles.book} {...book3}/>
        <Image className={styles.book} {...book4}/>
        <Image className={styles.book} {...book5}/>
        <ExtraHeader page={'about'}/>
    </div>
    );
}