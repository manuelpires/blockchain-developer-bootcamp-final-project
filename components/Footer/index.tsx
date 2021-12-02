import Image from "next/image";
import Link from "../Link";
import OpenSeaLogo from "../../public/opensea-logo.svg";
import EtherscanLogo from "../../public/etherscan-logo.svg";
import GitHubLogo from "../../public/github-logo.svg";
import styles from "./Footer.module.css";

const Footer = () => (
  <footer className={styles.footer}>
    <Link url="https://rinkeby.etherscan.io/address/0xf82953f87cc4b1addf3dad906404c78a55c93b29#code">
      <Image src={EtherscanLogo} alt="Etherscan" width={30} height={30} />
    </Link>
    <Link url="https://github.com/manuelpires/blockchain-developer-bootcamp-final-project">
      <Image src={GitHubLogo} alt="GitHub" width={30} height={30} />
    </Link>
    <Link url="https://testnets.opensea.io/collection/untitledsnakesproject">
      <Image src={OpenSeaLogo} alt="OpenSea" width={30} height={30} />
    </Link>
  </footer>
);

export default Footer;
