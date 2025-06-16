import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import LayoutContainer from "../../../Layout/LayoutContainer";

const DUMMY_NETWORKS = [
  {
    chainId: 1,
    name: "Ethereum Mainnet",
    symbol: "ETH",
    balance: "0.23",
    price: "3120.45",
    percentChange24h: 2.56,
  },
  {
    chainId: 137,
    name: "Polygon",
    symbol: "MATIC",
    balance: "129.44",
    price: "0.94",
    percentChange24h: -1.73,
  },
  {
    chainId: 56,
    name: "Binance Smart Chain",
    symbol: "BNB",
    balance: "3.12",
    price: "602.33",
    percentChange24h: 0.88,
  },
];

const Send = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNetworks = useMemo(() => {
    return DUMMY_NETWORKS.filter(
      (n) =>
        n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSelectNetwork = (network) => {
    console.log("Selected:", network);
    navigate(`/wallet/send/${network.chainId}`, { state: network });
  };

  return (
    <LayoutContainer>
      <div className="p-6 max-w-lg mx-auto bg-[#06033E] shadow-md rounded-md">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeftIcon className="w-5 h-5 relative -top-2" />
          </button>
          <h1 className="text-lg font-semibold mb-4 text-gradient">
            Select Crypto To Send
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <MagnifyingGlassIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search network or symbol"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white placeholder-gray-400 p-2 pl-10 rounded-md focus:outline-none"
          />
        </div>

        {/* List */}
        <div className="w-full h-96 overflow-auto pr-2 mt-5">
          {filteredNetworks.map((network, index) => (
            <div
              key={network.chainId}
              className={`py-2 flex items-center justify-between cursor-pointer hover:bg-gray-700 rounded-md p-2 transition ${
                index !== filteredNetworks.length - 1
                  ? "border-b border-dashed border-gray-700"
                  : ""
              }`}
              onClick={() => handleSelectNetwork(network)}
            >
              {/* Left: Name, Price, Change */}
              <div>
                <p className="text-white font-medium">{network.name}</p>
                <p className="text-white text-sm">${network.price}</p>
                <p
                  className={`text-xs ${
                    network.percentChange24h >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {network.percentChange24h >= 0 ? "+" : ""}
                  {network.percentChange24h}%
                </p>
              </div>

              {/* Right: Balance */}
              <div className="text-right">
                <p className="text-gray-300 text-xs">
                  {network.balance} {network.symbol}
                </p>
                <p className="text-white text-sm">
                  $
                  {(
                    parseFloat(network.balance) * parseFloat(network.price)
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LayoutContainer>
  );
};

export default Send;
