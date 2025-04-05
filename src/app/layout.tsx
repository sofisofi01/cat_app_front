import type { Metadata } from "next";
import '@/styles/styles.scss';
import { Page } from "@/containers/Page";

const FAVICON_FOLDER = 'public/images/favicon'

export const metadata: Metadata = {
  title: "Кот-предсказатель",
  description: "Сервис генерирует случайные мысли кота на основе загруженных фотографий. Пользователи могут взаимодействовать с приложением, задавая вопросы и получая забавные ответы.",
  icons: {
    shortcut: `${FAVICON_FOLDER}/favicon.ico`,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = { menu:['1','2']}
  return (
    <html lang="ru">  
    <Page header={header}>{children}</Page>
    </html>
  );
}
