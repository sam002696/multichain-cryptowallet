import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import ETHGasFeeList from "./ETHGasFeeList";

const EditGasEstimation = ({
  open,
  setOpen,
  transactionData,
  setGasOptions,
  gasOptions,
  setSelectedGasFee,
  selectedGasFee,
}) => {
  const [networkStatus, setNetworkStatus] = useState({});
  const [animation, setAnimation] = useState(false);

  const { network } = transactionData || {};

  const topEthValue = network?.balance || "1.23";
  const tokenTicker = network?.chain || "ETH";
  const topUsdValue = "$3.12";

  const dummyGasOptions = [
    {
      type: "Low",
      time: "30 - 60 sec",
      maxFee: "0.00042 ETH",
      priorityFee: "0.00021 ETH",
      network: network?.name || "Ethereum",
      icon: "🐢",
    },
    {
      type: "Market",
      time: "10 - 30 sec",
      maxFee: "0.00065 ETH",
      priorityFee: "0.0003 ETH",
      network: network?.name || "Ethereum",
      icon: "🦊",
    },
    {
      type: "Aggressive",
      time: "5 - 15 sec",
      maxFee: "0.0011 ETH",
      priorityFee: "0.0007 ETH",
      network: network?.name || "Ethereum",
      icon: "🐎",
    },
  ];

  const dummyStatus = {
    baseFee: "24.5 GWEI",
    congestion: "61.8%",
    status: "Stable",
  };

  useEffect(() => {
    if (open) {
      setAnimation(true);
      setTimeout(() => {
        setGasOptions(dummyGasOptions);
        setNetworkStatus(dummyStatus);
        setAnimation(false);
      }, 800);
    }
  }, [open]);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-10">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-[#1C1C1C] text-white shadow-xl p-4">
          <div className="flex items-center justify-between px-4 pt-4">
            <Dialog.Title className="text-lg font-semibold">
              Edit Network Fee
            </Dialog.Title>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <div className="px-4 mt-2 flex items-baseline space-x-2">
            <p className="text-2xl font-bold">
              {topEthValue} {tokenTicker}
            </p>
            <p className="text-sm text-gray-300">{topUsdValue}</p>
          </div>

          <div className="px-4 py-4">
            <ETHGasFeeList
              gasOptions={gasOptions}
              networkStatus={networkStatus}
              setSelectedGasFee={setSelectedGasFee}
              selectedGasFee={selectedGasFee}
              setOpen={setOpen}
              animation={animation}
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditGasEstimation;
