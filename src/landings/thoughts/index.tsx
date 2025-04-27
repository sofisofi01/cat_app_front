"use client";
import styles from "./thoughts.module.scss";
import { ExtraHeader } from "@/components/ExtraHeader";
import { Image } from "@/components/Image";
import arrow from "./assets/chevron-down.png";
import heart from "./assets/heart-o.png";
import heartFilled from "./assets/heart.png";
import { usePredictions } from "@/hooks/usePredictions";
import { useState } from "react";
import { CommentsSection } from "@/components/CommentSection";
import classNames from "classnames";
import { ThoughtsProps } from "./types";
import { useLikes } from "@/hooks/useLikes";
import book1 from "./assets/book1.svg";
import book2 from "./assets/book2.svg";
import book3 from "./assets/book3.svg";
import book4 from "./assets/book4.svg";
import book5 from "./assets/book5.svg";

export function ThoughtsPage({ usernameError, textError }: ThoughtsProps) {
  const {
    allPredictions,
    visiblePredictions,
    isLoading,
    error,
    loadMore,
    visibleCount,
    updatePredictionLikes,
    refetch,
  } = usePredictions(3);

  const [openCommentsId, setOpenCommentsId] = useState<number | null>(null);
  const { likePrediction, isLiked, isLoading: isLikeLoading } = useLikes();

  const handleLike = async (predictionId: number) => {
    const prediction = visiblePredictions.find((p) => p.id === predictionId);
    if (!prediction || isLikeLoading) return;

    const currentLikes = prediction.likes || 0;
    const newLikes = isLiked(predictionId)
      ? currentLikes - 1
      : currentLikes + 1;

    updatePredictionLikes(predictionId, newLikes);

    try {
      await likePrediction(predictionId);
      await refetch();
    } catch (error) {
      updatePredictionLikes(predictionId, currentLikes);
      console.error("Ошибка при обновлении лайка:", error);
    }
  };

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
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${prediction.avatar}`}
                        alt="Иллюстрация предсказания"
                        className={styles.image}
                        width={300}
                        height={200}
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
                          <div className={styles.actions}>
                            <div
                              className={styles.likes}
                              onClick={() => handleLike(prediction.id)}
                              aria-disabled={isLikeLoading}
                            >
                              <p className={styles.likesNum}>
                                {prediction.likes || 0}
                              </p>
                              <Image
                                src={
                                  isLiked(prediction.id)
                                    ? heartFilled.src
                                    : heart.src
                                }
                                className={styles.heart}
                                alt={
                                  isLiked(prediction.id)
                                    ? "Лайкнуто"
                                    : "Поставить лайк"
                                }
                                width={20}
                                height={20}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {visibleCount < allPredictions.length && (
                <button
                  onClick={loadMore}
                  className={styles.loadMoreButton}
                  disabled={isLoading}
                >
                  <Image
                    {...arrow}
                    alt="Загрузить еще"
                    className={classNames({
                      [styles.rotate]: isLoading,
                    })}
                  />
                </button>
              )}
            </>
          ) : (
            <p className={styles.empty}>Нет доступных предсказаний</p>
          )}
        </div>
      )}
      <Image className={styles.book} {...book1} />
      <Image className={styles.book} {...book2} />
      <Image className={styles.book} {...book3} />
      <Image className={styles.book} {...book4} />
      <Image className={styles.book} {...book5} />
      <ExtraHeader page={"thoughts"} />
    </div>
  );
}
