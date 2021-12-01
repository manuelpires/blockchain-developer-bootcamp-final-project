import { useEffect, useState } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "../connectors";

const useEagerConnect = () => {
  const { activate, active, setError } = useWeb3React();

  const [tried, setTried] = useState(false);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch((error) => {
          if (error instanceof UnsupportedChainIdError) {
            setError(error);
          }
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, [activate, setError]);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  return tried;
};

export default useEagerConnect;
