import { ProfileType } from "../types/profile";
import { instance } from "./base";

export async function getProflie(): Promise<ProfileType> {
  return (
    await instance.get("/members/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  ).data;
}
