import { useEffect, useState } from "react";
import { PredictionService } from "@/services/api";

const LOCAL_STORAGE_KEY = "likedPredictions";

export function useLikes() {
  const [likedPredictions, setLikedPredictions] = useState<number[]>([]);

  useEffect(() => {
    const storedLikes = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedLikes) {
      setLikedPredictions(JSON.parse(storedLikes));
    }
  }, []);

  useEffect(() => {
    if (likedPredictions.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(likedPredictions));
    }
  }, [likedPredictions]);

  const likePrediction = async (predictionId: number) => {
    const isAlreadyLiked = likedPredictions.includes(predictionId);

    try {
      if (isAlreadyLiked) {
        await PredictionService.unlike(predictionId);
        setLikedPredictions((prev) => prev.filter((id) => id !== predictionId));
      } else {
        await PredictionService.like(predictionId);
        setLikedPredictions((prev) => [...prev, predictionId]);
      }
    } catch (error) {
      console.error("Ошибка при лайке/дизлайке предсказания:", error);
    }
  };

  // Проверяем, лайкнуто ли предсказание
  const isLiked = (predictionId: number) => {
    return likedPredictions.includes(predictionId);
  };

  return { likePrediction, isLiked };
}
