import { useEffect, useState } from "react";
import { PredictionService } from "@/services/api";

const LOCAL_STORAGE_KEY = "likedPredictions";

export function useLikes() {
  const [likedPredictions, setLikedPredictions] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedLikes = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedLikes) {
      try {
        setLikedPredictions(JSON.parse(storedLikes));
      } catch (e) {
        console.error("Failed to parse liked predictions", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(likedPredictions));
  }, [likedPredictions]);

  const likePrediction = async (predictionId: number) => {
    setIsLoading(true);
    setError(null);
    const isAlreadyLiked = likedPredictions.includes(predictionId);

    try {
      if (isAlreadyLiked) {
        await PredictionService.unlike(predictionId);
        setLikedPredictions((prev) => prev.filter((id) => id !== predictionId));
      } else {
        await PredictionService.like(predictionId);
        setLikedPredictions((prev) => [...prev, predictionId]);
      }
    } catch (err) {
      console.error("Like error:", err);
      setError("Не удалось обновить лайк");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const isLiked = (predictionId: number) => {
    return likedPredictions.includes(predictionId);
  };

  return {
    likePrediction,
    isLiked,
    isLoading,
    error,
    likedPredictions,
  };
}
