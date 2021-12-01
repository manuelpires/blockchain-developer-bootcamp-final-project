import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [Number(process.env.NEXT_PUBLIC_CHAIN_ID)],
});
