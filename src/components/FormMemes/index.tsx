"use client";
import { UploadPageProps } from "./types";
import styles from "./form.module.scss";
import { Image } from "@/components/Image";
import star from "@/landings/upload/assets/star.png";

export function FormMemes({ text, image }: UploadPageProps) {
  return (
    <>
      <div className={styles.leftBlock}>
        <Image
          src={star.src}
          alt="Star decoration"
          className={styles.starImage}
        />
        <Image {...image} className={styles.insertImage} />
      </div>

      <div className={styles.rightBottomBlock}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Добавьте название"
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Добавьте тэги"
          />
        </div>
        <div className={styles.blockItem}>
          <p>{text}</p>
        </div>
        <div className={styles.submitButtonContainer}>
          <button className={styles.submitButton}>Отправить</button>
        </div>
      </div>
    </>
  );
}
