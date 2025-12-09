const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // try to include server response body in the error for easier debugging
  return res
    .text()
    .then((text) => {
      const body = text || res.statusText || "";
      return Promise.reject(new Error(`HTTP ${res.status}: ${body}`));
    })
    .catch(() => Promise.reject(new Error(`HTTP ${res.status}`)));
};

const headers = {
  "Content-Type": "application/json",
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(checkResponse);

export const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(checkResponse);
};

export const removeItem = (itemID) => {
  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers,
  }).then(checkResponse);
};
