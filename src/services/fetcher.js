import Cookies from "js-cookie";
// import { AuthUser } from "../helpers/AuthUser";
// import { toast } from "react-toastify";

const fetcher = async (url, options = {}) => {
  const method = options.method?.toUpperCase() || "GET";

  // Handling query params for GET requests
  if (method === "GET" && options.params && url instanceof URL) {
    Object.keys(options.params).forEach((key) =>
      url.searchParams.append(key, options.params[key])
    );
  }

  const isFormData = options.body instanceof FormData;

  const headers = {
    Authorization: "Bearer " + Cookies.get("access_token"),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  const response = await fetch(url, {
    ...options,
    method,
    headers,
    // if not formData, JSON.stringify body
    body: isFormData ? options.body : JSON.stringify(options.body),
  });

  const data = await response.json();

  // if (
  //   response.status === 401 &&
  //   data.message === "Invalid or missing authentication token"
  // ) {
  //   toast.error(data.message || "Session expired. Redirecting to login...");

  //   setTimeout(() => {
  //     AuthUser.logout(() => {
  //       window.location.href = "/login";
  //     });
  //   }, 5000);

  //   return;
  // }

  if (!response.ok) {
    // toast.error(data.message || "API Request Failed");
    const error = new Error(data.message || "API Request Failed");
    error.response = data;
    throw error;
  }

  return data;
};

export default fetcher;
