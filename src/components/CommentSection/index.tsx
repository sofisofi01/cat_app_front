import { useComments } from "@/hooks/useComments";
import { useState } from "react";
import { CommentsSectionProps } from "./types";
import styles from "./CommentSection.module.scss";
import classNames from "classnames";

export function CommentsSection({ predictionId }: CommentsSectionProps) {
  const { comments, isLoading, error, addComment } = useComments(predictionId);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !username.trim()) return;
    await addComment(text.trim(), username.trim());
    setText("");
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
                <h3 className={styles.username}>{comment.username}</h3>
                <p>{comment.text}</p>
              </li>
            ))}
            {comments.length === 0 && <li>Комментариев пока нет</li>}
          </ul>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.fields}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ваше имя"
                className={styles.input}
                required
              />
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Комментарий..."
                className={classNames(styles.input, styles.commInput)}
                required
              />
            </div>
            <button type="submit" className={styles.button}>
              Отправить
            </button>
          </form>
        </>
      )}
    </div>
  );
}
