import styles from "./page.module.css";
import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <main className={styles.main}>
      <Button color="primary">Click me</Button>
    </main>
  );
}
