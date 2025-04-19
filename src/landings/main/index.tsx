import { ExtraHeader } from "@/components/ExtraHeader";
import styles from "./main.module.scss";

export function MainPage() {
  return (
    <div className={styles.wrapper}>
      <ExtraHeader page={"about"} />
    </div>
  );
}
