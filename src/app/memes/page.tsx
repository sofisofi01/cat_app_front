import { MemesPage } from "@/landings/memes";
import { ImageService } from "@/services/api/image";

export default async function Memes() {
  // Получаем данные с бэкенда
  const response = await ImageService.getAll();
  const memes = response.predictions.map((item) => ({
    id: item.id,
    title: item.tag || item.description || "Без названия",
    image: item.url,
    likes: item.likes || 0,
  }));

  return <MemesPage title="Котомемы" memes={memes} />;
}
