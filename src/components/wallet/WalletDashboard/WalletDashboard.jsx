import React from "react";
import LayoutContainerWallet from "../../Layout/LayoutContainerWallet";
import BottomNavigation from "../../Navigation/BottomNavigation/BottomNavigation";
import WalletHeader from "../WalletHeader/WalletHeader";
import WalletBalance from "../WalletBalance/WalletBalance";
import TransactionsActions from "../TransactionsActions/TransactionsActions";
import AssetTabs from "../AssetTabs/AssetTabs";

const WalletDashboard = () => {
  return (
    <>
      <LayoutContainerWallet outlet={"wallet"}>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 h-svh fixed">
          <div className="p-3 pt-1 black-bg h-93 dashboard-screen">
            <div className="w-full max-w-5xl rounded-2xl shadow-lg border-all border max-w-xl-custom2">
              <WalletHeader />
              <WalletBalance />
              <TransactionsActions />
              <AssetTabs />
            </div>
          </div>
          <BottomNavigation />
        </div>
      </LayoutContainerWallet>
    </>
  );
};

export default WalletDashboard;
