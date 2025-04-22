import styles from "./download.module.scss";
import { DownloadPageProps } from "./types";
import { Image } from "@/components/Image";
import { ExtraHeader } from "@/components/ExtraHeader";
import book1 from "./assets/book1.svg";
import book2 from "./assets/book2.svg";
import book3 from "./assets/book3.svg";
import book4 from "./assets/book4.svg";
import book5 from "./assets/book5.svg";

export function DownloadPage({ title, caption, items }: DownloadPageProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.caption}>{caption}</h2>
      </div>
      <div className={styles.itemsWrapper}>
        {items?.map((item, index) => (
          <div className={styles.item} key={index}>
            <p className={styles.itemNum}>{index + 1}</p>
            <div>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemText}>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
      <Image src={book1} className={styles.book} alt="Book 1" />
      <Image src={book2} className={styles.book} alt="Book 2" />
      <Image src={book3} className={styles.book} alt="Book 3" />
      <Image src={book4} className={styles.book} alt="Book 4" />
      <Image src={book5} className={styles.book} alt="Book 5" />
      <ExtraHeader page="upload" />
    </div>
  );
}
