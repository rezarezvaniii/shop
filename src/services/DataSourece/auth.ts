import { Util as REPO_BASE_Util } from "../Repository/BASE/Util";

export async function login(username: string, password: string) {
  const url = "https://dummyjson.com/auth/login";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "emilys",
        password: "emilyspass",
        expiresInMins: 30,
      }),
    });

    return await response.json();
  } catch (error: any) {
    REPO_BASE_Util.dataSourceErrorHandler(error, 1021611);
  }
}

export async function getSession() {
  const url = "https://dummyjson.com/auth/me";
  const token = REPO_BASE_Util.getCookie("accessToken");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error: any) {
    REPO_BASE_Util.dataSourceErrorHandler(error, 1021611);
  }
}
export async function refresh() {
  const url = "https://dummyjson.com/auth/refresh";
  const refreshToken = REPO_BASE_Util.getCookie("refreshToken");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        refreshToken: `${refreshToken}`,
        expiresInMins: 30,
      }),
    });

    return await response.json();
  } catch (error: any) {
    REPO_BASE_Util.dataSourceErrorHandler(error, 1021611);
  }
}
