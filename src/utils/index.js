
// Returns a promise
export function getRecord(id) {
  return fetch("http://uzhifetest.eurospider.com/search/collection1/doc/" + id, {
    headers: {
      'Accept': 'application/json'
    }
  });
}

// Returns a promise
export function queryRecords(q) {
  const url = "http://uzhifetest.eurospider.com/search/uzh_bildungsgeschichte/doc/_search"
      , query = {
          "query" : {
            "bool" : {
              "must" : {
                "query_string" : {
                  "query" : q
                }
              }
            }
          }
        }
      ;
  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(query)
  });
}
