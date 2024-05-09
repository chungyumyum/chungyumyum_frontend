import { Town } from "./town";

export type Shop = {
  id: number;
  name: string;
  jibunAddress: string;
  latitude: string;
  longitude: string;
  town: Town | null;
};
