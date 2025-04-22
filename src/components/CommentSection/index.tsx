import { useComments } from "@/hooks/useComments";
import { useState } from "react";
import { CommentsSectionProps } from "./types";
import styles from "./CommentSection.module.scss";

export function CommentsSection({ predictionId }: CommentsSectionProps) {
  const { comments, isLoading, error, addComment } = useComments(predictionId);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    await addComment(newComment.trim());
    setNewComment("");
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <p className={styles.loading}>Загрузка комментариев...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <>
          <ul className={styles.list}>
            {comments.map((comment) => (
              <li key={comment.id} className={styles.comment}>
                {comment.text}
              </li>
            ))}
            {comments.length === 0 && <li>Комментариев пока нет</li>}
          </ul>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Написать комментарий..."
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Отправить
            </button>
          </form>
        </>
      )}
    </div>
  );
}
