import numeral from "numeral";

import ENDPOINTS from '../constants/endpoints';
import { MEDIA_IMAGE, MEDIA_VIDEO, MEDIA_STORY } from '../constants/media_types';
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
    return token;
  }
  return null;
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
