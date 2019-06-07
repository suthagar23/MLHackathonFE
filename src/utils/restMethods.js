

const baseUrl = 'http://localhost:3000';
export const fetchPost = (url, payload) => {
  return fetch(baseUrl.concat(url), {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload),
  }).then(res => res.json())
    .then(res => res)
    .catch(error => error);
};


export const fetchGet = (url) => {
  return fetch(baseUrl.concat(url), {
    method: 'get',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  }).then(res => res.json())
    .then(res => res)
    .catch(error => error);
};