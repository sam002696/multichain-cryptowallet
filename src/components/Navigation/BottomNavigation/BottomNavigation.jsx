import { Link, useLocation } from "react-router";

import {
  HomeIcon,
  BanknotesIcon,
  DocumentCurrencyDollarIcon,
  CogIcon,
} from "@heroicons/react/20/solid";

const BottomNavigation = () => {
  const location = useLocation(); // Get the current pathname
  const navItems = [
    { id: 1, label: "Home", icon: <HomeIcon className="size-5" />, link: "/" },
    {
      id: 2,
      label: "Earn",
      icon: <BanknotesIcon className="size-5" />,
      link: "/earn",
    },
    {
      id: 3,
      label: "History",
      icon: <DocumentCurrencyDollarIcon className="size-5" />,
      link: "/transaction-history",
    },
    {
      id: 4,
      label: "Settings",
      icon: <CogIcon className="size-5" />,
      link: "/settings",
    },
  ];

  return (
    <div className=" text-white p-4 flex justify-between bg-gray-700 rounded-b-xl nav-footer">
      {navItems.map((item) => (
        <Link
          key={item.id}
          to={item.link}
          className={`flex flex-col items-center ${
            location.pathname === item.link
              ? "text-blue-400" // Active color
              : "text-white"
          }`}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
