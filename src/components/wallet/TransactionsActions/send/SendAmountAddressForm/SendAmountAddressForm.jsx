import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import getSymbolFromTicker from "../../../../../utils/getSymbolFromTicker";
import LayoutContainer from "../../../../Layout/LayoutContainer";
import AccessDenied from "../../../../common/AccessDenied";
import { useLocation, useNavigate } from "react-router";

const DUMMY_NETWORK = {
  name: "Ethereum Mainnet",
  chainId: 1,
  balance: "2.134",
  nativeCurrency: {
    symbol: "ETH",
  },
};

const SendAmountAddressForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [recipientError, setRecipientError] = useState("");
  const [amountError, setAmountError] = useState("");

  const network = location.state;

  const validateRecipient = (value) => {
    if (!value.trim()) {
      setRecipientError("Recipient address is required.");
      return false;
    }
    if (!value.startsWith("0x") || value.length !== 42) {
      setRecipientError("Invalid EVM address.");
      return false;
    }
    setRecipientError("");
    return true;
  };

  const validateAmount = (value) => {
    const numeric = parseFloat(value);
    if (!value.trim()) {
      setAmountError("Amount is required.");
      return false;
    }
    if (isNaN(numeric) || numeric <= 0) {
      setAmountError("Amount must be a positive number.");
      return false;
    }
    if (numeric > parseFloat(network.balance)) {
      setAmountError("Amount exceeds balance.");
      return false;
    }
    setAmountError("");
    return true;
  };

  const handleRecipientChange = (e) => {
    const value = e.target.value;
    setRecipientAddress(value);
    validateRecipient(value);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    validateAmount(value);
  };

  const handlePreview = (e) => {
    e.preventDefault();

    // const validRecipient = validateRecipient(recipientAddress);
    // const validAmount = validateAmount(amount);

    // if (validRecipient && validAmount) {
    //   alert(
    //     `Ready to send ${amount} ${getSymbolFromTicker(
    //       network.nativeCurrency.symbol
    //     )} to ${recipientAddress}`
    //   );
    // }

    // if (!validRecipient || !validAmount) {
    //   return;
    // }

    navigate("/wallet/send/confirm", {
      state: {
        network,
        address: recipientAddress,
        amount,
      },
    });
  };

  const handleMaxBalance = () => {
    setAmount(network.balance);
    validateAmount(network.balance);
  };

  if (!network) return <AccessDenied />;

  console.log("network", network);

  return (
    <LayoutContainer>
      <div className="flex flex-col items-center p-4 pt-8 mx-auto bg-[#06033E] shadow-md rounded-md">
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-white font-semibold">
            Send {getSymbolFromTicker(network.symbol)}
          </h1>
          <div />
        </div>

        {/* Coin Info */}
        <div className="mt-2 flex flex-col items-center">
          <div className="w-14 h-14 mb-2 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-black font-bold">
              {getSymbolFromTicker(network.symbol)}
            </span>
          </div>
          <p className="text-gray-400 text-sm">on {network.name}</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handlePreview}
          className="mt-6 w-full max-w-md p-5 black-box-two border-dashed border border-d-color rounded-xl pt-10 pb-10"
        >
          {/* Recipient */}
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipientAddress}
              onChange={handleRecipientChange}
              placeholder="0x..."
              className="w-full py-3 px-4 bg-[#11152b] text-white border border-blue-900 rounded-md text-md outline-none focus:border-purple-800"
            />
            {recipientError && (
              <p className="text-red-500 text-sm mt-1">{recipientError}</p>
            )}
          </div>

          {/* Amount */}
          <div className="mt-6 relative">
            <label className="block text-gray-400 text-sm mb-1">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="e.g. 0.5"
              className="w-full py-3 px-4 bg-[#11152b] text-white border border-blue-900 rounded-md text-md outline-none focus:border-purple-800"
            />
            <p className="mt-2">
              Balance:{" "}
              <span className="text-green-400">
                {network.balance} {getSymbolFromTicker(network.symbol)}
              </span>
            </p>
            <button
              type="button"
              onClick={handleMaxBalance}
              className="absolute right-2 top-2 text-sm text-blue-400 hover:text-blue-500"
            >
              MAX
            </button>
            {amountError && (
              <p className="text-red-500 text-sm mt-1">{amountError}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-lg"
          >
            Preview
          </button>
        </form>
      </div>
    </LayoutContainer>
  );
};

export default SendAmountAddressForm;
