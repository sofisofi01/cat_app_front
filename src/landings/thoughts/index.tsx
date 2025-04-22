"use client";
import styles from "./thoughts.module.scss";
import { ExtraHeader } from "@/components/ExtraHeader";
import { Image } from "@/components/Image";
import arrow from "./assets/chevron-down.png";
import heart from "./assets/heart-o.png";
import { usePredictions } from "@/hooks/usePredictions";
import { useState } from "react";
import { CommentsSection } from "@/components/CommentSection";
import classNames from "classnames";
import { ThoughtsProps } from "./types";

export function ThoughtsPage({ usernameError, textError }: ThoughtsProps) {
  const {
    allPredictions,
    visiblePredictions,
    isLoading,
    error,
    loadMore,
    visibleCount,
  } = usePredictions(3);

  const [openCommentsId, setOpenCommentsId] = useState<number | null>(null);

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
                      <div
                        className={classNames(styles.commentSection, {
                          [styles.isOpen]: openCommentsId === prediction.id,
                        })}
                      >
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
                          <CommentsSection
                            textError={textError}
                            usernameError={usernameError}
                            predictionId={prediction.id}
                          />
                        )}

                        {openCommentsId !== prediction.id && (
                          <div className={styles.likes}>
                            {prediction.likes && (
                              <p className={styles.likesNum}>
                                {prediction.likes}
                              </p>
                            )}
                            <Image {...heart} className={styles.heart} />
                          </div>
                        )}
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
