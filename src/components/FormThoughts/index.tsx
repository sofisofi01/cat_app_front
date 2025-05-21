"use client";
import { FormThoughtsProps } from "./types";
import styles from "./form.module.scss";
import { Image } from "@/components/Image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { PredictionService } from "@/services/api/prediction";

export function FormThoughts({ text, image }: FormThoughtsProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(image.src);
  const [quote, setQuote] = useState("");
  const [tag, setTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    setSelectedAvatar(null);
    setAvatarPreviewUrl(image.src);
    setQuote("");
    setTag("");
    setError("");
    setSuccess("");
    if (avatarInputRef.current) avatarInputRef.current.value = "";
  };

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Пожалуйста, выберите файл изображения для аватара");
      return;
    }

    setSelectedAvatar(file);
    setError("");
    setSuccess("");

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!quote.trim()) {
      setError("Высказывание обязательно");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("text", quote);

      if (tag.trim()) {
        formData.append("tag", tag.trim());
      }

      if (selectedAvatar) {
        formData.append("avatar", selectedAvatar);
      }

      const response = await PredictionService.create(formData);
      console.debug(response);

      setSuccess("Высказывание успешно добавлено!");

      setQuote("");
      setTag("");
      setSelectedAvatar(null);
      setAvatarPreviewUrl(image.src);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    } catch (err: unknown) {
      console.error("Upload failed:", err);
      setError(
        "Ошибка при добавлении высказывания. Пожалуйста, попробуйте снова.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.leftBlock}>
        <div onClick={handleAvatarClick} style={{ cursor: "pointer" }}>
          <input
            type="file"
            ref={avatarInputRef}
            onChange={handleAvatarChange}
            style={{ display: "none" }}
            accept="image/*"
          />
          {avatarPreviewUrl ? (
            <Image
              src={avatarPreviewUrl}
              alt="Аватар автора"
              className={styles.insertImage}
              width={150}
              height={150}
            />
          ) : (
            <div className={styles.avatarUploadPrompt}>
              <div>Добавить аватар</div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.rightBottomBlock}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Добавьте высказывание"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Добавьте тэг"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            required
          />
        </div>
        <div className={styles.blockItem}>
          <p>{text}</p>
        </div>

        {error && <div className={styles.successMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={handleReset}
            className={styles.submitButton}
            disabled={isLoading}
          >
            Сбросить
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Загрузка..." : "Опубликовать"}
          </button>
        </div>
      </div>
    </form>
  );
}
