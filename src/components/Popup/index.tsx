import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PopupProps } from "./types";
import styles from "./Popup.module.scss";

export function Popup({ isOpen, onClose, children }: PopupProps) {
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(
    null,
  );

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
    <div className={styles.overlay}>
      <div className={styles.content}>
        {children}
        <button onClick={onClose} className={styles.closeBtn}>
          ×
        </button>
      </div>
    </div>,
    portalElement,
  );
}
