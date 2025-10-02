export const convertPriceToCurrency = (price: number) => {
  return (price / 100).toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  });
};

export const convertSecondsToHHMMSS = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Pad with leading zeros if needed
  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  return hh === "00" ? `${mm}:${ss}` : `${hh}:${mm}:${ss}`;
};
