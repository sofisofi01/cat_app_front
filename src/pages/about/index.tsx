import { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '@/containers/Header';
import { Footer } from '@/containers/Footer';
import styles from './About.module.scss';
import { data } from '@/containers/Page/const';

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>О нас | Cat App</title>
      </Head>

      <div className={styles.body}>
        <Header menu={data} />
        <main className={styles.main}>
          <div className={styles.aboutContent}>
            <div className={styles.floatingBooks}>
              <img src="/images/favicon/book1.png" alt="book left top" className={styles.bookLeftTop} />
              <img src="/images/favicon/book1.png" alt="book left bottom" className={styles.bookLeftBottom} />
              <img src="/images/favicon/book2.png" alt="book right top" className={styles.bookRightTop} />
              <img src="/images/favicon/book2.png" alt="book right bottom" className={styles.bookRightBottom} />
              <img src="/images/favicon/book2.png" alt="book left middle" className={styles.bookLeftMiddle} />
              <img src="/images/favicon/book1.png" alt="book right middle" className={styles.bookRightMiddle} />
            </div>

            <div className={styles.introContainer}>
              <img
                src="/images/favicon/cat_moon.png"
                alt="Funny cat animation"
                className={styles.catGif}
                loading="lazy"
              />
              <h1>
                Мир, где мемы шепчут, коты видят сны, а предсказания танцуют в тенях. 
                Здесь время течёт вспять, а мысли становятся реальностью.
              </h1>
            </div>

            <div className={styles.boxContainer}>
              <div className={styles.contentBox} data-number="1">
                <h2>Мемы</h2>
                <p>
                  Погрузитесь в мир абсурда и юмора! Здесь собраны самые свежие, странные и смешные мемы, которые заставят вас улыбнуться, задуматься или просто сказать: "Что это было?!"
                </p>
              </div>

              <div className={styles.contentBox} data-number="2">
                <h2>Котомыслы недели</h2>
                <p>
                  Узнайте, о чём думают коты этой недели. Самые неожиданные, забавные и философские мысли пушистых оракулов, которые точно заставят вас взглянуть на мир их глазами.
                </p>
              </div>

              <div className={styles.contentBox} data-number="3">
                <h2>Загрузить кота</h2>
                <p>
                  Поделитесь фото своего кота, и мы расскажем, о чём он думает. Возможно, он мечтает о мировом господстве или просто хочет ещё одну порцию корма. Ваш кот станет частью нашей коллекции котомыслей! 🐾
                </p>
              </div>
              {/* <div className={`${styles.contentBox} ${styles.contactBox}`}>
                <div className={styles.contactRow}>
                  <h2>Связаться с нами</h2>
                  <div className={styles.socialIcons}>
                    <a href="mailto:your@email.com" className={styles.socialIcon}>
                      <img src="/images/favicon/email1.png" alt="Email" />
                      <img src="/images/favicon/email.png" alt="Email hover" />
                    </a>
                    <a href="https://t.me/your_telegram" className={styles.socialIcon}>
                      <img src="/images/favicon/telegram1.png" alt="Telegram" />
                      <img src="/images/favicon/telegram.png" alt="Telegram hover" />
                    </a>
                    <a href="https://vk.com/your_vk" className={styles.socialIcon}>
                      <img src="/images/favicon/vk1.png" alt="VK" />
                      <img src="/images/favicon/vk.png" alt="VK hover" />
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
