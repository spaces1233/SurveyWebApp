import useGlobalStore from "@/store/GlobalStore";

export const signUp = async ({ username, email, password }) => {
  try {
    let response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const body = await response.json();
    if (response.status >= 400) {
      throw new Error(body?.msg);
    }
    return body;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const signIn = async ({ email, password }) => {
  try {
    let response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const body = await response.json();
    if (response.status >= 400) {
      throw new Error(body?.msg);
    }
    return body;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const logout = async () => {
  try {
    let response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-auth-token": useGlobalStore.getState().token,
      },
    });
    const body = await response.json();
    if (response.status >= 400) {
      throw new Error(body?.msg);
    }
    return body;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
