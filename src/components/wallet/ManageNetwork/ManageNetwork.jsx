import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import LayoutContainer from "../../Layout/LayoutContainer";
import { useDispatch, useSelector } from "react-redux";
import { toggleNetworkEnabled } from "../../../store/slices/networkSlice";

const SHOW_KEY = "showTestnets";

const ManageNetwork = () => {
  const dispatch = useDispatch();

  // — State & localStorage-backed toggle —
  const [filter, setFilter] = useState("");
  const [showTestnets, setShowTestnets] = useState(() => {
    try {
      const raw = localStorage.getItem(SHOW_KEY);
      return raw !== null ? JSON.parse(raw) : false;
    } catch {
      return false;
    }
  });

  // — Redux selectors —
  const networks = useSelector((state) =>
    showTestnets ? state.network.testnets : state.network.mainnets
  );
  const loading = useSelector((state) => state.network.loading);
  const error = useSelector((state) => state.network.error);

  // — Derived values —
  const listType = showTestnets ? "testnets" : "mainnets";
  const filtered = networks.filter((n) => {
    const term = filter.toLowerCase();
    return (
      n.name.toLowerCase().includes(term) ||
      n.chain.toLowerCase().includes(term)
    );
  });

  // — Side effects —
  useEffect(() => {
    // Fetch the correct list on mount and whenever mode changes
    const actionType = showTestnets
      ? "networks/fetchTestnets"
      : "networks/fetchMainnets";
    dispatch({ type: actionType });

    // Persist the user’s choice
    localStorage.setItem(SHOW_KEY, JSON.stringify(showTestnets));
  }, [dispatch, showTestnets]);

  // — Event handlers —
  const onToggle = (network) => {
    dispatch(toggleNetworkEnabled({ network, listType }));
  };

  return (
    <LayoutContainer outlet="wallet">
      <div className="p-6 max-w-lg mx-auto bg-[#06033E] shadow-md rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-gradient">
            Manage Networks
          </h1>
          <button
            onClick={() => setShowTestnets((x) => !x)}
            className="text-purple-400 font-bold text-sm"
          >
            {showTestnets ? "Show Mainnets" : "Show Testnets"}
          </button>
        </div>

        <div className="relative mb-4">
          <MagnifyingGlassIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Network name or chain"
            className="w-full bg-gray-800 text-white placeholder-gray-400 p-2 pl-10 rounded-md"
          />
        </div>

        {loading && <p className="text-center text-gray-400">Loading…</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div>
            {filtered.length ? (
              filtered.map((network) => (
                <div
                  key={network.id}
                  className="flex justify-between items-center py-2 border-b border-dashed border-gray-700"
                >
                  <div>
                    <h2 className="text-sm font-medium">{network.name}</h2>
                    <p className="text-xs text-gray-500">{network.chain}</p>
                  </div>
                  <Switch
                    checked={network.enabled}
                    onChange={() => onToggle(network)}
                    className={`group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      network.enabled ? "bg-purple-700" : "bg-gray-500"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2`}
                  >
                    <span className="sr-only">Toggle network</span>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                        network.enabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </Switch>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400 py-4">
                No networks found.
              </p>
            )}
          </div>
        )}

        <div className="mt-4 text-center">
          <a
            href="#"
            className="text-sm text-purple-400 underline hover:text-purple-500"
          >
            Didn&apos;t see your network? Import
          </a>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default ManageNetwork;
