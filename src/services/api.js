const baseURL = "http://127.0.0.1:8000";

const createPath = (url) => {
  return baseURL + url;
};

export const request = async ({ url, method, data }) => {
  let token = localStorage.getItem("cook");
  let res;
  try {
    res = await fetch(createPath(url), {
      method: method || "GET",
      body: data,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        accept: "*/*",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    }).then(res => res.json());
  } catch(e) {
    console.log("ererererererere", e);
    throw e
  }
  console.log("JWWWWWWWWWWt", parseJwt(token));
  console.log("RES", res);
  if (res) return res;
};

export const parseJwt = (token) => {
  try {

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
    } catch(e) {
      return null
    }
};
