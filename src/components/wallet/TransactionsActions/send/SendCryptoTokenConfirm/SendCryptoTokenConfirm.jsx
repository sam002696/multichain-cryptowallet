import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline";

import getSymbolFromTicker from "../../../../../utils/getSymbolFromTicker";
import { truncateAddress } from "../../../../../utils/addressTruncateUtils";
import LayoutContainer from "../../../../Layout/LayoutContainer";
import AccessDenied from "../../../../common/AccessDenied";
import EditGasEstimation from "../GasFeePriorityModal/EditGasEstimation";
import { useSelector } from "react-redux";

const DUMMY_GAS_OPTIONS = [
  {
    type: "Low",
    maxFee: "0.00042 ETH",
    priorityFee: "0.00021 ETH",
    time: "15 - 45 sec",
    icon: "🐢",
  },
  {
    type: "Market",
    maxFee: "0.00065 ETH",
    priorityFee: "0.0003 ETH",
    time: "10 - 30 sec",
    icon: "🦊",
  },
  {
    type: "Aggressive",
    maxFee: "0.0011 ETH",
    priorityFee: "0.0007 ETH",
    time: "5 - 15 sec",
    icon: "🐎",
  },
];

const SendCryptoTokenConfirm = () => {
  const [transactionReceiptInfo, setTransactionReceiptInfo] = useState({});
  const { selectedNetworkInfo } = useSelector((s) => s.network);
  //  Extract data from navigation state

  const navigate = useNavigate();
  const location = useLocation();

  const { network, address, amount } = location.state || {};

  const [open, setOpen] = useState(false);
  const [gasOptions, setGasOptions] = useState(DUMMY_GAS_OPTIONS);
  const [selectedGasFee, setSelectedGasFee] = useState("Market");
  const [gasMarket, setGasMarket] = useState({});
  const [loading, setLoading] = useState(false);

  const fromAddress = truncateAddress(selectedNetworkInfo?.account);
  const toAddress = truncateAddress(address);
  const symbol = getSymbolFromTicker(network?.symbol);
  const estimatedFee = gasMarket?.maxFee || "Loading...";
  const totalUsd = network.price
    ? `$${(parseFloat(amount) * parseFloat(network.price)).toFixed(2)}`
    : "$0.00";

  useEffect(() => {
    const selected = gasOptions.find((g) => g.type === selectedGasFee);
    if (selected) {
      setGasMarket(selected);
    }
  }, [gasOptions, selectedGasFee]);

  //  Handle missing state
  if (!network || !address || !amount) {
    return <AccessDenied />;
  }

  const handleGasFee = () => {
    setOpen(true);
  };

  const confirmTransaction = () => {
    setLoading(true);
    // setTimeout(() => {
    //   alert(
    //     `✅ Confirmed sending ${amount} ${symbol} to ${address} with fee ${estimatedFee}`
    //   );
    //   setLoading(false);
    //   navigate("/wallet");
    // }, 1200);

    // confirmEthereumTransaction({
    //   network,
    //   address,
    //   amount,
    //   Ethkey,
    //   web3,
    //   dispatch,
    //   navigate,
    //   setLoading,
    //   setTransactionReceiptInfo,
    //   transactionSendInfo,
    // });
  };

  console.log("transactionReceipt :>> ", transactionReceiptInfo);

  return (
    <>
      <LayoutContainer>
        <div className="p-6 max-w-lg mx-auto bg-[#06033E] shadow-md rounded-md min-h-screen">
          {/* Header */}
          <div className="flex items-center justify-between w-full mb-6">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-white font-semibold">Confirm</h1>
            <div />
          </div>

          {/* Token Info */}
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-2">
              <span className="text-black font-bold">{symbol}</span>
            </div>
            <div>
              <p className="text-white">
                {network.balance} {symbol} ($
                {(network.price * network.balance).toFixed(2)})
              </p>
            </div>
          </div>

          {/* Info Rows */}
          <div className="text-white space-y-8 mb-4">
            <div className="flex justify-between">
              <span>Token</span>
              <span>{symbol}</span>
            </div>
            <div className="flex justify-between">
              <span>From</span>
              <span>{fromAddress}</span>
            </div>
            <div className="flex justify-between">
              <span>To</span>
              <span>{toAddress}</span>
            </div>
            <div className="flex justify-between">
              <span>Amount</span>
              <span>{amount}</span>
            </div>
            <div className="flex justify-between">
              <span>Network</span>
              <span>{network.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Estimated Fee</span>
              <span>{estimatedFee}</span>
              <PencilIcon
                onClick={handleGasFee}
                className="size-5 ml-2 text-blue-500 cursor-pointer"
              />
            </div>
            <div className="flex justify-between">
              <span>Total USD</span>
              <span>{totalUsd}</span>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={confirmTransaction}
            className="bg-green-500 text-white font-medium w-full py-2 px-4 rounded-lg flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </LayoutContainer>

      <EditGasEstimation
        open={open}
        setOpen={setOpen}
        transactionData={{ network, address, amount }}
        gasOptions={gasOptions}
        setGasOptions={setGasOptions}
        selectedGasFee={selectedGasFee}
        setSelectedGasFee={setSelectedGasFee}
      />
    </>
  );
};

export default SendCryptoTokenConfirm;
