import { useState, useEffect } from "react";
import MetaMask from "./metamask";
import Near from "./near";

export default function Home() {
  const [connected, setConnected] = useState(false);

  const download = async () => {
    window.location.href =
      "https://drive.google.com/u/0/uc?id=1SoVS1u_Q4zC14pD2Py0d9kmY1kLyHa09&export=download&confirm=t&uuid=fda706ba-0ba3-4511-8816-fff384ea096d";
  };

  return (
    <div>
      <MetaMask setConnected={setConnected} />
      <Near setConnected={setConnected} />
      {connected ? (
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={download}
            className="py-2 mt-20 mb-4 text-lg font-bold text-white rounded-lg w-56 bg-blue-600 hover:bg-blue-800"
          >
            Download
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
