import { createPath, parseJwt, request } from "./api";

export const auth = async (data) => {
  let res = await request({
    url: "/auth/register/",
    method: "POST",
    data: JSON.stringify(data),
  });
  res?.token && localStorage.setItem("cook", res.token);
  return res;
};

export const login = async (data) => {
  let res = await request({
    url: "/auth/login/",
    method: "POST",
    data: JSON.stringify(data),
  });
  res?.token && localStorage.setItem("cook", res.token);
  return res;
};
