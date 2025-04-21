"use client"; // Добавьте эту строку в самом начале файла

import { useState, useEffect } from 'react';
import styles from './Memes.module.scss';
import { MemesPageProps } from './types';

export const MemesPage = ({ title, memes }: MemesPageProps) => {
  const [clientSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  if (!clientSide) {
    return <div className={styles.wrapper}>Загрузка...</div>;
  }

  if (!memes?.length) {
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.emptyMessage}>Мемы не найдены</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.grid}>
        {memes.map((meme) => (
          <div key={meme.id} className={styles.card}>
            <img
              src={meme.image}
              alt={meme.title}
              className={styles.image}
              loading="lazy"
            //   onError={(e) => {
            //     (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
            //   }}
            />
            <div className={styles.info}>
              <h3 className={styles.memeTitle}>{meme.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};