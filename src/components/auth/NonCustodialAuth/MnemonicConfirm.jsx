import React, { useState } from "react";
import logo from "../../../assets/arispay-logo.svg";

const MnemonicConfirm = ({ mnemonic, onConfirm }) => {
  const [userWords, setUserWords] = useState(Array(12).fill(""));

  // Handle input changes
  const handleChange = (index, value) => {
    let newWords = [...userWords];

    // Detect if user pastes the full mnemonic phrase
    if (value.trim().split(/\s+/).length === 12) {
      const wordsArray = value.trim().split(/\s+/).slice(0, 12);
      setUserWords(wordsArray.concat(Array(12 - wordsArray.length).fill("")));
      return;
    }

    // If user types manually, update only the specific box
    newWords[index] = value.replace(/\s+/g, ""); // Remove accidental spaces
    setUserWords(newWords);
  };

  // Handle paste event
  const handlePaste = (event) => {
    const pastedData = event.clipboardData.getData("text").trim();
    const wordsArray = pastedData.split(/\s+/);

    if (wordsArray.length === 12) {
      setUserWords(wordsArray.concat(Array(12 - wordsArray.length).fill(""))); // Auto-fill all boxes
      event.preventDefault(); // Prevent default paste behavior
    }
  };

  // Validate Mnemonic
  const handleConfirm = () => {
    if (userWords.join(" ") === mnemonic) {
      onConfirm();
    } else {
      alert("Mnemonic does not match. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center text-center p-2">
      {/* Logo */}
      <div className="mb-12 mt-4">
        <div className="w-40 h-40 rounded-full border border-light flex items-center relative after-border">
          <img src={logo} alt="Arispay Logo" className="w-36 h-36 ml-1 pl-1" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-white mt-4 leading-snug">
        Confirm Your Secret <span className="text-gradient">Phrase</span>
      </h1>

      {/* Progress Bar */}
      <div className="w-full max-w-md mt-4">
        <div className="h-1 bg-gray-600 rounded-full">
          <div className="h-1 w-full bg-purple-600 rounded-full"></div>
        </div>
      </div>

      {/* Instructions */}
      <p className="mt-5 text-gray-500 text-md font-medium">
        Please enter each word in order to verify your Secret Phrase.
        <br />
        <span className="pt-4 w-full block text-lg">
          If you paste all 12 words in any box, they will auto-fill.
        </span>
      </p>

      {/* Mnemonic Input Boxes */}
      <div className="grid grid-cols-3 gap-2 mt-6 w-full max-w-md">
        {userWords.map((word, index) => (
          <input
            key={index}
            type="text"
            value={word}
            onChange={(e) => handleChange(index, e.target.value)}
            onPaste={handlePaste} // Detect paste event
            className="py-2 px-4 bg-gray-700 text-white border-0  rounded-md text-center shadow-md outline-none focus:border-purple-400"
            maxLength={15}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          className="px-10 py-1 rounded-full border border-purple-600 text-purple-400 hover:bg-gray-900 transition"
          onClick={() => setUserWords(Array(12).fill(""))} // Clear all
        >
          Clear
        </button>
        <button
          onClick={handleConfirm}
          disabled={userWords.includes("")} // Disable if any box is empty
          className={`px-12 py-2 rounded-full shadow-md transition ${
            userWords.includes("")
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "px-10 py-2 rounded-full bg-gradient-to-r bg-gradient  text-white  shadow-md hover:opacity-90 transition"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MnemonicConfirm;
