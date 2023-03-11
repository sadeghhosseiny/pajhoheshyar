import { request } from "./api";

export const getThesisApi = () => {
  return request({
    url: "/thesis/",
  });
};

export const getMessagesApi = () => {
  return request({
    url: "/message/",
  });
};

export const getRefereeApi = () => {
  return request({
    url: "/teacher/",
  });
};

export const sendThesisApi = (data) => {
  return request({
    url: "/thesis/",
    method: "POST",
    data: JSON.stringify(data),
  });
};

export const sendMessageApi = (data) => {
  return request({
    url: "/message/",
    method: "POST",
    data: JSON.stringify(data),
  });
};

export const editThesis = (data, id) => {
  return request({
    url: `/thesis/${id}/`,
    method: "PATCH",
    data: JSON.stringify(data),
  });
};

export const getUserApi = () => {
  return request({
    url: `/user/`,
  });
};
