"use client";
import { useState } from "react";
import Link from "next/link";

import { Image } from '@/components/Image';
import styles from "./Memes.module.scss";
import plusIcon from "./assets/plus.svg";
import dividerImg from "./assets/divide.svg";
import book1 from "./assets/book1.svg";
import book2 from "./assets/book2.svg";
import book3 from "./assets/book3.svg";
import book4 from "./assets/book4.svg";
import book5 from "./assets/book5.svg";
import book6 from "./assets/book6.svg";
import arrow from "./assets/chevron-down.png";
import { Dropdown } from "@/components/Dropdown";
import { ExtraHeader } from "@/components/ExtraHeader";
import type { MemeItem, MemesPageProps } from "./types";

interface UploadSectionProps {
  uploadTitle: string;
}

const UploadSection = ({ uploadTitle }: UploadSectionProps) => {
  return (
    <div className={styles.uploadSection}>
      <Link href="/upload">
        <Image
          src={plusIcon.src} 
          alt="Добавить мем"
          className={styles.uploadIcon}
          width={50}
          height={50}
        />
      </Link>
      <p className={styles.uploadTitle}>{uploadTitle || "Загрузи свой мем!"}</p>
      <Image
        src={dividerImg.src}
        alt=""
        className={styles.divider}
        width={800}
        height={2}
      />
    </div>
  );
};

export const MemesPage = ({ title, memes, uploadTitle }: MemesPageProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedMeme, setSelectedMeme] = useState<MemeItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allTags = Array.from(new Set(memes.map((meme) => meme.tag)));

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
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
      <UploadSection uploadTitle={uploadTitle} />
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.content}>
        <div className={styles.filterSection}>
          <Dropdown
            allTags={allTags}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
          />
        </div>
      </div>

      {filteredMemes.length === 0 ? (
        <p className={styles.emptyMessage}>Мемы не найдены</p>
      ) : (
        <div className={styles.memeGallery}>
          {filteredMemes.map((meme) => (
            <Image
              key={meme.id}
              src={meme.image}
              alt={meme.title}
              className={styles.image}
              loading="lazy"
              onClick={() => openModal(meme)}
            />
          ))}
        </div>
      )}

      {[book1, book2, book3, book4, book5, book6].map((book, index) => (
        <Image
          key={index}
          src={book.src} 
          alt={`book-${index + 1}`}
          className={styles.book}
        />
      ))}

      {isModalOpen && selectedMeme && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeModal}>
              ✕
            </button>
            <Image
              src={selectedMeme.image}
              alt={selectedMeme.title}
              className={styles.modalImage}
              width={800}
              height={600}
            />
            <div className={styles.modalInfo}>
              <h2 className={styles.modalTitle}>{selectedMeme.title}</h2>
              <p className={styles.modalTag}>{selectedMeme.tag}</p>
            </div>
          </div>
        </div>
      )}

      <button className={styles.loadMoreButton}>
        <Image src={arrow.src} alt="Загрузить ещё" width={60} height={60} />
      </button>

      <ExtraHeader page="memes" />
    </div>
  );
};