import { Route, Routes } from "react-router";
import RouteGuard from "./components/auth/RouteGuard/RouteGuard";
import AuthHome from "./components/auth/AuthHome/AuthHome";

function App() {
  return (
    <>
      <Routes>
        {/* Registration Route */}
        <Route path="/auth" element={<RouteGuard target="auth" />}>
          <Route index element={<AuthHome />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
