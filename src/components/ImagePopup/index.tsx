import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ImagePopup.module.scss"; 

export interface ImagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  tag: string;
}

export function ImagePopup({ isOpen, onClose, imageSrc, imageAlt, tag }: ImagePopupProps) {
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    setPortalElement(element);
    return () => {
      document.body.removeChild(element);
    };
  }, []);

  if (!portalElement || !isOpen) return null;

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className={styles.closeBtn}>
          ×
        </button>

        <div className={styles.modalImageWrapper}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className={styles.modalImage}
          />
        </div>

        <div className={styles.modalInfo}>
          <h2 className={styles.modalTitle}>{imageAlt}</h2>
          <span className={styles.modalTag}>{tag}</span>
        </div>
      </div>
    </div>,
    portalElement
  );
}
