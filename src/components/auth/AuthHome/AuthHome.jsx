import { useState } from "react";
import LayoutContainer from "../../Layout/LayoutContainer";
import AuthWalletPrompt from "../NonCustodialAuth/AuthWalletPrompt";
import MnemonicGenerator from "../NonCustodialAuth/MnemonicGenerator";
import MnemonicRecover from "../NonCustodialAuth/MnemonicRecover";
import MnemonicConfirm from "../NonCustodialAuth/MnemonicConfirm";
import PasswordSetup from "../NonCustodialAuth/PasswordSetup";
import KeyDisplay from "../NonCustodialAuth/KeyDisplay";

const AuthHome = () => {
  const [step, setStep] = useState(1);
  const [mnemonic, setMnemonic] = useState("");
  const [password, setPassword] = useState("");
  const [flowType, setFlowType] = useState("");

  const handleNext = (data) => {
    if (step === 2) setMnemonic(data);
    if (step === 4) setPassword(data);
    setStep(step + 1);
  };

  const handleFlowSelection = (type) => {
    setFlowType(type);
    setStep(2); // Proceed to the next step
  };

  return (
    <LayoutContainer>
      {step === 1 && <AuthWalletPrompt onSelectOption={handleFlowSelection} />}
      {step === 2 && flowType === "create" && (
        <MnemonicGenerator onNext={handleNext} />
      )}
      {step === 2 && flowType === "recover" && (
        <MnemonicRecover onRecover={handleNext} onConfirm={() => setStep(4)} />
      )}
      {step === 3 && flowType === "create" && (
        <MnemonicConfirm mnemonic={mnemonic} onConfirm={() => setStep(4)} />
      )}
      {step === 4 && <PasswordSetup onPasswordSet={handleNext} />}
      {step === 5 && <KeyDisplay mnemonic={mnemonic} password={password} />}
    </LayoutContainer>
  );
};

export default AuthHome;
