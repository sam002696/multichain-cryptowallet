import { CheckIcon } from "@heroicons/react/24/solid";

const EthGasFeeList = ({
  gasOptions,
  networkStatus,
  setSelectedGasFee,
  selectedGasFee,
  setOpen,
  animation,
}) => {
  const handleGasOption = (option) => {
    localStorage.setItem("selectedGasFeeType", JSON.stringify(option.type));
    setSelectedGasFee(option.type);
    setOpen(false); // Close modal after selection
  };

  return (
    <div className="space-y-4">
      {gasOptions?.map((option, idx) => {
        const usdCost = "$0.00"; // Placeholder USD value
        const isSelected = selectedGasFee === option.type;

        return (
          <div
            key={idx}
            onClick={() => handleGasOption(option)}
            className={`relative p-4 pr-10 rounded-md bg-[#2C2C2C] hover:bg-[#383838] cursor-pointer transition-colors ${
              isSelected
                ? "border-4 border-green-500"
                : "border border-transparent"
            }`}
          >
            {/* Type and ETH Fee */}
            <div className="flex items-center justify-between">
              <div className="font-semibold">{option.type}</div>
              <div className={`text-sm ${animation ? "animate-pulse" : ""}`}>
                {`<${option.maxFee}`}
              </div>
            </div>

            {/* Time and USD */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-400">{option.time}</div>
              <div className="text-xs text-gray-300">{usdCost}</div>
            </div>

            {/* Selection Checkmark */}
            {isSelected && (
              <CheckIcon className="absolute top-6 right-2 w-6 h-6 text-green-500" />
            )}
          </div>
        );
      })}

      {/* Network Status Section */}
      <div className="mt-4 p-3 rounded-md bg-[#2C2C2C] text-sm text-gray-200 space-y-1">
        <p>Base Fee: {networkStatus.baseFee}</p>
        <p>Congestion: {networkStatus.congestion}</p>
        <p>
          Status: <span className="font-semibold">{networkStatus.status}</span>
        </p>
      </div>
    </div>
  );
};

export default EthGasFeeList;
