import Image from "next/image";
import snk1 from "../../public/snake-1.png";
import snk2 from "../../public/snake-2.png";
import snk3 from "../../public/snake-3.png";
import snk4 from "../../public/snake-4.png";
import styles from "./HeroImages.module.css";

const HeroImages = () => {
  return (
    <div className={styles.container}>
      {[snk1, snk2, snk3, snk4].map((image, index) => (
        <div key={index} className={styles.imageContainer}>
          <Image src={image} alt="Snake" layout="responsive" priority />
        </div>
      ))}
    </div>
  );
};

export default HeroImages;
