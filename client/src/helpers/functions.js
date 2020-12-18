import numeral from "numeral";

import ENDPOINTS from '../constants/endpoints';
import { MEDIA_IMAGE, MEDIA_VIDEO, MEDIA_STORY } from '../constants/media_types';
import { EMAIL_REGEX, NUMBER_REGEX } from "../constants/regexs";
import { USER_TOKEN } from "../constants/user";

/**
 * Generate URL string
 * @param {string} endpoint
 * @param {string} api
 * @param {string} postfix
 * @return {string}
 */
export function generateUrl(endpoint, api = ENDPOINTS, postfix = null) {
  if (!api.endpoints.hasOwnProperty(endpoint)) {
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
  return `${https ? 'https' : 'http'}://${url}`;
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
export function getUrlTo(location, route, id) {
  if (!location || !route || !id) return null;

  return `${location}${route}/${id}`
}

/**
 * Get hostname from url
 * @param {number} location current location
 * @return {number} hostname
 */
export function getHostFromUrl(url) {
  var hostname;

  // Find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf("//") > -1) {
    hostname = url.split('/')[2];
  }
  else {
    hostname = url.split('/')[0];
  }

  // Find & remove port number
  hostname = hostname.split(':')[0];
  // Find & remove "?"
  hostname = hostname.split('?')[0];

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
    switch(type.toLocaleLowerCase()) {
      case "video":
        return MEDIA_VIDEO
      case "image":
        return MEDIA_IMAGE
      case "story":
        return MEDIA_STORY
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
    .filter((item, index, self) =>
    index === self.findIndex((t) => (
      t[property] === item[property]
    ))
  )
}

/**
 * Format number
 * @param {number}
 * @param {format}
 * @return {string}
 */
export function formatNumber(number, format="0.0a") {
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

  return null
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
    let month = newDate.getUTCMonth() > 9 ? newDate.getUTCMonth() : "0" + newDate.getUTCMonth();
    if (month === "00") {
      month = "01";
    }
    let day = newDate.getUTCDate() > 9 ? newDate.getUTCDate() : "0" + newDate.getUTCDate();
    if (day === "00") {
      day = "01";
    }

    return `${year}-${month}-${day}`;
  }

  return null;
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
 * @param {account}
 * @return {string}
 */
export function getAccountSnapshot(account) {
  if (!account) return null;

  return getSnapshot({
    name: account.name,
    birthday: account.birthday,
    phoneNumber: account.phoneNumber,
    avatarUrl: account.avatarUrl,
    bio: account.bio,
    sites: account.sites
  })
}

export function getFullName(firstName, lastName) {
  if (!lastName && firstName) return firstName;
  if (!firstName && lastName) return lastName;

  return firstName + " " + lastName;
}

export function initTheme(theme) {
  const currentTheme = localStorage.getItem("CURRENT_THEME");
  if (currentTheme) {
    return currentTheme;
  }

  localStorage.setItem("CURRENT_THEME", theme);

  return theme;
}

/**
 * Get style depends on themes 'light' or 'dark'
 * @param {theme}
 * @param {light}
 * @param {dark}
 * @return {string}
 */
export function getStyleByTheme (theme, light, dark) {
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

  urlParams.forEach((val, key) => params[key] = val);

  return params;
}

export function getYearFromCurrentDate(years) {
  return new Date().getFullYear() - years;
}

export function formatCurrency(amount, currency = "USD") {
  var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
  });
  return formatter.format(amount);
}

export function formatDate(value) {
  const currentDate = new Date();
  const delta = currentDate - new Date(value);

  //console.log("Delta", delta);

  let options = {};

  //more that 12
  if(delta > 1000*60*60*12) {
    options = { 
      year: "numeric", month: "short", day: "numeric", 
      hour: 'numeric', minute: 'numeric', 
      hour12: true
    };
  } else {
    options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
  }
  
  var formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(new Date(value));
}

export function copyFlatObjectWithIgnore(obj, ignores) {
  if (!obj || !Object.keys(obj).length) return null;
  if (!ignores || !ignores.length) return obj;

  return Object.keys(obj).reduce((acc, curr) => {
    if (!ignores.includes(curr)) {
      return {
        ...acc,
        [curr]: obj[curr]
      }
    }

    return acc;
  }, {});
}