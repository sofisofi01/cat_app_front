"use client";
import { ExtraHeader } from "@/components/ExtraHeader";
import styles from "./main.module.scss";
import { MainProps } from "./types";
import { Image } from "@/components/Image";
import { Popup } from "@/components/Popup";
import { Prediction, PredictionService } from "@/services/api";
import { useRef, useState } from "react";
import starL from "./assets/star_L.png";
import starR from "./assets/star_R.png";

export function MainPage({ caption, btnText, background, cat }: MainProps) {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const fetchRandomPrediction = async () => {
    setIsLoading(true);
    setShowPopup(false);

    try {
      const randomPred = await PredictionService.getRandom();
      setPrediction(randomPred);

      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();

        const timer = setTimeout(() => {
          setIsLoading(false);
          setShowPopup(true);
        }, 5000);

        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error("Failed to fetch prediction:", error);
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <div className={styles.wrapper}>
      {isLoading && (
        <div className={styles.videoOverlay}>
          <video
            ref={videoRef}
            className={`${styles.video} ${styles.hidden}`}
            playsInline
            muted
            onEnded={() => videoRef.current?.classList.add(styles.hidden)}
          >
            <source src="/images/main/cat.mp4" type="video/mp4" />
          </video>
        </div>
      )}

      <Image {...background} className={styles.background} />
      <Image {...cat} className={styles.cat} />
      <h1 className={styles.caption}>{caption}</h1>

      <button
        className={styles.btn}
        onClick={fetchRandomPrediction}
        disabled={isLoading}
      >
        {btnText}
      </button>

      <ExtraHeader />
      <Popup isOpen={showPopup} onClose={closePopup}>
        <div className={styles.header}>
          <Image {...starL} className={styles.star} />
          <h2 className={styles.headerText}>Ваше предсказание</h2>
          <Image {...starR} className={styles.star} />
        </div>

        <div className={styles.predictionText}>
          {prediction?.text || "Не удалось загрузить предсказание"}
        </div>
      </Popup>
    </div>
  );
}
