"use client";
import styles from "./Memes.module.scss";
import Link from "next/link";
import plusIcon from "./assets/plus.svg";
import Image from "next/image";
import dividerImg from "./assets/divide (1).svg";
import book1 from "./assets/book1.svg";
import book2 from "./assets/book2.svg";
import book3 from "./assets/book3.svg";
import book4 from "./assets/book4.svg";
import book5 from "./assets/book5.svg";
import book6 from "./assets/book6.svg";

interface MemeItem {
  id: number;
  title: string;
  image: string;
}

interface MemesPageProps {
  title: string;
  memes: MemeItem[];
}

export const MemesPage = ({ title, memes }: MemesPageProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.uploadSection}>
        <Link href="/download">
          <Image
            src={plusIcon}
            alt="Добавить мем"
            className={styles.uploadIcon}
            width={50}
            height={50}
          />
        </Link>
        <p className={styles.uploadTitle}>Загрузи свой мем!</p>
        {/* Заменяем div на Image для разделителя */}
        <Image
          src={dividerImg}
          alt=""
          className={styles.divider}
          width={800} // Укажите реальные размеры
          height={2}
        />
      </div>

      <h1 className={styles.title}>{title}</h1>

      {!memes || memes.length === 0 ? (
        <p className={styles.emptyMessage}>Мемы не найдены</p>
      ) : (
        <div className={styles.grid}>
          {memes.map((meme) => (
            <img
              key={meme.id}
              src={meme.image}
              alt={meme.title}
              className={styles.image}
              loading="lazy"
            />
          ))}
        </div>
      )}
      <Image className={styles.book} {...book1} />
      <Image className={styles.book} {...book2} />
      <Image className={styles.book} {...book3} />
      <Image className={styles.book} {...book4} />
      <Image className={styles.book} {...book5} />
      <Image className={styles.book} {...book6} />
    </div>
  );
};
