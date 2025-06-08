import { Route, Routes } from "react-router";
import RouteGuard from "./components/auth/RouteGuard/RouteGuard";
import AuthHome from "./components/auth/AuthHome/AuthHome";
import PasswordUnlock from "./components/wallet/Unlock/PasswordUnlock";

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
      </Routes>
    </>
  );
}

export default App;
