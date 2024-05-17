import { BadgeType } from "./badge";

export type Post = {
  id: number;
  restaurantName: string;
  imageUrl: string;
  description: string;
  rating: string;
  writerName: string;
  writerRank: BadgeType;
};

export type PostDetail = Post & {
  alereadyBookmarked: boolean;
  imageUrls: string[];
};
