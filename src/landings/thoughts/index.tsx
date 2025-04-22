"use client";
import styles from "./thoughts.module.scss";
import { ExtraHeader } from "@/components/ExtraHeader";
import { Image } from "@/components/Image";
import arrow from "./assets/chevron-down.png";
import heart from "./assets/heart-o.png";
import { usePredictions } from "@/hooks/usePredictions";
import { useComments } from "@/hooks/useComments";
import { useState } from "react";

export function ThoughtsPage() {
  const {
    allPredictions,
    visiblePredictions,
    isLoading,
    error,
    loadMore,
    visibleCount,
  } = usePredictions(3);

  const [openCommentsId, setOpenCommentsId] = useState<number | null>(null);
  const {
    comments,
    isLoading: commentsLoading,
    error: commentsError,
  } = useComments(openCommentsId);

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <div className={styles.loading}>Загрузка...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <div className={styles.predictionsList}>
          {visiblePredictions.length > 0 ? (
            <>
              <ul className={styles.list}>
                {visiblePredictions.map((prediction) => (
                  <li key={prediction.id} className={styles.item}>
                    {prediction.avatar && (
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${prediction.avatar}`}
                        alt="Иллюстрация предсказания"
                        className={styles.image}
                      />
                    )}
                    <div className={styles.meta}>
                      <p className={styles.text}>{prediction.text}</p>
                      {prediction.tag && (
                        <p className={styles.tag}>#{prediction.tag}</p>
                      )}
                      <div className={styles.commentSection}>
                        <p
                          className={styles.label}
                          onClick={() =>
                            setOpenCommentsId(
                              prediction.id === openCommentsId
                                ? null
                                : prediction.id,
                            )
                          }
                        >
                          Комментарии
                        </p>

                        {openCommentsId === prediction.id && (
                          <div className={styles.comments}>
                            {commentsLoading ? (
                              <p>Загрузка комментариев...</p>
                            ) : commentsError ? (
                              <p>{commentsError}</p>
                            ) : comments.length === 0 ? (
                              <p>Комментариев пока нет</p>
                            ) : (
                              <ul className={styles.commentsList}>
                                {comments.map((comment) => (
                                  <li
                                    key={comment.id}
                                    className={styles.commentItem}
                                  >
                                    <p>{comment.text}</p>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}

                        <div className={styles.likes}>
                          {prediction.likes && <p>{prediction.likes}</p>}
                          <Image {...heart} className={styles.heart} />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {visibleCount < allPredictions.length && (
                <button onClick={loadMore} className={styles.loadMoreButton}>
                  <Image {...arrow} />
                </button>
              )}
            </>
          ) : (
            <p className={styles.empty}>Нет доступных предсказаний</p>
          )}
        </div>
      )}
      <ExtraHeader page={"thoughts"} />
    </div>
  );
}
