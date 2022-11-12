/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import initContract from "../components/wallet/connector-near";

export default function Near({ setConnected }) {
  const [user, setUser] = useState("");

  async function connect() {
    try {
      let { currentUser, nearConfig, walletConnection } = await initContract();
      console.log(currentUser);
      await walletConnection.requestSignIn(
        "dungeon03.testnet",
        "NEAR Block Dice"
      );
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      let { currentUser, nearConfig, walletConnection } = await initContract();
      walletConnection.signOut();
      window.location.replace(window.location.origin);
      setConnected(false);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    if (window.location.href.split("?account_id=")[1] !== undefined) {
      setUser(window.location.href.split("?account_id=")[1].split("&")[0]);
      setConnected(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {user ? (
        <>
          <button
            onClick={disconnect}
            className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
          >
            Disconnect
          </button>
          <span>
            Connected with <b>{user}</b>
          </span>
        </>
      ) : (
        <>
          <button
            onClick={connect}
            className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
          >
            Connect to NEAR
          </button>
          <span>Not connected</span>
        </>
      )}
    </div>
  );
}
