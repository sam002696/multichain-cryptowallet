import {
  ArrowLongUpIcon,
  ArrowLongDownIcon,
  ArrowsUpDownIcon,
  CreditCardIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router";

const TransactionsActions = () => {
  const actions = [
    {
      icon: <ArrowLongUpIcon className="h-6 w-6" />,
      label: "Send",
      path: "/wallet/send",
    },
    {
      icon: <ArrowLongDownIcon className="h-6 w-6" />,
      label: "Receive",
      path: "/receive",
    },
    {
      icon: <ArrowsUpDownIcon className="h-6 w-6" />,
      label: "Swap",
      path: "/swap",
    },
    {
      icon: <CreditCardIcon className="h-6 w-6" />,
      label: "Buy & Sell",
      path: "/buy-sell",
    },
  ];

  return (
    <div className="p-2 pl-1 pr-1 mt-4 black-box-two border-d-color border-dashed border border-l-0 border-r-0">
      <div className="isolate flex justify-center space-x-10 ">
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-2 text-center"
          >
            {/* Circle with Icon */}
            <Link to={action.path}>
              <div className="flex justify-center  border border-dashed border-gray-500 bg-black-light  items-center  rounded-full p-3 hover:bg-pink-500 transition-colors">
                <button className="text-purple-400">{action.icon}</button>
              </div>
            </Link>
            {/* Text Label */}
            <span className="text-md text-gray-300">{action.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionsActions;
