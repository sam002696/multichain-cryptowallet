import React, { useState } from "react";

const cryptoAssets = [
  { name: "Bitcoin", symbol: "BTC", balance: "0.0456" },
  { name: "Ethereum", symbol: "ETH", balance: "1.2345" },
  { name: "Litecoin", symbol: "LTC", balance: "12.3456" },
];

const tokenAssets = [
  { name: "USDT", symbol: "USDT", balance: "500.00" },
  { name: "Chainlink", symbol: "LINK", balance: "42.00" },
  { name: "Uniswap", symbol: "UNI", balance: "128.00" },
];

const AssetTabs = () => {
  const [activeTab, setActiveTab] = useState("crypto");

  return (
    <div className="pt-5">
      <div className="bg-gray-800 text-white black-box-two rounded-t-lg">
        {/* Tab buttons */}
        <div className="flex border-b-2 border-gray-600">
          <button
            className={`flex-1 text-center py-2 font-bold text-sm transition ${
              activeTab === "crypto"
                ? "border-b-4 border-pink-400 bg-gray-700"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("crypto")}
          >
            Crypto
          </button>
          <button
            className={`flex-1 text-center py-2 font-bold text-sm transition ${
              activeTab === "tokens"
                ? "border-b-4 border-pink-400 bg-gray-700"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("tokens")}
          >
            Tokens
          </button>
        </div>

        {/* Tab content */}
        <div className="p-4">
          {activeTab === "crypto" && (
            <ul className="space-y-2">
              {cryptoAssets.map(({ name, symbol, balance }) => (
                <li
                  key={symbol}
                  className="flex justify-between px-4 py-2 bg-gray-700 rounded-lg"
                >
                  <span>
                    {name} <span className="text-gray-400">({symbol})</span>
                  </span>
                  <span className="font-mono">{balance}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === "tokens" && (
            <ul className="space-y-2">
              {tokenAssets.map(({ name, symbol, balance }) => (
                <li
                  key={symbol}
                  className="flex justify-between px-4 py-2 bg-gray-700 rounded-lg"
                >
                  <span>
                    {name} <span className="text-gray-400">({symbol})</span>
                  </span>
                  <span className="font-mono">{balance}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetTabs;
