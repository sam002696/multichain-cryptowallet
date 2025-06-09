import { API_BASE_URL } from "./base";

export const NETWORK_API = {
  GET_ALL: `${API_BASE_URL}/networks`,
  GET_MAINNETS: `${API_BASE_URL}/networks/mainnets`,
  GET_TESTNETS: `${API_BASE_URL}/networks/testnets`,
  GET_BY_ID: `${API_BASE_URL}/networks/:chainId`,
};
