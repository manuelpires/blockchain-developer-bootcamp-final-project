import HeroImages from "../HeroImages";
import styles from "./HeroSection.module.css";

const HeroSection = () => (
  <section className={styles.section}>
    <header className={styles.header}>
      <h1 className={styles.title}>Untitled Snakes Project</h1>
    </header>
    <HeroImages />
  </section>
);

export default HeroSection;
