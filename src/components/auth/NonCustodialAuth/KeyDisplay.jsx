import React from "react";
import { useNavigate } from "react-router";
import { FiCheckCircle } from "react-icons/fi";
import logo from "../../../assets/arispay-logo.svg";
import { useKeyGeneration } from "../../../hooks/useKeyGeneration";
import { useSession } from "../../../context/SessionContext";

const KeyDisplay = ({ mnemonic, password }) => {
  const { loading, error } = useKeyGeneration(mnemonic, password);
  const navigate = useNavigate();
  const { createSession } = useSession();

  const handleOpenWallet = () => {
    createSession(password);
    navigate("/wallet");
  };

  // Showing  a loading spinner or message until keys are derived & saved
  if (loading) {
    return (
      <div className="flex flex-col items-center text-center p-2">
        <div className="mt-8">
          <p className="text-white">Generating your wallet…</p>
        </div>
        {/* You could insert a spinner graphic here */}
      </div>
    );
  }

  // 2. If something went wrong, show an error message
  if (error) {
    return (
      <div className="flex flex-col items-center text-center p-2">
        <h2 className="text-xl font-semibold text-red-400">Error!</h2>
        <p className="mt-2 text-gray-500 text-md">
          There was a problem creating your wallet. Please try again.
        </p>
        <pre className="text-xs text-gray-300 mt-2">{error.message}</pre>
      </div>
    );
  }

  //  Otherwise, showing the “Success” UI
  return (
    <div className="flex flex-col items-center text-center p-2">
      {/* Logo */}
      <div className="mb-8 mt-4">
        <div className="w-38 h-38 rounded-full border border-light flex items-center relative after-border2">
          <img src={logo} alt="Arispay Logo" className="w-36 h-36 ml-1 pl-1" />
        </div>
      </div>

      {/* Success Message */}
      <h1 className="text-2xl font-semibold text-white">
        Your wallet is ready to <span className="text-gradient ml-2">use!</span>
      </h1>
      <p className="mt-2 text-gray-500 text-md font-medium">
        Remember to backup and keep your Secret Phrase safe.
      </p>

      {/* Success Icon */}
      <div className="mt-6">
        <FiCheckCircle className="text-icon w-16 h-16" />
      </div>

      {/* Default Wallet Instruction */}
      <div className="flex items-center justify-between w-full px-5 rounded-t-xl py-6 black-box border-d-color border-dashed border border-b-0 hover:bg-[#1b2040] transition mt-6">
        <h2 className="text-xl text-center text-purple-400">
          Click the top‐right of your browser and pin Arispay Wallet for easy
          access.
        </h2>
      </div>

      {/* Open Wallet Button */}
      <div className="items-center justify-between w-full px-5 py-4 mb-4 rounded-b-xl black-box-two border-dashed border border-d-color hover:bg-[#1b2040] transition">
        <p className="text-md text-gray-400 my-5">
          To enable seamless dApp connections, set Arispay as your default.
        </p>
        <button
          onClick={handleOpenWallet}
          className="px-20 py-2 rounded-full bg-gradient-to-r bg-gradient text-white shadow-md hover:opacity-90 transition mb-3"
        >
          Open Wallet
        </button>
      </div>

      {/* Footer */}
      <div className="flex justify-center items-center mt-6 text-gray-400 text-sm">
        <span>© 2024 Arispay</span>
        <span className="mx-2">•</span>
        <span className="hover:text-purple-400 cursor-pointer">
          Privacy Policy
        </span>
      </div>
    </div>
  );
};

export default KeyDisplay;
