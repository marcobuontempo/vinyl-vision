/**
 * formatCentsToCurrency
 *
 * Formats a number (integer: `price` in cents) to a formatted Australian Dollar currency string.
 *
 * @param price - The price in cents.
 * @returns Formatted price string in AUD currency.
 */
export const formatCentsToCurrency = (price: number) => {
  return (price / 100).toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  });
};

/**
 * formatSecondsToHHMMSS
 *
 * Formats an number (integer: seconds) into a human-readable HH:MM:SS or MM:SS format.
 *
 * @param totalSeconds - Total number of seconds.
 * @returns Formatted time string.
 */
export const formatSecondsToHHMMSS = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Pad with leading zeros if needed
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return hh === "00" ? `${mm}:${ss}` : `${hh}:${mm}:${ss}`;
};
