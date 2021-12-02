import { useWeb3React } from "@web3-react/core";
import useEagerConnect from "../hooks/useEagerConnect";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import Separator from "../components/Separator";
import MintSection from "../components/MintSection";
import Web3Connect from "../components/Web3Connect";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { account, library } = useWeb3React();
  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <Layout title="Untitled Snakes Project">
      <main className={styles.main}>
        <HeroSection />
        <Separator />
        {isConnected ? (
          <MintSection />
        ) : (
          <Web3Connect triedToEagerConnect={triedToEagerConnect} />
        )}
      </main>
    </Layout>
  );
}
