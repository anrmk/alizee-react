import ENDPOINTS from "../constants/endpoints";
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

  return currentOffset + step >= total ? total + step : currentOffset + step;
}
