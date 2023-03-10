import { createPath, parseJwt, request } from "./api";

export const auth = async (data) => {
  let res = await request({
    url: "/auth/register/",
    method: "POST",
    data: JSON.stringify(data),
  });
  console.log("TOK", res);
  // localStorage.setItem("cook", token.token);
  return res
};

export const verificationCode = async (data) => {
  let token = await request({
    url: "/auth/login/",
    method: "POST",
    data: JSON.stringify(data),
  });
  localStorage.setItem("cook", token.token);
  return token?.token
};
