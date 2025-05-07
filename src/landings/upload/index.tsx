"use client";
import { FormMemes } from "@/components/FormMemes";
import { FormThoughts } from "@/components/FormThoughts";
import styles from "./upload.module.scss";
import { Image } from "@/components/Image";
import { ExtraHeader } from "@/components/ExtraHeader";
import book1 from "./assets/book1.svg";
import book2 from "./assets/book2.svg";
import book3 from "./assets/book3.svg";
import insertMeme from "./assets/insert_meme.png";
import insertSaying from "./assets/insert_saying.png";
import star from "./assets/star.png";
import { useState } from "react";
import { data } from "./const";

export function UploadPage() {
  const [activeTab, setActiveTab] = useState<"meme" | "saying">("meme");

  return (
    <div className={styles.wrapper}>
      <Image className={styles.book} {...book1} />
      <Image className={styles.book} {...book2} />
      <Image className={styles.book} {...book3} />
      <div className={styles.transparentBlock}>
        <div className={styles.leftBlock}>
          <Image
            src={star.src}
            alt="Star decoration"
            className={styles.starImage}
          />
          <Image
            src={activeTab === "meme" ? insertMeme.src : insertSaying.src}
            alt={activeTab === "meme" ? "Meme insert" : "Saying insert"}
            className={styles.insertImage}
          />
        </div>

        <div className={styles.rightBlock}>
          <div className={styles.tabs}>
            <button
              className={activeTab === "meme" ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab("meme")}
            >
              Мем
            </button>
            <button
              className={activeTab === "saying" ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab("saying")}
            >
              Высказывание
            </button>
          </div>

          {activeTab === "meme" ? <FormMemes /> : <FormThoughts />}

          <div className={styles.blockItem}>
            <p>{activeTab === "meme" ? data.text_meme : data.text_saying}</p>
          </div>
          <div className={styles.submitButtonContainer}>
            <button className={styles.submitButton}>Отправить</button>
          </div>
        </div>
      </div>
      <ExtraHeader page="upload" />
    </div>
  );
}
