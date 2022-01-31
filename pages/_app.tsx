import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import type {
  ExternalProvider,
  JsonRpcFetchFunc,
} from "@ethersproject/providers";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
  return new Web3Provider(provider);
};

const App = ({ Component, pageProps }: AppProps) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Component {...pageProps} />
    <ToastContainer theme="dark" closeOnClick={false} />
  </Web3ReactProvider>
);

export default App;
