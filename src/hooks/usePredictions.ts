import { useEffect, useState } from "react";
import { Prediction } from "@/services/api/types";
import { PredictionService } from "@/services/api/prediction";

export const usePredictions = (initialVisibleCount = 3) => {
  const [allPredictions, setAllPredictions] = useState<Prediction[]>([]);
  const [visiblePredictions, setVisiblePredictions] = useState<Prediction[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const fetchAllPredictions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await PredictionService.getAll();
      setAllPredictions(response.predictions);
      setVisiblePredictions(response.predictions.slice(0, initialVisibleCount));
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
      setError("Не удалось загрузить предсказания");
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    const nextCount = visibleCount + initialVisibleCount;
    setVisibleCount(nextCount);
    setVisiblePredictions(allPredictions.slice(0, nextCount));
  };

  useEffect(() => {
    fetchAllPredictions();
  }, [initialVisibleCount]);

  return {
    allPredictions,
    visiblePredictions,
    isLoading,
    error,
    loadMore,
    visibleCount,
  };
};
