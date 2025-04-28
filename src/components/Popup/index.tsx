import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PopupProps } from "./types";
import styles from "./Popup.module.scss";
import classNames from "classnames";

export function Popup({ isOpen, onClose, children, mods }: PopupProps) {
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

  const overlayClasses = classNames(
    styles.overlay,
    mods?.map((mod) => styles[mod]),
  );

  const contentClasses = classNames(
    styles.content,
    mods?.map((mod) => styles[mod]),
  );

  const closeBtnClasses = classNames(
    styles.closeBtn,
    mods?.map((mod) => styles[mod]),
  );

  return createPortal(
    <div className={overlayClasses}>
      <div className={contentClasses}>
        {children}
        <button onClick={onClose} className={closeBtnClasses}>
          ×
        </button>
      </div>
    </div>,
    portalElement,
  );
}
