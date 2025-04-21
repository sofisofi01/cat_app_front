"use client";
import styles from "./Memes.module.scss";
import Link from "next/link";
import plusIcon from "./assets/plus.svg";
import Image from "next/image";
import dividerImg from "./assets/divide.svg";
import book1 from "./assets/book1.svg";
import book2 from "./assets/book2.svg";
import book3 from "./assets/book3.svg";
import book4 from "./assets/book4.svg";
import book5 from "./assets/book5.svg";
import book6 from "./assets/book6.svg";
import { ExtraHeader } from "@/components/ExtraHeader";
import { useState } from "react";

interface MemeItem {
  id: number;
  title: string;
  image: string;
  tag: string;
}

interface MemesPageProps {
  title: string;
  memes: MemeItem[];
}

export const MemesPage = ({ title, memes }: MemesPageProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState<MemeItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allTags = Array.from(new Set(memes.map((meme) => meme.tag)));

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
    setIsDropdownOpen(false);
  };

  const clearTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  const filteredMemes =
    selectedTags.length === 0
      ? memes
      : memes.filter((meme) => selectedTags.includes(meme.tag));

  const openModal = (meme: MemeItem) => {
    setSelectedMeme(meme);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeme(null);
  };

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
        <Image
          src={dividerImg}
          alt=""
          className={styles.divider}
          width={800}
          height={2}
        />
      </div>

      <h1 className={styles.title}>{title}</h1>

      <div className={styles.content}>
        <div className={styles.filterSection}>
          <div className={styles.dropdownContainer}>
            <input
              className={styles.selectInput}
              value="Выбери теги..."
              readOnly
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                {allTags.map((tag) => (
                  <div
                    key={tag}
                    className={`${styles.dropdownItem} ${
                      selectedTags.includes(tag) ? styles.active : ""
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.selectedTagsBox}>
            {selectedTags.map((tag) => (
              <span key={tag} className={styles.selectedTag}>
                {tag}
                <button
                  className={styles.removeTagButton}
                  onClick={() => clearTag(tag)}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {filteredMemes.length === 0 ? (
        <p className={styles.emptyMessage}>Мемы не найдены</p>
      ) : (
        <>
          <div className={styles.grid}>
            {filteredMemes.map((meme) => (
              <img
                key={meme.id}
                src={meme.image}
                alt={meme.title}
                className={styles.image}
                loading="lazy"
                onClick={() => openModal(meme)}
              />
            ))}
          </div>
          <div className={styles.showMoreContainer}>
            <span className={styles.showMoreArrow}></span>
          </div>
        </>
      )}

      <Image className={styles.book} {...book1} />
      <Image className={styles.book} {...book2} />
      <Image className={styles.book} {...book3} />
      <Image className={styles.book} {...book4} />
      <Image className={styles.book} {...book5} />
      <Image className={styles.book} {...book6} />

      {isModalOpen && selectedMeme && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeModal}>
              ✕
            </button>
            <img
              src={selectedMeme.image}
              alt={selectedMeme.title}
              className={styles.modalImage}
            />
            <div className={styles.modalInfo}>
              <h2>{selectedMeme.title}</h2>
              <p>{selectedMeme.tag}</p>
            </div>
          </div>
        </div>
      )}

      <ExtraHeader page={"memes"} />
    </div>
  );
};
