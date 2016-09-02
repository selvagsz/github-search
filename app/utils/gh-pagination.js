export function parseLinkHeaders(header) {
  if (Ember.isBlank(header)) {
    return;
  }

  // Split parts by comma
  let parts = header.split(',');
  let links = {};
  // Parse each part into a named link
  for(let i=0, l=parts.length; i<l; i++) {
    let section = parts[i].split(';');
    if (section.length !== 2) {
      throw new Error("section could not be split on ';'");
    }
    let url = section[0].replace(/<(.*)>/, '$1').trim();
    let name = section[1].replace(/rel="(.*)"/, '$1').trim();
    links[name] = url;
  }
  return links;
}

export function getQueryParms(urlString) {
  let result = {};
  let params = (urlString.split('?')[1] || '').split('&');
  for(let param in params) {
    if (params.hasOwnProperty(param)) {
      let paramParts = params[param].split('=');
      result[paramParts[0]] = decodeURIComponent(paramParts[1] || "");
    }
  }
  return result;
}

export function getPaginationParams(linkHeader) {
  let links = parseLinkHeaders(linkHeader);
  let paginationParams = {};

  for (let key in links) {
    paginationParams[key] = getQueryParms(links[key]);
  }

  return paginationParams;
}
