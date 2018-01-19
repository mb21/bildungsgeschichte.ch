// Returns a promise
export function getRecord(id) {
  return fetch("http://uzhifetest.eurospider.com/search/test_collection/doc/" + id, {
    headers: {
      'Accept': 'application/json'
    }
  }).then( d => d.json() );
}

// Returns a promise
export function queryRecords(q, facets=[]) {
  const url = "http://uzhifetest.eurospider.com/ife-service/rest/search"
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
  }).then( d => d.json() )
}
