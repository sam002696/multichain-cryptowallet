import { Navigate, Outlet, useLocation } from "react-router";
import { useSession } from "../../../context/SessionContext";

const RouteGuard = ({ target }) => {
  const { isRegistered, isSessionValid, isInitialized } = useSession();
  const location = useLocation();
  const queryParams = location.search;

  console.log("RouteGuard Query Params:", queryParams);

  if (queryParams.includes("transactionId")) {
    const urlParams = new URLSearchParams(location.search);
    const txnId = urlParams.get("transactionId");
    const txnStatus = urlParams.get("transactionStatus");

    if (txnId) {
      console.log(
        "Storing transactionId in sessionStorage before redirection:",
        txnId
      );
      sessionStorage.setItem("transactionId", txnId);
      sessionStorage.setItem("transactionStatus", txnStatus || "pending");
    }
  }

  // Wait until session initialization is complete
  if (!isInitialized) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        {/* You can replace this div with your own spinner component */}
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // If the user is NOT registered, always redirect to "/auth"
  if (!isRegistered) {
    return target === "auth" ? <Outlet /> : <Navigate to="/auth" replace />;
  }

  // If the user is registered but session is invalid, go to "/unlock"
  if (!isSessionValid) {
    return target === "unlock" ? <Outlet /> : <Navigate to="/unlock" replace />;
  }

  if (target === "wallet" || location.pathname.startsWith("/wallet")) {
    return <Outlet />;
  }

  return <Navigate to={`/wallet${queryParams}`} replace />;
};

export default RouteGuard;
