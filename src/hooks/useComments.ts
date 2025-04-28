import { useState, useEffect } from "react";
import { CommentService } from "@/services/api/comment";
import { Comment } from "@/services/api/types";

export const useComments = (predictionId: number | null) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    if (!predictionId) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await CommentService.getByPrediction(predictionId);
      setComments(response.comments || []);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      setError("Не удалось загрузить комментарии");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [predictionId]);

  const addComment = async (text: string, username: string) => {
    if (!predictionId) return;
    setIsLoading(true);
    setError(null);

    try {
      const newComment = await CommentService.add(predictionId, text, username);
      setComments((prev) => [newComment, ...prev]);
      await fetchComments();
    } catch (err) {
      console.error("Failed to add comment:", err);
      setError("Не удалось добавить комментарий");
    } finally {
      setIsLoading(false);
    }
  };

  return { comments, isLoading, error, addComment };
};
