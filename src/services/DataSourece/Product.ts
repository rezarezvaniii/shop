import { Util as REPO_BASE_Util } from "../Repository/BASE/Util";
export async function getList(skip: number) {
  const url = `https://dummyjson.com/products/?limit=16&skip=${skip}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error: any) {
    REPO_BASE_Util.dataSourceErrorHandler(error, 1021611);
  }
}
