import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { FiShield } from "react-icons/fi";

import Button from "../../common/Button";
import DropdownMenu from "../../common/DropdownMenu";
import { useNavigate } from "react-router";
import { useSession } from "../../../context/SessionContext";
import { useDispatch, useSelector } from "react-redux";
import { selectNetwork } from "../../../store/slices/networkSlice";

const WalletHeader = () => {
  const { selectedNetworkInfo } = useSelector((s) => s.network);
  const dispatch = useDispatch();
  const { destroySession } = useSession();
  const navigate = useNavigate();
  // Dummy mnemonics
  const mnemonicItems = [
    { id: "m1", name: "Mnemonic 1", isSelected: true },
    { id: "m2", name: "Mnemonic 2", isSelected: false },
    { id: "m3", name: "Mnemonic 3", isSelected: false },
  ];

  // State for selections
  const [selectedMnemonic, setSelectedMnemonic] = useState(mnemonicItems[0]);

  // Handlers
  const handleMnemonicClick = (item) => {
    setSelectedMnemonic(item);
    // console.log("Selected mnemonic:", item);
  };

  const handleChainClick = (item) => {
    // console.log("Selected network:", item);

    dispatch(selectNetwork(item));
  };

  const handleManageNetworks = () => {
    navigate("/network/manage-network");
  };

  const handleAddresses = () => {
    console.log("Showing addresses…");
  };

  const handleLock = () => {
    destroySession(); // End the session
    navigate("/unlock"); // Redirect to unlock page
  };

  const enabledNetworks = Object.values(
    JSON.parse(localStorage.getItem("networkEnabled") || "{}") || []
  );

  return (
    <>
      {/* Top row: mnemonic + network selectors */}
      <div className="w-full max-w-md black-box border-d-color border-dashed border flex">
        {/* Mnemonic selector */}
        <div className="flex-1 border-d-color border-dashed border-r p-2 flex items-center">
          <FiShield className="text-purple-400 text-xl mr-2" />
          <DropdownMenu
            label={selectedMnemonic.name}
            items={mnemonicItems}
            onClickItem={handleMnemonicClick}
            extra="manage_mnemonics"
          />
        </div>

        {/* Network selector */}
        <div className="flex-1 p-2 flex items-center">
          <DropdownMenu
            selectedNetworkInfo={selectedNetworkInfo}
            label={selectedNetworkInfo.name}
            items={enabledNetworks}
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
