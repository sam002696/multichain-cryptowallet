import React, { useState } from "react";
import { FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
import logo from "../../../assets/arispay-logo.svg";

const PasswordSetup = ({ onPasswordSet }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Password validation rules
  const passwordValidations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    digit: /\d/.test(password),
    symbol: /[\W_]/.test(password),
  };

  const isPasswordStrong = Object.values(passwordValidations).every(Boolean);

  // Handle password submission
  const handleSetPassword = () => {
    if (!isPasswordStrong) {
      alert("Please create a stronger password.");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
    } else if (!agreed) {
      alert("Please agree to the Terms of Service.");
    } else {
      onPasswordSet(password);
    }
  };

  return (
    <div className="flex flex-col items-center text-center p-2">
      {/* Logo */}
      <div className="mb-8 mt-4">
        <div className="w-38 h-38 rounded-full border border-light flex items-center relative after-border2">
          <img src={logo} alt="Arispay Logo" className="w-36 h-36 ml-1 pl-1" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-white">
        Set<span className="text-gradient ml-2">Password</span>
      </h1>
      <p className="mt-2 text-gray-500 text-md font-medium">
        This password is used to protect your wallet and provide access to the
        browser extension.
        <br />
        It{" "}
        <span className="pt-4 w-full text-lg purpel-deep">
          cannot be reset
        </span>{" "}
        and is separate from your mobile wallet.
      </p>

      {/* Unified Input Block */}
      <div className="mt-6 w-full max-w-md p-5 black-box-two border-dashed border border-d-color rounded-xl">
        {/* New Password */}
        <label className="block text-left text-md font-semibold text-gray-300 mb-2">
          New password
        </label>
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-3 px-4 bg-[#11152b] text-white border border-blue-900 rounded-md text-md outline-none focus:border-purple-800"
            placeholder="Enter password"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FiEyeOff size={20} className="relative top-1" />
            ) : (
              <FiEye className="relative top-1" size={20} />
            )}
          </button>
        </div>

        {/* Password Strength Conditions */}
        <div className="mb-4 text-left text-gray-400 text-sm">
          {Object.entries(passwordValidations).map(([key, isValid]) => (
            <div key={key} className="flex items-center gap-2 mb-2">
              {isValid ? (
                <FiCheckCircle className="text-pink-400 size-6" />
              ) : (
                <span className="w-6 h-6 border border-pink-400 rounded-full"></span>
              )}
              <span className="text-lg">
                {key === "length" && "8 or more characters"}
                {key === "uppercase" && "At least one uppercase letter"}
                {key === "digit" && "At least one digit"}
                {key === "symbol" && "At least one symbol"}
              </span>
            </div>
          ))}
        </div>

        {/* Confirm Password */}
        <label className="block text-left text-md font-semibold text-gray-300 mb-2">
          Confirm password
        </label>
        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full py-3 px-4 bg-[#11152b] text-white border border-blue-900 rounded-md text-md outline-none focus:border-purple-800"
            placeholder="Re-enter password"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400 hover:text-white"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <FiEyeOff className="relative mt-1" size={20} />
            ) : (
              <FiEye className="relative mt-1" size={20} />
            )}
          </button>
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="terms"
            className="mr-2 w-4 h-4 border border-pink-400"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          <label htmlFor="terms" className="text-gray-400 text-sm">
            I have read and agree to the{" "}
            <a href="#" className="text-pink-400 underline">
              Terms of Service
            </a>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between w-full max-w-md mt-6">
        <button
          className="px-10 py-1 rounded-full border border-purple-600 text-purple-400 hover:bg-gray-900 transition"
          onClick={() => console.log("Back")}
        >
          Back
        </button>
        <button
          onClick={handleSetPassword}
          disabled={
            !isPasswordStrong || password !== confirmPassword || !agreed
          }
          className={`px-10 py-2 rounded-full  shadow-md transition ${
            !isPasswordStrong || password !== confirmPassword || !agreed
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

export default PasswordSetup;
