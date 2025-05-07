"use client";
import styles from "./form.module.scss";

export function FormMemes() {
  return (
    <>
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
    </>
  );
}
