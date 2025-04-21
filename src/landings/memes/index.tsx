import styles from "./Memes.module.scss";
import { MemesPageProps } from "./types";

export const MemesPage = ({ title, memes }: MemesPageProps) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.grid}>
        {memes.map((meme) => (
          <div key={meme.id} className={styles.card}>
            <img src={meme.image} alt={meme.title} className={styles.image} />
            <div className={styles.info}>
              <h3 className={styles.memeTitle}>{meme.title}</h3>
              <div className={styles.stats}>
                <span>❤️ {meme.likes}</span>
                <span>💬 {meme.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
