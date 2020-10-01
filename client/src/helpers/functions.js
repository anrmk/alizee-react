import ENDPOINTS from '../constants/endpoints';

/**
 * Generate URL string
 * @param {string} endpoint
 * @param {string} api
 * @param {string} postfix
 * @return {string}
 */
export function generateUrl(endpoint, api = ENDPOINTS, postfix = null) {
  if (!api.endpoints.hasOwnProperty(endpoint)) {
    console.warn(`There is no ${endpoint} endpoint`)
    return endpoint
  }
  const endpointUrl = api.endpoints[endpoint]
  const url = `${api.url}/${endpointUrl}`
  return postfix ? `${url}/${postfix}` : url
}

/**
 * Added 'https' prefix before URL
 * @param {string} url
 * @return {string}
 */
export function wrapHttps(url) {
  return `https://${url}`
}