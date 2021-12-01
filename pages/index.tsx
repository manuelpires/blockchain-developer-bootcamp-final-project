import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import useEagerConnect from "../hooks/useEagerConnect";
import Layout from "../components/Layout";
import Separator from "../components/Separator";
import MintSection from "../components/MintSection";
import Web3Connect from "../components/Web3Connect";
import ImagesSection from "../components/ImagesSection";
import Link from "../components/Link";
import OpenSeaLogo from "../public/opensea-logo.svg";
import EtherscanLogo from "../public/etherscan-logo.svg";
import GitHubLogo from "../public/github-logo.svg";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { account, library } = useWeb3React();
  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <Layout title="Untitled Snakes Project">
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Untitled Snakes Project</h1>
        </header>
        <ImagesSection />

        <Separator />

        {isConnected ? (
          <MintSection />
        ) : (
          <Web3Connect triedToEagerConnect={triedToEagerConnect} />
        )}
      </main>
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
    </Layout>
  );
}
