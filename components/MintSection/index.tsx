import Image from "next/image";
import { useState, useCallback, useEffect, useMemo } from "react";
import { utils } from "ethers";
import { toast } from "react-toastify";
import useSnakesContract from "../../hooks/useSnakesContract";
import Button from "../Button";
import LessIcon from "../../public/less-icon.svg";
import MoreIcon from "../../public/more-icon.svg";
import styles from "./MintSection.module.css";

const MintSection = () => {
  // Local state
  const [amount, setAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMinting, setIsMinting] = useState(false);

  // Contract state
  const [isSaleActive, setIsSaleActive] = useState(false);
  const [currentSupply, setCurrentSupply] = useState(0);

  const snakesContract = useSnakesContract();

  const getContractState = useCallback(async () => {
    if (snakesContract) {
      const active = await snakesContract.isSaleActive();
      setIsSaleActive(active);
      if (active) {
        const supply = await snakesContract.totalSupply();
        setCurrentSupply(supply.toNumber());
      }
    }
    setIsLoading(false);
  }, [snakesContract]);

  const currentPrice = useMemo(() => amount * 0.001, [amount]);

  const mint = async () => {
    try {
      if (snakesContract) {
        const tx = await snakesContract.mint(amount, {
          gasLimit: 300000,
          value: utils.parseEther(String(currentPrice)),
        });
        setIsMinting(true);
        toast.promise(tx.wait(), {
          pending: "Pending transaction...",
          success: `"Greetings, master." ${Array.from(Array(amount))
            .map((_) => "🐍")
            .join("")}`,
          error: "Failed 💀",
        });
        await tx.wait();
        console.log("Minted -- Tx hash:", tx.hash);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsMinting(false);
      getContractState();
    }
  };

  const onLessAmountPress = () => {
    if (amount === 2) {
      setAmount(amount - 1);
    }
  };

  const onMoreAmountPress = () => {
    if (amount === 1) {
      setAmount(amount + 1);
    }
  };

  useEffect(() => {
    getContractState();
  }, [getContractState]);

  if (isLoading) {
    return null;
  }

  if (!isSaleActive) {
    return <h1>Sale will be active soon</h1>;
  }

  return (
    <section className={styles.section}>
      <h2>
        <span className={styles.currentSupply}>{currentSupply}</span> / 100
        minted
      </h2>
      <div className={styles.buttonsContainer}>
        <Button
          isRound
          onClick={onLessAmountPress}
          disabled={isMinting || currentSupply === 100}
        >
          <Image src={LessIcon} alt="less" width={40} height={40} />
        </Button>

        <Button onClick={mint} disabled={isMinting || currentSupply === 100}>
          {`Mint ${amount} - ${currentPrice} Ξ`}
        </Button>

        <Button
          isRound
          onClick={onMoreAmountPress}
          disabled={isMinting || currentSupply === 100}
        >
          <Image src={MoreIcon} alt="more" width={40} height={40} />
        </Button>
      </div>
    </section>
  );
};

export default MintSection;
