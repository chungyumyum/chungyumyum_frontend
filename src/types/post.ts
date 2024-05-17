import { BadgeType } from "./badge";

export type Post = {
  id: number;
  restaurantName: string;
  imageUrls: string[];
  description: string;
  rating: string;
  writerName: string;
  writerRank: BadgeType;
};

export type PostDetail = Post & {
  alereadyBookmarked: boolean;
};
