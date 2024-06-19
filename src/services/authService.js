const backendDomain = "http://localhost:8888/api/v1/auth/";
//////////////////////////////////////////////
export const signup = async (signUpData) => {
  try {
    const res = await fetch(`${backendDomain}signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(signUpData),
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const login = async (loginData) => {
  try {
    const res = await fetch(`${backendDomain}login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    });
    return await res.json();
  } catch (err) {
    console.log(err.message);
  }
};
//////////////////////////////////////////////
export const blockUser = async (id, activeStatus, token) => {
    try {
      const res = await fetch(`${backendDomain}${id}`, {
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
export const getAllUsers = async (token) => {
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