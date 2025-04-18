import useGlobalStore from "@/store/GlobalStore";

export const getUserProfile = async ({ username, email, password }) => {
  try {
    let response = await fetch("/api/users/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": useGlobalStore.getState().token,
      },
    });
    const body = await response.json();
    if (response.status >= 400) {
      if (
        body?.msg === "Token is not valid" ||
        body?.msg === "Token is blacklisted, authorization denied"
      ) {
        useGlobalStore.getState().logout();
      }
      throw new Error(body?.msg);
    }
    return body;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateUserProfile = async ({ username, email, password }) => {
  const obj = {
    username,
    email,
    password,
  };
  // filter out undefined properties
  const filteredObj = Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== undefined) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});

  try {
    let response = await fetch("/api/users/me", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": useGlobalStore.getState().token,
      },
      body: JSON.stringify(filteredObj),
    });
    const body = await response.json();
    if (response.status >= 400) {
      if (
        body?.msg === "Token is not valid" ||
        body?.msg === "Token is blacklisted, authorization denied"
      ) {
        useGlobalStore.getState().logout();
      }
      throw new Error(body?.msg);
    }
    return body;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteUser = async () => {
  console.log("called delete user");
  try {
    let response = await fetch("/api/users/me", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": useGlobalStore.getState().token,
      },
    });
    const body = await response.json();
    if (response.status >= 400) {
      if (
        body?.msg === "Token is not valid" ||
        body?.msg === "Token is blacklisted, authorization denied"
      ) {
        useGlobalStore.getState().logout();
      }
      throw new Error(body?.msg);
    }
    return body;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
