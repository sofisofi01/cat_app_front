"use client";
import styles from "./form.module.scss";

export function FormThoughts() {
  return (
    <>
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Добавьте высказывание"
        />
      </div>
      <div className={styles.inputGroup}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Добавьте тэги"
        />
      </div>
    </>
  );
}
