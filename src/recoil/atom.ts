import { atom } from "recoil";
import { Town } from "../types/town";

export const searchState = atom({
  key: "searchState",
  default: "",
});

export const townsState = atom<Town[]>({
  key: "townsState",
  default: [
    "GUNGDONG",
    "BONGMYEONG_DONG",
    "EOEUN_DONG",
    "JUKDONG",
    "JANGDAE_DONG",
  ],
});
