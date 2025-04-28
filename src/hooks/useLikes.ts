import { useEffect, useState } from "react";
import { PredictionService } from "@/services/api";

const LOCAL_STORAGE_KEY = "likedPredictions";

export function useLikes() {
  const [likedPredictions, setLikedPredictions] = useState<number[] | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedLikes = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedLikes) {
      try {
        const parsed = JSON.parse(storedLikes);
        if (Array.isArray(parsed)) {
          setLikedPredictions(parsed);
        } else {
          setLikedPredictions([]);
        }
      } catch (e) {
        console.error("Failed to parse liked predictions", e);
        setLikedPredictions([]);
      }
    } else {
      setLikedPredictions([]);
    }
  }, []);

  useEffect(() => {
    if (likedPredictions !== null) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(likedPredictions));
    }
  }, [likedPredictions]);

  const likePrediction = async (predictionId: number) => {
    if (likedPredictions === null) return;

    setIsLoading(true);
    setError(null);
    const isAlreadyLiked = likedPredictions.includes(predictionId);

    try {
      if (isAlreadyLiked) {
        await PredictionService.unlike(predictionId);
        setLikedPredictions((prev) =>
          prev ? prev.filter((id) => id !== predictionId) : [],
        );
      } else {
        await PredictionService.like(predictionId);
        setLikedPredictions((prev) =>
          prev ? [...prev, predictionId] : [predictionId],
        );
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
    if (likedPredictions === null) return false;
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
