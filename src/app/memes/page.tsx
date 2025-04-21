// app/memes/page.tsx
import { MemesPage } from "@/landings/memes";
//import { ImageService } from "@/services/api/image";
import { data } from "@/landings/memes/const";

// export default async function Memes() {
//   try {
//     // Получаем данные из админки Django
//     const response = await ImageService.getAll();

//     // Создаем массив мемов с правильными URL
//     const memes = Array.from({length: 11}, (_, i) => i + 3) // ID от 3 до 14
//       .map(id => ({
//         id,
//         title: `Мем ${id}`,
//         image: ImageService.getImageUrl(id)
//       }));

//     return <MemesPage
//       title="Котомемы дня"
//       memes={memes}
//     />;

//   } catch (error) {
//     console.error('Ошибка загрузки мемов:', error);
//     return <MemesPage
//       title="Ошибка загрузки"
//       memes={[]}
//     />;
//   }
// }
export default function Memes() {
  return <MemesPage {...data} />;
}
