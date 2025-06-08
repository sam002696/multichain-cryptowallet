import { useState } from "react";
import { useNavigate } from "react-router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import logo from "../../../assets/arispay-logo.svg";
import { getFromDatabase } from "../../../utils/AuthUtility/indexedDB";
import LayoutContainer from "../../Layout/LayoutContainer";
import ResetWalletModal from "../ResetWallet/ResetWalletModal";
import {
  decryptData,
  generateKeyFromPassword,
} from "../../../utils/AuthUtility/cryptoUtils";
import { useSession } from "../../../context/SessionContext";

const PasswordUnlock = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { createSession } = useSession();

  // Unlock Handler
  const handleUnlock = async () => {
    try {
      const walletData = await getFromDatabase(
        "WalletDB",
        "walletStore",
        "walletData"
      );
      if (!walletData) {
        setError("No wallet data found. Please register again.");
        return;
      }

      const { mnemonic } = walletData;
      const encryptionKey = await generateKeyFromPassword(password);

      // Decrypt mnemonic to verify password
      await decryptData(encryptionKey, mnemonic.encrypted, mnemonic.iv);

      createSession(password);
      navigate("/wallet"); // Redirecting to wallet dashboard
    } catch (err) {
      console.log("err", err);
      setError("Invalid password. Please try again.");
    }
  };

  return (
    <LayoutContainer>
      <div className="flex flex-col items-center text-center p-2">
        {/* Logo */}
        <div className="mb-8 mt-4">
          <div className="w-38 h-38 rounded-full border border-light flex items-center relative after-border2">
            <img
              src={logo}
              alt="Arispay Logo"
              className="w-36 h-36 ml-1 pl-1"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-white">
          Secure and trusted multi-chain crypto{" "}
          <span className="text-gradient ml-2">wallet</span>
        </h1>

        <p className="mt-5 text-gray-500 text-md font-medium">
          The multi-chain wallet trusted by millions
        </p>

        {/* Password Input */}
        <div className="mt-8 text-left w-full max-w-md">
          <label className="block text-left text-md font-semibold text-gray-300 mb-2">
            Password
          </label>
          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 px-4 bg-[#11152b] text-white border border-blue-900 rounded-md text-md outline-none focus:border-purple-800"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FiEyeOff className="relative top-1" size={20} />
              ) : (
                <FiEye className="relative top-1" size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Unlock Button */}
        <div className="mt-4 w-full max-w-md rounded-xl">
          <button
            onClick={handleUnlock}
            disabled={!password}
            className={`mt-6 w-full py-3 rounded-full text-white text-lg font-semibold shadow-md transition ${
              password
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            Unlock
          </button>
        </div>

        {/* Reset Wallet Button */}
        <div className="mt-6 text-gray-400 text-sm">
          <p>
            Can't login? You can erase your current wallet and set up a new one
          </p>
          <button
            className="text-pink-400 hover:underline mt-5"
            onClick={() => setIsModalOpen(true)} // Open Modal
          >
            Reset wallet
          </button>
        </div>
      </div>

      {/* Reset Wallet Modal */}
      <ResetWalletModal open={isModalOpen} setOpen={setIsModalOpen} />
    </LayoutContainer>
  );
};

export default PasswordUnlock;
