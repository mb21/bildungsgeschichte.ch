const handleResponse = res => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res.statusText);
  }
}

const catchError = e => {
  alert(e);
  return Promise.reject(e);
}

const serverdata = fetch("http://uzhife.eurospider.com/configuration.json")
                     .then( d => d.json() ).catch(catchError)

export function getInitialFacets() {
  return serverdata.then( d => d.facets )
}

export function getFacetTranslations() {
  return serverdata.then( d => d.translations )
}

// Returns a promise
export async function getRecord(id) {
  const sd = await serverdata
      , url = sd._links.getdoc.href
      ;
  return fetch(url.replace("{id}", id), {
    headers: {
      'Accept': 'application/json'
    }
  }).then(handleResponse).catch(catchError)
}

// Returns a promise
export async function queryRecords(q, facets=[], sort="default") {
  const sd = await serverdata
      , url = sd._links.search.href
      , query = {
          "query": q
        , facets: facets
        , sort: sort
        }
      ;
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(query)
  }).then(handleResponse).catch(catchError)
}
