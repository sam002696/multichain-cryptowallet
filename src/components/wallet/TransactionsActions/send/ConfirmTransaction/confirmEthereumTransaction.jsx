import ToastAlert from "/src/notification/alert/ToastAlert.jsx";

import { sendTokenTransaction } from "./sendTokenTransaction";
import { sendNativeTransaction } from "./sendNativeTransaction";
import { checkPriorityLevel } from "../../../../../utilities/checkPriorityLevel";
import { handleNetworkConditionsAndSimulate } from "./handleNetworkConditionsAndSimulate";

export const confirmEthereumTransaction = async ({
  network,
  address,
  amount,
  Ethkey,
  web3,
  dispatch,
  navigate,
  setLoading,
  setTransactionReceiptInfo,
  transactionSendInfo,
}) => {
  try {
    setLoading(true);
    ToastAlert("info", "Transaction process started...");

    const privateKey = Ethkey.privateKey.startsWith("0x")
      ? Ethkey.privateKey
      : `0x${Ethkey.privateKey}`;
    const senderAddress =
      network.address || network?.selectedNetworkInfo?.account;
    const receiverAddress = address;
    // const { tokenAddress  } = network;
    const tokenAddress =
      network.tokenAddress || network?.tokenNetwork?.tokenAddress;

    const balance = BigInt(await web3.eth.getBalance(senderAddress));
    const nonce = await web3.eth.getTransactionCount(senderAddress, "latest");

    const gasFeesRes = await fetch(
      `https://gas.api.infura.io/v3/75573f1a11f84a848d4e7292fe2fb5b9/networks/${
        network.chainId || network.selectedNetworkInfo?.chainId
      }/suggestedGasFees`
    );
    const gasFees = await gasFeesRes.json();

    const savedGasType = localStorage.getItem("selectedGasFeeType");
    const priorityLevel = checkPriorityLevel(savedGasType?.toLowerCase());

    const suggested = gasFees[priorityLevel];
    const maxPriorityFeePerGas = BigInt(
      web3.utils.toWei(
        suggested.suggestedMaxPriorityFeePerGas.toString(),
        "gwei"
      )
    );
    const maxFeePerGas = BigInt(
      web3.utils.toWei(suggested.suggestedMaxFeePerGas.toString(), "gwei")
    );
    const gasLimit = tokenAddress ? 200000n : 21000n;

    const valueToSend = web3.utils.toWei(amount.toString(), "ether");

    const isFeasible = await handleNetworkConditionsAndSimulate({
      web3,
      gasFees,
      valueToSend,
      senderAddress,
      receiverAddress,
      maxFeePerGas,
      maxPriorityFeePerGas,
      gasLimit,
      balance,
      tokenAddress,
    });

    if (!isFeasible) {
      setLoading(false);
      return;
    }

    // Check and cancel pending txs
    const pendingNonce = await web3.eth.getTransactionCount(
      senderAddress,
      "pending"
    );
    if (pendingNonce > nonce) {
      for (let n = nonce; n < pendingNonce; n++) {
        const cancelTx = {
          nonce: web3.utils.toHex(n),
          gasPrice: web3.utils.toHex(
            maxFeePerGas + BigInt(web3.utils.toWei("5", "gwei"))
          ),
          gasLimit: web3.utils.toHex(21000),
          to: senderAddress,
          value: "0x0",
          chainId: web3.utils.toHex(network.chainId),
        };

        const signed = await web3.eth.accounts.signTransaction(
          cancelTx,
          privateKey
        );
        try {
          await web3.eth.sendSignedTransaction(signed.rawTransaction);
        } catch (err) {
          console.error(`Cancel failed at nonce ${n}:`, err.message);
          break;
        }
      }
    }

    // Token or Native transfer
    if (tokenAddress) {
      await sendTokenTransaction({
        web3,
        tokenAddress,
        privateKey,
        senderAddress,
        receiverAddress,
        amount,
        nonce,
        maxPriorityFeePerGas,
        maxFeePerGas,
        setLoading,
        setTransactionReceiptInfo,
        navigate,
      });
    } else {
      await sendNativeTransaction({
        web3,
        privateKey,
        senderAddress,
        receiverAddress,
        amount,
        nonce,
        maxPriorityFeePerGas,
        maxFeePerGas,
        network,
        setLoading,
        setTransactionReceiptInfo,
        dispatch,
        navigate,
        transactionSendInfo,
      });
    }
  } catch (err) {
    setLoading(false);
    ToastAlert("error", `Transaction failed: ${err.message}`);
    console.error("Transaction Error:", err);
  }
};
