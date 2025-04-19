import { ExtraHeader } from "@/components/ExtraHeader";
import styles from "./main.module.scss";
import { MainProps } from "./types";
import { Image } from "@/components/Image";

export function MainPage({ caption, btnText, background, cat }: MainProps) {
  return (
    <div className={styles.wrapper}>
      <Image {...background} className={styles.background} />
      <Image {...cat} className={styles.cat} />
      <h1 className={styles.caption}>{caption}</h1>
      <button className={styles.btn}>{btnText}</button>
      <ExtraHeader />
    </div>
  );
}
