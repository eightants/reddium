const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;
const HOUR_MILLISECONDS = 1000 * 60 * 60;

export function getTime(unixTime: number) {
  const postedTime = unixTime * 1000
  const timeDiff = Date.now() - postedTime;
  if (timeDiff < HOUR_MILLISECONDS) {
    return `${Math.floor(timeDiff * 60 / HOUR_MILLISECONDS)} minutes ago`;
  } else if (timeDiff < DAY_MILLISECONDS) {
    return `${Math.floor(timeDiff * 24 / DAY_MILLISECONDS)} hours ago`;
  }
  const postedDate = new Date(postedTime.toString());
  return `${postedDate.getDate()}/${postedDate.getMonth()}/${postedDate.getFullYear()}`;
}