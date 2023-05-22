import truncate from "lodash/truncate";
import { getToken } from "./api/authApiExpress";

export function applyFilterValues(prevValues, setter, type, value) {
  const changedFilter = { name: type, value: value };
  const updatedFilterSet = prevValues.map(filter => {
      if (filter.name === type) return changedFilter;
      return filter;
  });
  setter(updatedFilterSet);
};

export function applySortValues(sortValue, movies) {
  const sortOn = sortValue.substring(0, sortValue.lastIndexOf("_"));
  const sortType = sortValue.includes("ASC") ? "ASC" : "DESC";
  return movies.sort((a, b) => {
      if (sortType === "ASC") {
          return a[sortOn] < b[sortOn] ? -1 : a[sortOn] > b[sortOn] ? 1 : 0;
      } else {
          return a[sortOn] > b[sortOn] ? -1 : a[sortOn] < b[sortOn] ? 1 : 0;
      }
  });
}

export function toReadableLanguage(code) {
  let languageNames = new Intl.DisplayNames(["en"], { type: "language" });
  return languageNames.of(code);
}

export function toReadableDate(date) {
  if (!date) return "Invalid date";
  try {
      return new Date(date).toLocaleDateString("en-UK", {
          year: "numeric", month: "short", day: "2-digit",
      });
  } catch (e) {
      return "Invalid date";
  }
}

export function excerpt(string) {
  return truncate(string, {    
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

export function updateOptions(options) {
  const update = { ...options };
  const token = getToken();
  if (token) {
      update.headers = {
          ...update.headers,
          Authorization: token,
      };
  }
  return update;
}
