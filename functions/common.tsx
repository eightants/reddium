import { capitalize } from "lodash";

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

export function getTimeOfDay() {
  const today = new Date();
  const currHour = today.getHours();
  if (currHour < 12) {
    return "Good morning";
  } else if (currHour < 18) {
    return "Good afternoon";
  }
  return "Good evening";
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getIntFromString(s: string, max: number) {
  return s.length % max;
}

export function limitText(text: string, max: number) {
  if (text.length < max) return text.split("&amp;").join("&");
  return text.slice(0, max).split("&amp;").join("&") + "...";
}

export const replaceGifv = (text: string) => text.replace(".gifv", ".gif");

export const unsplashCredits = (filename: string) =>
  capitalize(filename.split("-").slice(0, -2).join(" "));

export const findThreadDepth = (root: any) =>
  1 +
  (root.replies && root.replies != ""
    ? Math.max(
        ...root.replies.data.children.map((c: any) => findThreadDepth(c.data))
      )
    : 0);

export const findRegularNested = (replies: any) =>
  replies.data.children.filter((c: any) => c.kind != "more");

export const hasMoreComments = (replies: any) =>
  replies.data.children.some((c: any) => c.kind == "more");

export const isImage = (url: string) =>
  url.includes(".jpg") || url.includes(".gif") || url.includes(".png");

export const isVideo = (url: string) =>
  url.includes("youtube.com/watch") || url.includes("youtu.be");

export const getEmbedLink = (url: string) => {
  if (url.includes("youtube.com/watch")) {
    return `https://youtube.com/embed/${url.split("=")[1]}`;
  }
  if (url.includes("youtu.be")) {
    return `https://youtube.com/embed${url.split(".be")[1]}`;
  }
};
