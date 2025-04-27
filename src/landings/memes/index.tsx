"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Image } from "@/components/Image";
import styles from "./memes.module.scss";
import plusIcon from "./assets/plus.svg";
import dividerImg from "./assets/divide.svg";
import book1 from "./assets/book1.svg";
import book2 from "./assets/book2.svg";
import book3 from "./assets/book3.svg";
import book4 from "./assets/book4.svg";
import book5 from "./assets/book5.svg";

import { Dropdown } from "@/components/Dropdown";
import { ExtraHeader } from "@/components/ExtraHeader";
import { ImageService } from "@/services/api/image";
import { ImageType } from "@/services/api/types";
import { Popup } from "@/components/Popup";

export const MemesPage = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [memes, setMemes] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeme, setSelectedMeme] = useState<ImageType | null>(null);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        setLoading(true);
        const response = await ImageService.getAll();
        const formattedMemes = response.images.map((image) => ({
          id: image.id,
          title: image.description || `Meme ${image.id}`,
          image: image.image,
          tag: image.tag,
        }));
        setMemes(formattedMemes);
      } catch (err) {
        setError("Failed to load memes. Please try again later.");
        console.error("Error fetching memes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleMemeClick = (meme: ImageType) => {
    setSelectedMeme(meme);
  };

  const handleClosePopup = () => {
    setSelectedMeme(null);
  };

  const filteredMemes =
    selectedTags.length === 0
      ? memes
      : memes.filter((meme) => meme.tag && selectedTags.includes(meme.tag));

  if (loading) {
    return <div className={styles.wrapper}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.wrapper}>{error}</div>;
  }

  return (
    <div className={styles.wrapper}>
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
        <p className={styles.uploadTitle}>Загрузи свой мем!</p>
        <Image
          src={dividerImg.src}
          alt=""
          className={styles.divider}
          width={800}
          height={2}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.filterSection}>
          <Dropdown selectedTags={selectedTags} toggleTag={toggleTag} />
        </div>
      </div>

      {filteredMemes.length === 0 ? (
        <p className={styles.emptyMessage}>Мемы не найдены</p>
      ) : (
        <div className={styles.memeGallery}>
          {filteredMemes.map((meme) => (
            <div key={meme.id} onClick={() => handleMemeClick(meme)}>
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${meme.image}`}
                alt={meme.description}
                className={styles.image}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {[book1, book2, book3, book4, book5].map((book, index) => (
        <Image
          key={index}
          src={book.src}
          alt={`book-${index + 1}`}
          className={styles.book}
        />
      ))}

      <div className={styles.footer}>
        <ExtraHeader page={"memes"} />
      </div>

      <Popup
        isOpen={!!selectedMeme}
        onClose={handleClosePopup}
        mods={["noPadding", "outerIcon"]}
      >
        {selectedMeme && (
          <div className={styles.memePopupContent}>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${selectedMeme.image}`}
              alt={selectedMeme.description}
              className={styles.popupImage}
            />
            {selectedMeme.tag && (
              <p className={styles.memeDescription}>{"#" + selectedMeme.tag}</p>
            )}
          </div>
        )}
      </Popup>
    </div>
  );
};
