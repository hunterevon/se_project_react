const baseUrl = "http://localhost:3001";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const headers = {
  "Content-Type": "application/json",
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(checkResponse);
