const MediaType = {
  X_WWW_FORM_URL_ENCODED: 'application/x-www-form-urlencoded',
  APPLICATION_JSON: 'application/json',
};

export async function clientHttpPost(url, payload) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...payload }),
  });
}

export async function clientHttpGet(url, queryStringObject) {
  const params = new URLSearchParams(queryStringObject).toString();
  return fetch(`${url}?${params}`);
}

export async function post(
  url,
  payload,
  { contentType = MediaType.APPLICATION_JSON, ...rest } = {}
) {
  let body;
  if (contentType === MediaType.X_WWW_FORM_URL_ENCODED) {
    body = new URLSearchParams(payload).toString();
  } else {
    body = JSON.stringify({ ...payload });
  }
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
      ...rest,
    },
    body,
  });
}

export function throwOnHttpError(response) {
  if (response.ok) {
    return;
  }
  const error = new Error(response.statusText);
  error.httpError = true;
  error.httpStatus = response.status;
  error.message = `Could not complete request. (${response.status})`;
  throw error;
}

export function throwOnResponseError(result) {
  if (result.status) {
    return;
  }
  const error = new Error(result.message);
  error.isResponseError = true;
  error.responseCode = result.responseCode;
  error.message = result.message;
  throw error;
}
