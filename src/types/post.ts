export type Post = {
  id: number;
  restaurantName: string;
  imageUrl: string;
  description: string;
  rating: string;
  writerName: string;
  writerRank: string;
};

export type PostDetail = Post & {
  alereadyBookmarked: boolean;
};
