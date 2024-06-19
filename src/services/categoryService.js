const backendDomain = "http://localhost:8888/api/v1/category/";
//////////////////////////////////////////////
export const createCategory = async (data, token) => {
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
export const updateCategory = async (data, id, token) => {
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
export const deleteCategory = async (id, token) => {
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
export const getAllCategories = async (token) => {
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
export const getCategory = async (categoryId, token) => {
  try {
    const res = await fetch(`${backendDomain}${categoryId}`, {
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