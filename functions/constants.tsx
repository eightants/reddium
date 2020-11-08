export const TITLE_MAX = 100
export const DESC_MAX = 200

export const SORT_TYPE = "sort_type";
export const GEO_FILTER = "geo_filter";
export const TIME_FILTER = "t";

export const SORT_TYPES = ["top", "hot", "new", "rising"];
export const POPULAR_PARAM_KEY = ["sort_type", "t"];
export const POPULAR_PARAM_DEFAULT = ["hot", "day"];
export const POPULAR_PARAM_VALUES = [
  SORT_TYPES,
  ["hour", "day", "week", "month", "year", "all"]
];