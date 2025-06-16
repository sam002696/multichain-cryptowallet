// addressTruncateUtils.js (for example)

export function truncateAddress(address) {
  if (!address) return "";

  // If the address is shorter than 12 characters (7 + 5), just return it
  if (address.length <= 17) {
    return address;
  }

  return `${address.slice(0, 10)}...${address.slice(-7)}`;
}
