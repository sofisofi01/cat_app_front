"use client";
import { UploadPageProps } from "./types";
import styles from "./form.module.scss";
import { Image } from "@/components/Image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { ImageService } from "@/services/api";

export function FormMemes({ text, image: initialImage }: UploadPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialImage?.src || "");
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLeftBlockClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Пожалуйста, выберите файл изображения");
      return;
    }

    setError("");
    setSuccess("");

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile || !name.trim()) {
      setError("Изображение и название обязательны");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await ImageService.upload(selectedFile, name.trim(), tag.trim());

      setSuccess("Изображение успешно загружено!");
      setPreviewUrl(initialImage.src || "");
      setName("");
      setTag("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Upload failed:", err);
      setError(
        "Ошибка при загрузке изображения. Пожалуйста, попробуйте снова.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(initialImage.src || "");
    setName("");
    setTag("");
    setError("");
    setSuccess("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div
        className={styles.leftBlock}
        onClick={handleLeftBlockClick}
        style={{ cursor: "pointer" }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          accept="image/*"
        />
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Выбранное изображение"
            className={styles.insertImage}
            width={300}
            height={300}
          />
        ) : (
          <div className={styles.uploadPrompt}>
            <div className={styles.uploadIcon}>+</div>
            <div>Нажмите для загрузки изображения</div>
          </div>
        )}
      </div>

      <div className={styles.rightBottomBlock}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.inputField}
            placeholder="Добавьте название"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          />
        </div>
        <div className={styles.blockItem}>
          <p>{text}</p>
        </div>

        {error && <div className={styles.successMessage}>{error}</div>}
        {success && <div className={styles.successMessage}>{success}</div>}

        <div className={styles.submitButtonContainer}>
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
            {isLoading ? "Загрузка..." : "Отправить"}
          </button>
        </div>
      </div>
    </form>
  );
}
