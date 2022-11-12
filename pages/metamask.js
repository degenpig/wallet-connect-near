/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { injected } from "../components/wallet/connector-metamask";

export default function MetaMask({ setConnected }) {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      setConnected(false);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    if (active) {
      setConnected(true);
    }
  }, [active]);
  return (
    <div className="flex flex-col items-center justify-center">
      {active ? (
        <>
          <button
            onClick={disconnect}
            className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
          >
            Disconnect
          </button>
          <span>
            Connected with <b>{account}</b>
          </span>
        </>
      ) : (
        <>
          <button
            onClick={connect}
            className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
          >
            Connect to MetaMask
          </button>
          <span>Not connected</span>
        </>
      )}
    </div>
  );
}
