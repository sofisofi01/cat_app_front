import { useState } from "react";
import styles from "./Dropdown.module.scss";
import { DropdownProps } from "./types";

const ALL_TAGS = ["funny", "animals", "games", "movies", "reactions"] as const;

export const Dropdown = ({ selectedTags, toggleTag }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropdownWrapper}>
      <div className={styles.dropdownContainer}>
        <input
          className={styles.selectInput}
          value="Выбери теги..."
          readOnly
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <div className={styles.dropdownMenu}>
            {ALL_TAGS.map((tag) => (
              <div
                key={tag}
                className={`${styles.dropdownItem} ${
                  selectedTags.includes(tag) ? styles.active : ""
                }`}
                onClick={() => {
                  toggleTag(tag);
                  setIsOpen(false);
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.selectedTagsContainer}>
        {selectedTags.map((tag) => (
          <span key={tag} className={styles.selectedTag}>
            {tag}
            <button
              className={styles.removeTagButton}
              onClick={(e) => {
                e.stopPropagation();
                toggleTag(tag);
              }}
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
