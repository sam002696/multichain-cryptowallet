import { Route, Routes } from "react-router";
import RouteGuard from "./components/auth/RouteGuard/RouteGuard";
import AuthHome from "./components/auth/AuthHome/AuthHome";
import PasswordUnlock from "./components/wallet/Unlock/PasswordUnlock";
import WalletDashboard from "./components/wallet/WalletDashboard/WalletDashboard";

function App() {
  return (
    <>
      <Routes>
        {/* Registration Route */}
        <Route path="/auth" element={<RouteGuard target="auth" />}>
          <Route index element={<AuthHome />} />
        </Route>

        {/* Unlock Route */}
        <Route path="/unlock" element={<RouteGuard target="unlock" />}>
          <Route index element={<PasswordUnlock />} />
        </Route>

        <Route path="/wallet" element={<RouteGuard target="wallet" />}>
          <Route index element={<WalletDashboard />} />
        </Route>

        {/* Default Route */}
        <Route path="*" element={<RouteGuard />} />
      </Routes>
    </>
  );
}

export default App;
