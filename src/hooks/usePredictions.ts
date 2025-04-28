import { useCallback, useEffect, useState } from "react";
import { Prediction } from "@/services/api/types";
import { PredictionService } from "@/services/api/prediction";
import { CommentService } from "@/services/api/comment";

export const usePredictions = (initialVisibleCount = 3) => {
  const [allPredictions, setAllPredictions] = useState<Prediction[]>([]);
  const [visiblePredictions, setVisiblePredictions] = useState<Prediction[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const fetchAllPredictions = useCallback(async () => {
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
  }, [initialVisibleCount]);

  const loadMore = useCallback(() => {
    const nextCount = visibleCount + initialVisibleCount;
    setVisibleCount(nextCount);
    setVisiblePredictions(allPredictions.slice(0, nextCount));
  }, [allPredictions, initialVisibleCount, visibleCount]);

  const updatePredictionLikes = useCallback(
    (predictionId: number, newLikes: number) => {
      setAllPredictions((prev) =>
        prev.map((pred) =>
          pred.id === predictionId ? { ...pred, likes: newLikes } : pred,
        ),
      );
      setVisiblePredictions((prev) =>
        prev.map((pred) =>
          pred.id === predictionId ? { ...pred, likes: newLikes } : pred,
        ),
      );
    },
    [],
  );

  const refetchLikes = useCallback(async (predictionId: number) => {
    try {
      const updatedPrediction = await PredictionService.getLikes(predictionId);

      setAllPredictions((prev) =>
        prev.map((pred) =>
          pred.id === predictionId
            ? { ...pred, likes: updatedPrediction.likes }
            : pred,
        ),
      );

      setVisiblePredictions((prev) =>
        prev.map((pred) =>
          pred.id === predictionId
            ? { ...pred, likes: updatedPrediction.likes }
            : pred,
        ),
      );
    } catch (error) {
      console.error(
        `Не удалось обновить лайки для предсказания ${predictionId}:`,
        error,
      );
    }
  }, []);

  const updatePredictionComments = useCallback(
    (predictionId: number, newComments: Comment[]) => {
      setAllPredictions((prev) =>
        prev.map((pred) =>
          pred.id === predictionId ? { ...pred, comments: newComments } : pred,
        ),
      );
      setVisiblePredictions((prev) =>
        prev.map((pred) =>
          pred.id === predictionId ? { ...pred, comments: newComments } : pred,
        ),
      );
    },
    [],
  );

  const refetchComments = useCallback(async (predictionId: number) => {
    try {
      const updatedPrediction =
        await CommentService.getByPrediction(predictionId);
      setAllPredictions((prev) =>
        prev.map((pred) =>
          pred.id === predictionId
            ? { ...pred, comments: updatedPrediction.comments }
            : pred,
        ),
      );
      setVisiblePredictions((prev) =>
        prev.map((pred) =>
          pred.id === predictionId
            ? { ...pred, comments: updatedPrediction.comments }
            : pred,
        ),
      );
    } catch (error) {
      console.error(
        `Не удалось обновить комментарии для предсказания ${predictionId}:`,
        error,
      );
    }
  }, []);

  useEffect(() => {
    fetchAllPredictions();
  }, [fetchAllPredictions]);

  return {
    allPredictions,
    visiblePredictions,
    isLoading,
    error,
    loadMore,
    visibleCount,
    updatePredictionLikes,
    refetch: fetchAllPredictions,
    refetchLikes,
    updatePredictionComments,
    refetchComments,
  };
};
