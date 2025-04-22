import { useState, useEffect } from "react";
import { CommentService } from "@/services/api/comment";
import { Comment } from "@/services/api/types";

export const useComments = (predictionId: number | null) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!predictionId) return;

    const fetchComments = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await CommentService.getByPrediction(predictionId);
        setComments(response.content);
      } catch (err) {
        console.error("Failed to fetch comments:", err);
        setError("Не удалось загрузить комментарии");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [predictionId]);

  return { comments, isLoading, error };
};
