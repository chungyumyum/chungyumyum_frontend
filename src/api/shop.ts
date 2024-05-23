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
      `/restaurants?town=GUNGDONG&town=BONGMYEONG_DONG&town=EOEUN_DONG&town=JUKDONG&town=JANGDAE_DONG&name=${name}&page=${page}&size=${size}&sort=${sort}`
    )
  ).data;
}
