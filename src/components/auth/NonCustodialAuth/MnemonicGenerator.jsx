import React, { useState } from "react";
import { Buffer } from "buffer";
import { generateMnemonic } from "bip39";
import { FiAlertTriangle } from "react-icons/fi";
import logo from "../../../assets/arispay-logo.svg";

// Ensure Buffer polyfill
window.Buffer = Buffer;

const MnemonicGenerator = ({ onNext }) => {
  const [mnemonic, setMnemonic] = useState(generateMnemonic());

  return (
    <div className="flex flex-col items-center text-center p-2">
      {/* Logo */}
      <div className="mb-12 mt-4">
        <div className="w-40 h-40 rounded-full border border-light flex items-center relative after-border">
          <img src={logo} alt="Arispay Logo" className="w-36 h-36 ml-1 pl-1" />
        </div>
      </div>
      {/* Title */}
      <h1 className="text-3xl font-semibold text-white mt-12 leading-snug">
        Back Up Your Secret
        <br /> <span className="text-gradient">Phrase</span>
      </h1>

      {/* Progress Bar */}
      <div className="w-full max-w-md mt-6">
        <div className="h-1 bg-gray-600 rounded-full">
          <div className="h-1 w-1/2 bg-purple-600 rounded-full"></div>
        </div>
      </div>

      {/* Backup Warning */}
      <div className="mt-8 w-full max-w-md p-5 black-box border-d-color border-dashed border  rounded-xl flex items-center">
        <FiAlertTriangle className="text-pink-500  mr-3 size-14" />
        <p className="text-md font-normal text-gray-400 text-left">
          Back up safely these 12 words in a piece of paper and never share it
          with anyone.
        </p>
      </div>

      {/* Mnemonic Words Box */}
      <div className="mt-3 w-full max-w-md p-5 black-box-two border-d-color border-dashed border  rounded-xl flex items-center hover:bg-[#1b2040] transition text-gray-300 text-left">
        {mnemonic}
      </div>

      {/* Buttons */}
      <div className="flex justify-between w-full max-w-md mt-6 mb-6">
        <button
          className="px-10 py-1 rounded-full border border-purple-600 text-purple-400 hover:bg-gray-900 transition"
          onClick={() => console.log("Cancel")}
        >
          Cancel
        </button>
        <button
          onClick={() => onNext(mnemonic)}
          className="px-10 py-2 rounded-full bg-gradient-to-r bg-gradient  text-white  shadow-md hover:opacity-90 transition"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default MnemonicGenerator;
