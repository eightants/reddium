export const DOMAIN = "https://reddium.vercel.app";
export const REDIRECT_URI = "http://localhost:3000/login";

export const TITLE_MAX = 100;
export const DESC_MAX = 200;
export const BLURB_MAX = 600;

export const SPECIAL_SUBREDDITS = ["all", "popular"];

export const SORT_TYPE = "sort_type";
export const SORT_PARAM = "sort";
export const GEO_FILTER = "geo_filter";
export const TIME_FILTER = "t";

export const TIME_PARAM_VALUES = [
  "hour",
  "day",
  "week",
  "month",
  "year",
  "all"
];
export const SORT_TYPES_COMMENT = [
  "confidence",
  "top",
  "new",
  "controversial",
  "old",
  "qa"
];
export const COMMENT_PARAM_KEY = ["sort"];
export const COMMENT_PARAM_DEFAULT = ["confidence"];
export const COMMENT_PARAM_VALUES = [SORT_TYPES_COMMENT];
export const SORT_TYPES_SEARCH = ["relevance", "top", "hot", "new", "comments"];
export const SEARCH_PARAM_KEY = ["sort", "t"];
export const SEARCH_PARAM_DEFAULT = ["relevance", "all"];
export const SEARCH_PARAM_VALUES = [SORT_TYPES_SEARCH, TIME_PARAM_VALUES];
export const SORT_TYPES = ["top", "hot", "new", "rising"];
export const POPULAR_PARAM_KEY = ["sort_type", "t"];
export const POPULAR_PARAM_DEFAULT = ["hot", "day"];
export const POPULAR_PARAM_VALUES = [SORT_TYPES, TIME_PARAM_VALUES];

export const LOADING_POST_LIST = { posts: new Array(15).fill({}), after: "" };

export const PLACEHOLDER_IMAGES = [
  "amanda-frank-e4ING8JYKgI-unsplash.jpg",
  "dylan-gillis-KdeqA3aTnBY-unsplash.jpg",
  "ilya-pavlov-OqtafYT5kTw-unsplash.jpg",
  "izuddin-helmi-adnan-vTveTqbaTNM-unsplash.jpg",
  "jeremy-bishop-B2Q7UC6QGLE-unsplash.jpg",
  "marek-piwnicki-6xNqGogcQ5Q-unsplash.jpg",
  "melnychuk-nataliya-OYT2j0LnImg-unsplash.jpg",
  "nubelson-fernandes-CO6r5hbt1jg-unsplash.jpg",
  "olga-isakova-w-GieCARg44-unsplash.jpg",
  "roman-bozhko-PypjzKTUqLo-unsplash.jpg",
  "stephen-walker-Aemzb5kqs2E-unsplash.jpg",
  "stil-flRm0z3MEoA-unsplash.jpg",
  "thomas-de-luze-4lTtaunPhrk-unsplash.jpg",
  "vista-wei-Zp4uEoNmhbQ-unsplash.jpg",
  "vlad-hilitanu-oKc7vCb4SS4-unsplash.jpg",
  "you-x-ventures-Oalh2MojUuk-unsplash.jpg"
];
