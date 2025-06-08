import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { FiShield } from "react-icons/fi";

import Button from "../../common/Button";
import DropdownMenu from "../../common/DropdownMenu";

const WalletHeader = () => {
  // Dummy mnemonics
  const mnemonicItems = [
    { id: "m1", label: "Mnemonic 1", isSelected: true },
    { id: "m2", label: "Mnemonic 2", isSelected: false },
    { id: "m3", label: "Mnemonic 3", isSelected: false },
  ];

  // Dummy networks
  const networkItems = [
    { id: "eth", label: "Ethereum Mainnet", isSelected: true },
    { id: "bsc", label: "Binance Smart Chain", isSelected: false },
    { id: "polygon", label: "Polygon", isSelected: false },
    { id: "sol", label: "Solana", isSelected: false },
  ];

  // State for selections
  const [selectedMnemonic, setSelectedMnemonic] = useState(mnemonicItems[0]);
  const [selectedNetwork, setSelectedNetwork] = useState(networkItems[0]);

  // Handlers
  const handleMnemonicClick = (item) => {
    setSelectedMnemonic(item);
    console.log("Selected mnemonic:", item);
  };

  const handleChainClick = (item) => {
    setSelectedNetwork(item);
    console.log("Selected network:", item);
  };

  const handleManageNetworks = () => {
    console.log("Opening network management modal…");
  };

  const handleAddresses = () => {
    console.log("Showing addresses…");
  };

  const handleLock = () => {
    console.log("Locking wallet…");
  };

  return (
    <>
      {/* Top row: mnemonic + network selectors */}
      <div className="w-full max-w-md black-box border-d-color border-dashed border flex">
        {/* Mnemonic selector */}
        <div className="flex-1 border-d-color border-dashed border-r p-2 flex items-center">
          <FiShield className="text-purple-400 text-xl mr-2" />
          <DropdownMenu
            label={selectedMnemonic.label}
            items={mnemonicItems}
            onClickItem={handleMnemonicClick}
            extra="manage_mnemonics"
          />
        </div>

        {/* Network selector */}
        <div className="flex-1 p-2 flex items-center">
          <DropdownMenu
            label={selectedNetwork.label}
            items={networkItems}
            onClickItem={handleChainClick}
            extra="manage_chains"
            onClickManageNetworks={handleManageNetworks}
          />
        </div>
      </div>

      {/* Bottom row: action buttons */}
      <div className="flex justify-between items-center black-box-two border-d-color border-dashed border border-t-0 p-2">
        <div className="flex space-x-2">
          <Button
            onClick={handleAddresses}
            className="bg-gray-700 border border-gray-600"
          >
            Addresses
          </Button>
          <Button className="bg-gray-700 border border-gray-600">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </Button>
          <Button className="bg-gray-700 border border-gray-600">
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </Button>
          <Button
            onClick={handleLock}
            className="bg-pink-600 text-white hover:bg-red-700"
          >
            Lock wallet
          </Button>
        </div>
      </div>
    </>
  );
};

export default WalletHeader;
