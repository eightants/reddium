const DAY_MILLISECONDS = 1000 * 60 * 60 * 24;
const HOUR_MILLISECONDS = 1000 * 60 * 60;

export function getTime(unixTime: number) {
  const postedTime = unixTime * 1000;
  const timeDiff = Date.now() - postedTime;
  if (timeDiff < HOUR_MILLISECONDS) {
    return `${Math.floor((timeDiff * 60) / HOUR_MILLISECONDS)} minutes ago`;
  } else if (timeDiff < DAY_MILLISECONDS) {
    return `${Math.floor((timeDiff * 24) / DAY_MILLISECONDS)} hours ago`;
  }
  const postedDate = new Date(postedTime);
  return `${postedDate.getDate()}/${postedDate.getMonth()}/${postedDate.getFullYear()}`;
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getIntFromString(s: string, max: number) {
  return (s.length % max) + 1;
}

export function limitText(text: string, max: number) {
  if (text.length < max) return text.split('&amp;').join('&');
  return text.slice(0, max).split('&amp;').join('&') + "...";
}
