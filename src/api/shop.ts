import { Shop } from "../types/shop";
import { instance } from "./base";

export async function getShops({
  town = "",
  name = "",
  page = 0,
  size = 20,
  sort = "string",
}: {
  town?: string;
  name?: string;
  page?: number;
  size?: number;
  sort?: string;
}): Promise<Shop[]> {
  return (
    await instance.get(
      `/restaurants?town=${town}&name=${name}&page=${page}&size=${size}&sort=${sort}`
    )
  ).data;
}
