import { createPath, parseJwt, request } from "./api";

export const auth = async (phoneNumber) => {
  request({
    url: "/auth/send_verification_code/",
    method: "POST",
    data: JSON.stringify(phoneNumber),
  });
};

export const verificationCode = async (data) => {
  let token = await request({
    url: "/auth/verify_code/",
    method: "POST",
    data: JSON.stringify(data),
  });
  localStorage.setItem("cook", token.token);
};
