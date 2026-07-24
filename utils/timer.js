export function calculateRemainingTime(endTime) {
  const now = new Date();

  const end = new Date(endTime);

  const difference = end - now;

  return difference;
}

export function formatTime(milliseconds) {
  const totalSeconds = Math.floor(Math.abs(milliseconds) / 1000);

  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");

  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  );

  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}
