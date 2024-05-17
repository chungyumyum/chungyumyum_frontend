import { useState } from "react";

export default function useSelectedTowns() {
  const [towns, setTowns] = useState([
    "GUNGDONG",
    "BONGMYEONG_DONG",
    "EOEUN_DONG",
    "JUKDONG",
    "JANGDAE_DONG",
  ]);

  return { towns, setTowns };
}
