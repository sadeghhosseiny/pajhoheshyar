const baseURL = "http://127.0.0.1:8000";

const createPath = (url) => {
  return baseURL + url;
};

export const request = async ({ url, method, data }) => {
  let token = localStorage.getItem("cook");
  const res = await fetch(createPath(url), {
    method: method || "GET",
    body: data,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      accept: "*/*",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  let resData = await res.json();
  if (resData) return resData;
};

export const parseJwt = (token) => {
  var base64Url = token?.split(".")[1];
  var base64 = base64Url?.replace(/-/g, "+")?.replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON?.parse(jsonPayload);
};
