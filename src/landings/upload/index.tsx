"use client";
import { FormMemes } from "@/components/FormMemes";
import { FormThoughts } from "@/components/FormThoughts";
import { Image } from "@/components/Image";
import { ExtraHeader } from "@/components/ExtraHeader";
import { useState } from "react";
import styles from "./upload.module.scss";
import book1 from "./assets/book1.svg";
import book2 from "./assets/book2.svg";
import book3 from "./assets/book3.svg";
import { data } from "./const";

export function UploadPage() {
  const [activeTab, setActiveTab] = useState<"meme" | "thought">("meme");

  return (
    <div className={styles.wrapper}>
      <Image className={styles.book} {...book1} />
      <Image className={styles.book} {...book2} />
      <Image className={styles.book} {...book3} />
      <div className={styles.transparentBlock}>
        <div className={styles.rightTopBlock}>
          <div className={styles.tabs}>
            <button
              className={activeTab === "meme" ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab("meme")}
            >
              Мем
            </button>
            <button
              className={
                activeTab === "thought" ? styles.tabActive : styles.tab
              }
              onClick={() => setActiveTab("thought")}
            >
              Высказывание
            </button>
          </div>
        </div>

        {activeTab === "meme" ? (
          <FormMemes {...data.meme} />
        ) : (
          <FormThoughts {...data.thought} />
        )}
      </div>
      <ExtraHeader page="upload" />
    </div>
  );
}
