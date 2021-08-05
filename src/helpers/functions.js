/* eslint-disable prefer-destructuring */
import numeral from "numeral";
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

import ENDPOINTS from "../constants/endpoints";
import { MEDIA_IMAGE, MEDIA_VIDEO } from "../constants/media_types";
import { EMAIL_REGEX, NUMBER_REGEX } from "../constants/regexs";
import {
  EMAIL_CONFIRMATION_ROUTE,
  EMAIL_VERIFY_ROUTE,
  PASSWORD_CHANGE_ROUTE,
  RESET_PASSWORD_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "../constants/routes";
import { USER_TOKEN } from "../constants/user";
import { USERNAME_KEY } from "../constants/jwt";

/**
 * Generate URL string
 * @param {string} endpoint
 * @param {string} api
 * @param {string} postfix
 * @return {string}
 */
export function generateUrl(endpoint, api = ENDPOINTS, postfix = null) {
  if (!Object.prototype.hasOwnProperty.call(api.endpoints, endpoint)) {
    console.warn(`There is no ${endpoint} endpoint`);
    return endpoint;
  }
  const endpointUrl = api.endpoints[endpoint];
  const url = `${api.url}/${endpointUrl}`;
  return postfix ? `${url}/${postfix}` : url;
}

/**
 * Generate file URL string
 * @param {string} endpoint
 * @param {string} postfix
 * @return {string}
 */
export function generateFileUrl(address, endpoint, postfix = null) {
  if (!endpoint) return null;
  if (endpoint.startsWith("http")) return endpoint;

  const url = wrapHttps(`${address}${ENDPOINTS.urlFiles}${endpoint}`, true);
  return postfix ? `${url}/${postfix}` : url;
}

/**
 * Added 'https' prefix before URL
 * @param {string} url
 * @return {string}
 */
export function wrapHttps(url, https) {
  return `${https ? "https" : "http"}://${url}`;
}

export function getToken() {
  const token = localStorage.getItem(USER_TOKEN);
  if (token) {
    return JSON.parse(token);
  }
  return undefined;
}

/**
 * Get new offset
 * @param {number} currentOffset
 * @param {number} total
 * @param {number} step
 * @return {number} new offset
 */
export function getOffset(currentOffset, total, step = 1) {
  if (typeof currentOffset !== "number" || typeof total !== "number") return 0;

  return currentOffset + step >= total ? total : currentOffset + step;
}

/**
 * Get full url to ...
 * @param {number} location current location
 * @param {number} route preferred route
 * @param {number} id
 * @return {number} full url to post
 */
export function getUrlTo(route) {
  const location = window.location.origin;

  if (!location || !route) return null;

  return `${location}${route}`;
}

/**
 * Get hostname from url
 * @param {number} location current location
 * @return {number} hostname
 */
export function getHostFromUrl(url) {
  let hostname;

  // Find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  // Find & remove port number
  hostname = hostname.split(":")[0];
  // Find & remove "?"
  hostname = hostname.split("?")[0];

  return hostname;
}

/**
 * Get media type
 * @param {number} location current location
 * @param {number} route preferred route
 * @param {number} id
 * @return {number} full url to post
 */
export function getMediaType(type) {
  if (typeof type === "string") {
    switch (type.toLocaleLowerCase()) {
      case "video":
        return MEDIA_VIDEO;
      case "image":
        return MEDIA_IMAGE;
      default:
        return undefined;
    }
  }

  return type;
}

/**
 * Remove repeated objects in the list
 * @param {Array} list
 * @param {string} property
 * @return {Array} new Array with files where duplicates overridden to last added items
 */
export function getWithoutRepeats(list, property) {
  return list
    .reverse()
    .filter(
      (item, index, self) =>
        index === self.findIndex((t) => t[property] === item[property])
    );
}

/**
 * Format number
 * @param {number}
 * @param {format}
 * @return {string}
 */
export function formatNumber(number, format = "0.0a") {
  const formattedNumber = numeral(number).format(format);

  if (formattedNumber) {
    return formattedNumber.replace(".0", "");
  }

  return formattedNumber;
}

/**
 * If element is array return first child else return passed element
 * @param {element}
 * @return {node}
 */
export function getFirstElement(element) {
  if (!Array.isArray(element)) return element;

  if (element.length > 0) {
    return element[0];
  }

  return null;
}

/**
 * Get date 00/00/0000
 * @param {date}
 * @return {string}
 */
export function getDate(date) {
  if (date) {
    const newDate = new Date(date);
    const year = newDate.getUTCFullYear();
    let month =
      newDate.getUTCMonth() > 9
        ? newDate.getUTCMonth()
        : `0${newDate.getUTCMonth()}`;
    if (month === "00") {
      month = "01";
    }
    let day =
      newDate.getUTCDate() > 9
        ? newDate.getUTCDate()
        : `0${newDate.getUTCDate()}`;
    if (day === "00") {
      day = "01";
    }

    return `${year}-${month}-${day}`;
  }

  return "";
}

/**
 * Make a string from some value(deep data structures too)
 * @param {date}
 * @return {string}
 */
export function getSnapshot(data) {
  if (!data) return null;

  return JSON.stringify(data);
}

/**
 * Get account snapshot
 * @param {profile}
 * @return {string}
 */
export function getProfileSnapshot(profile) {
  if (!profile) return null;

  return getSnapshot({
    name: profile.name,
    bio: profile.bio,
    sites: profile.sites,
    location: profile.location,
    wishList: profile.wishList,
  });
}

export function getFullName(firstName, lastName) {
  if (!lastName && firstName) return firstName;
  if (!firstName && lastName) return lastName;

  return `${firstName} ${lastName}`;
}

export function initTheme(theme) {
  const currentTheme = localStorage.getItem("CURRENT_THEME");
  if (currentTheme) {
    return currentTheme;
  }

  localStorage.setItem("CURRENT_THEME", theme);

  return theme;
}

export function isPublicRoute(route) {
  return (
    route.includes(SIGN_IN_ROUTE) ||
    route.includes(SIGN_UP_ROUTE) ||
    route.includes(RESET_PASSWORD_ROUTE) ||
    route.includes(PASSWORD_CHANGE_ROUTE) ||
    route.includes(EMAIL_VERIFY_ROUTE) ||
    route.includes(EMAIL_CONFIRMATION_ROUTE)
  );
}

/**
 * Get style depends on themes 'light' or 'dark'
 * @param {theme}
 * @param {light}
 * @param {dark}
 * @return {string}
 */
export function getStyleByTheme(theme, light, dark) {
  return theme.palette.type === "light" ? light : dark;
}

export function getUniqueChars(str) {
  if (!str) return false;

  const uniqueStr = str
    .split("")
    .filter((item, i, ar) => ar.indexOf(item) === i)
    .join("");

  return uniqueStr;
}

export function isCorrectEmail(email) {
  return EMAIL_REGEX.test(String(email).toLowerCase());
}

export function hasNumbers(str) {
  return NUMBER_REGEX.test(String(str));
}

export function getUrlParams() {
  const query = window.location.search;
  if (!query) return {};

  const urlParams = new URLSearchParams(query);
  const params = {};

  urlParams.forEach((val, key) => {
    params[key] = val;
  });

  return params;
}

export function getYearFromCurrentDate(years) {
  return new Date().getFullYear() - years;
}

export function formatCurrency(amount, currency = "USD") {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });
  return formatter.format(amount);
}

const ONE_HOUR_MILLISECONDS = 1000 * 60 * 60;

export function formatDate(
  value,
  opts = { timeOffset: 12, showSubText: true }
) {
  if (!value) return null;

  const currentDate = new Date();
  const delta = currentDate - new Date(value);

  let options = {};
  let subText = "";

  if (delta > ONE_HOUR_MILLISECONDS * opts.timeOffset) {
    options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
  } else {
    subText = opts.showSubText ? "Today at " : "";
    options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
  }

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return `${subText}${formatter.format(new Date(value))}`;
}

export function copyFlatObjectWithIgnore(obj, ignores) {
  if (!obj || !Object.keys(obj).length) return null;
  if (!ignores || !ignores.length) return obj;

  return Object.keys(obj).reduce((acc, curr) => {
    if (!ignores.includes(curr)) {
      return {
        ...acc,
        [curr]: obj[curr],
      };
    }

    return acc;
  }, {});
}

export function isEmptyObject(obj) {
  return JSON.stringify(obj) === JSON.stringify({});
}

export function isSameObjects(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * To control how many times we allow a function to be executed over time
 * @fn {function}
 * @time {ms}
 */

export function debounce(fn, time) {
  let timeout;

  // eslint-disable-next-line func-names
  return function (...args) {
    const functionCall = () => fn.apply(this, args);
    timeout && clearTimeout(timeout);

    timeout = setTimeout(functionCall, time);
  };
}

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function redirect(url, target) {
  if (!url) return;

  window.open(url, target ?? "_self");
}

export function getUsernameFromJWT(token) {
  if (!token) return null;

  const decodedToken = jwt_decode(token);
  if (!decodedToken[USERNAME_KEY]) {
    return null;
  }

  return decodedToken[USERNAME_KEY];
}

export function arrayToObject(arr, property) {
  if (!arr || !arr?.length) return null;

  return arr.reduce(
    (acc, curr, i) => ({ ...acc, [curr[property]]: { ...curr, index: i } }),
    {}
  );
}

export function getDialogToggleType(withStack) {
  return withStack ? "toggleWithStack" : "toggle";
}

export function toBase64(value, encode = true) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  // eslint-disable-next-line no-useless-escape
  const result = (value + padding).replace(/\-/g, "+").replace(/_/g, "/");
  return encode ? window.atob(result) : window.btoa(result);
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function calcDiscount(price, discount, duration) {
  const discountSum = (price * discount) / 100;
  const totalPrice = (price - discountSum) * duration;
  return totalPrice.toFixed(2);
}

export function customFormateDate(
  value,
  options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
) {
  const longEnUSFormatter = new Intl.DateTimeFormat("en-US", options);
  return longEnUSFormatter.format(value);
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
