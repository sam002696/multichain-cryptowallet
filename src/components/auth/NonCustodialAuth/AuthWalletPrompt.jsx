import React from "react";
import { FiPlus, FiShield, FiArrowRight } from "react-icons/fi";
import logo from "../../../assets/arispay-logo.svg";

const AuthWalletPrompt = ({ onSelectOption }) => {
  return (
    <div className="flex flex-col items-center text-center p-2">
      {/* Logo */}
      <div className="mb-8 mt-4">
        <div className="w-40 h-40 rounded-full border border-light flex items-center relative after-border">
          <img src={logo} alt="Arispay Logo" className="w-36 h-36 ml-1 pl-1" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-white mt-12 leading-snug">
        Welcome to the <br />
        <span className="text-gradient">Arispay</span>
      </h1>
      <p className="text-gray-500 text-md mt-1 font-medium">
        The multi-chain wallet trusted by millions
      </p>

      {/* Action Buttons */}
      <div className="w-full max-w-md mt-10">
        {/* Create Wallet Button */}
        <button
          onClick={() => onSelectOption("create")}
          className="flex items-center justify-between w-full px-5 rounded-t-xl py-6 black-box border-d-color border-dashed border border-b-0 hover:bg-[#1b2040] transition"
        >
          <div className="flex items-center gap-3">
            <FiPlus className="text-pink-400 text-2xl" />
            <div className="text-left">
              <h2 className="text-2xl font-light text-gray-400">
                Create a new wallet
              </h2>
              <p className="text-sm text-white mt-1">
                Start fresh with a new wallet
              </p>
            </div>
          </div>
          <FiArrowRight className="text-gray-500 size-6" />
        </button>

        {/* Import Wallet Button */}
        <button
          onClick={() => onSelectOption("recover")}
          className="flex items-center justify-between w-full px-5 py-6 mb-4 rounded-b-xl black-box-two border-dashed border border-d-color hover:bg-[#1b2040] transition"
        >
          <div className="flex items-center gap-3">
            <FiShield className="text-purple-400 text-2xl" />
            <div className="text-left">
              <h2 className="text-xl text-gray-400">
                Import or recover wallet
              </h2>
              <p className="text-sm text-white mt-1">
                Import with your Secret Phrase
              </p>
            </div>
          </div>
          <FiArrowRight className="text-gray-500 size-6" />
        </button>
      </div>
    </div>
  );
};

export default AuthWalletPrompt;
