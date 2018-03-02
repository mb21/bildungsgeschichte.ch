const serverdata = fetch("http://uzhife.eurospider.com/configuration.json").then( d => d.json() );

export function getFacets() {
  return serverdata.then( d => d.facets )
}

export function getCheckedFacets() {
  let facets;
  try {
    const params = new URLSearchParams(document.location.search);
    facets = JSON.parse( decodeURIComponent( params.get('facets') ) )
  } catch(e) {
    console.error("failed to parse facets URI parameter", e)
  }
  return facets || [];
}

// Returns a promise
export async function getRecord(id) {
  const sd = await serverdata
      , url = sd._links.item.href
      ;
  return fetch(url.replace("{id}", id), {
    headers: {
      'Accept': 'application/json'
    }
  }).then(handleResponse);
}

// Returns a promise
export async function queryRecords(q, facets=[]) {
  const sd = await serverdata
      , url = sd._links.search.href
      , query = {
          "query" : q
        , facets: facets
        }
      ;
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(query)
  }).then(handleResponse)
    .then( d => {console.log("queryRecords", d); return d;} ) //debug
}

const handleResponse = res => {
  if (res.ok) {
    return res.json();
  } else {
    alert("Error fetching data");
    return Promise.reject(res);
  }
}
