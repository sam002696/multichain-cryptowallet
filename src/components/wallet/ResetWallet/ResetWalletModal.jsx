import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { clearDatabase } from "../../../utils/AuthUtility/indexedDB";
// import { clearDatabase } from "../../../utilities/AuthUtility/indexedDB";

const ResetWalletModal = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const handleResetWallet = async () => {
    try {
      await clearDatabase("WalletDB"); // Clear wallet data from IndexedDB
      localStorage.clear(); // Clear session & wallet storage
      console.log("Wallet reset successful");
      setOpen(false); // Close modal
      setTimeout(() => {
        // Redirect to /auth after 200ms
        navigate("/auth");
        window.location.reload(); // Reload the app
      }, 200); // Delay navigation slightly for UX
    } catch (error) {
      console.error("Error resetting wallet:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="max-w-sm w-full  text-gray-400 p-4 black-bg rounded-2xl shadow-lg border-all border">
          {/* Modal Header */}
          <div className="flex justify-between items-center border-b border-gray-600 pb-3">
            <DialogTitle className="text-lg font-semibold text-gradient">
              Reset your wallet
            </DialogTitle>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-purple-500"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="text-center mt-4 pt-7 space-y-3">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <span className="text-blue-500 text-5xl">🚀</span>
            </div>
            <h2 className="text-md font-bold text-gray-300">
              You are about to reset your wallet
            </h2>
            <p className="text-gray-400 text-sm">
              1. Your current wallet and tokens will be removed from this app.
              However, this won’t delete your assets from the blockchain.
            </p>
            <p className="text-gray-400 text-sm">
              2. You can only recover this wallet with your <b>Secret Phrase</b>
              . If lost, recovery is impossible.
            </p>
          </div>

          {/* Modal Footer - Buttons */}
          <div className="mt-5 flex flex-col space-y-3">
            <button
              onClick={handleResetWallet}
              className="w-full py-3 rounded-full text-white bg-red-500 hover:bg-red-600 transition font-medium"
            >
              I understand, continue
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-full py-2 text-purple-400 font-medium"
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ResetWalletModal;
