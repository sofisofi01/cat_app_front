"use client";
import { ExtraHeader } from "@/components/ExtraHeader";
import styles from "./main.module.scss";
import { MainProps } from "./types";
import { Image } from "@/components/Image";
import { Prediction, PredictionService } from "@/services/api";
import { useState } from "react";

export function MainPage({ caption, btnText, background, cat }: MainProps) {
  const [, setPrediction] = useState<Prediction | null>(null);

  const fetchRandomPrediction = async () => {
    try {
      const randomPred = await PredictionService.getRandom();
      setPrediction(randomPred);
    } catch (error) {
      console.error("Failed to fetch prediction:", error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <Image {...background} className={styles.background} />
      <Image {...cat} className={styles.cat} />
      <h1 className={styles.caption}>{caption}</h1>
      <button className={styles.btn} onClick={fetchRandomPrediction}>
        {btnText}
      </button>
      <ExtraHeader />
    </div>
  );
}
