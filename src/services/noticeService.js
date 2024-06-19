const backendDomain = "http://localhost:8888/api/v1/notice/";
//////////////////////////////////////////////
export const createNotice = async (data, token) => {
  try {
    const res = await fetch(`${backendDomain}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const updateNotice = async (data, id, token) => {
  try {
    const res = await fetch(`${backendDomain}${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const blockNotice = async (activeStatus, id, token) => {
  try {
    const res = await fetch(`${backendDomain}block/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify(activeStatus),
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const deleteNotice = async (id, token) => {
  try {
    const res = await fetch(`${backendDomain}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    const dataResponse = await res.json();
    return dataResponse;
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const getAllNotices = async (token) => {
  try {
    const res = await fetch(`${backendDomain}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const getNotice = async (id, token) => {
  try {
    const res = await fetch(`${backendDomain}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};