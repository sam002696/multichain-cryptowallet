import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { CheckCircleIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

const ExtraFooter = ({ type, onManage }) => {
  if (type === "manage_mnemonics") {
    return (
      <>
        <hr className="my-2 border-t border-gray-500" />
        <div className="flex space-x-2 px-4 py-2">
          <button
            type="button"
            className="flex-1 rounded-full bg-gray-100 px-2.5 py-1.5 text-sm text-purple-300 shadow-sm border border-purple-500 hover:bg-gray-200"
          >
            Add new wallet
          </button>
          <button
            type="button"
            className="flex-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm shadow-sm hover:opacity-90"
          >
            Manage wallets
          </button>
        </div>
      </>
    );
  }

  if (type === "manage_chains") {
    return (
      <>
        <hr className="my-2 border-t border-gray-500" />
        <div className="px-4 py-2">
          <button
            type="button"
            onClick={onManage}
            className="w-full rounded-full px-2.5 py-2.5 text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm hover:opacity-90"
          >
            Manage networks
          </button>
        </div>
      </>
    );
  }

  return null;
};

const DropdownMenu = ({
  label,
  items,
  onClickItem,
  extra = null,
  onClickManageNetworks = () => {},
}) => (
  <Menu as="div" className="relative inline-block text-left">
    <MenuButton className="inline-flex items-center gap-x-2 rounded-lg bg-gray-800 px-4 py-2 text-md text-white shadow-md hover:bg-pink-500">
      {label}
      <ChevronDownIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
    </MenuButton>

    <MenuItems className="absolute z-10 mt-2 w-80 origin-top-right rounded-lg bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none cursor-pointer">
      {items && items.length > 0 ? (
        items.map((item) => (
          <MenuItem key={item.id ?? item.label}>
            {({ active }) => (
              <button
                onClick={() => onClickItem(item)}
                className={`flex w-full items-center justify-between px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-gray-700 text-pink-600"
                    : "hover:bg-gray-800 text-white"
                }`}
              >
                <span className="pl-3 text-lg">{item.label}</span>
                {item.isSelected && (
                  <CheckCircleIcon className="h-5 w-5 text-pink-500" />
                )}
              </button>
            )}
          </MenuItem>
        ))
      ) : (
        <div className="px-4 py-2 text-sm text-gray-500">
          No items available
        </div>
      )}

      <ExtraFooter type={extra} onManage={onClickManageNetworks} />
    </MenuItems>
  </Menu>
);

export default DropdownMenu;
