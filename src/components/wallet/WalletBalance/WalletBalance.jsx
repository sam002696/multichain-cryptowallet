import React, { useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

const WalletBalance = () => {
  // Dummy starting network info
  const [selectedNetworkInfo, setSelectedNetworkInfo] = useState({
    balance: "1.2345",
    ticker: "ETH",
  });

  // On “refresh”, just generate a new random balance for demo
  const handleRefreshBalance = () => {
    const newBalance = (Math.random() * 5).toFixed(4);
    setSelectedNetworkInfo((prev) => ({
      ...prev,
      balance: newBalance,
    }));
  };

  return (
    <div className="text-center pt-5 flex justify-center items-center screen-fit-9">
      <p className="text-3xl font-bold py-5">
        {selectedNetworkInfo.balance} {selectedNetworkInfo.ticker}
      </p>

      <button onClick={handleRefreshBalance} className="ml-4">
        <ArrowPathIcon
          className="h-5 w-5 text-gray-500 hover:text-gray-700"
          aria-label="Refresh balance"
        />
      </button>
    </div>
  );
};

export default WalletBalance;
