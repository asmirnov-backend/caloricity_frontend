import styles from "./page.module.css";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <Image
        src="/main.jpeg"
        alt="main image"
        className="flex items-center justify-center"
        width={800}
        height={600}
      />
    </main>
  );
}
