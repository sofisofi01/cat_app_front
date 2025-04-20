"use client";
import { useEffect, useState } from "react";
import styles from "./thoughts.module.scss";
import { ExtraHeader } from "@/components/ExtraHeader";
import { Image } from "@/components/Image";
import arrow from "./assets/chevron-down.png";
import { Prediction, PredictionService } from "@/services/api";
import heart from "./assets/heart-o.png";

export function ThoughtsPage() {
  const [allPredictions, setAllPredictions] = useState<Prediction[]>([]);
  const [visiblePredictions, setVisiblePredictions] = useState<Prediction[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const fetchAllPredictions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await PredictionService.getAll();
      setAllPredictions(response.predictions);
      setVisiblePredictions(response.predictions.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
      setError("Не удалось загрузить предсказания");
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    const nextCount = visibleCount + 3;
    setVisibleCount(nextCount);
    setVisiblePredictions(allPredictions.slice(0, nextCount));
  };

  useEffect(() => {
    fetchAllPredictions();
  }, []);

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
                        <p className={styles.label}>Комментарии</p>

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
