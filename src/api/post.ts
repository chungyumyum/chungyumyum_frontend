import axios from "axios";
import { Post, PostDetail } from "../types/post";
import { instance } from "./base";
import { Town } from "../types/town";

export async function getPost(id: string): Promise<PostDetail> {
  return (await instance.get(`/posts/${id}`)).data;
}

// export async function putPost(id:string){
//     return (await axios.post())
// }

export async function deletePost(id: string) {
  await instance.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

export async function getPosts({
  towns = [
    "GUNGDONG",
    "JANGDAE_DONG",
    "BONGMYEONG_DONG",
    "EOEUN_DONG",
    "JUKDONG",
  ],
  name = "",
  page,
  size,
  sort,
}: {
  towns?: Town[];
  name?: string;
  page?: number;
  size?: number;
  sort?: string;
}): Promise<Post[]> {
  const townsQuery = towns?.map((town) => `town=${town}`).join("&");
  const keywordQuery = name === "" ? "" : `&keyword=${name}`;

  return (
    await instance.get(
      `/posts?${townsQuery}${keywordQuery}&page=${page}&size=${size}&sort=${sort}`
    )
  ).data;
}

export async function createPost({
  restaurantId,
  rating,
  description,
  postImageUrls,
}: {
  restaurantId: number;
  rating: string;
  description: string;
  postImageUrls: string[];
}) {
  return await instance.post(
    `/posts`,
    {
      restaurantId,
      rating,
      description,
      postImageUrls,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
}

export async function updatePost({
  postId,
  restaurantId,
  rating,
  description,
  postImageUrls,
}: {
  postId: number;
  restaurantId: number;
  rating: string;
  description: string;
  postImageUrls: string[];
}) {
  return await instance.put(
    `/posts/${String(postId)}`,
    {
      restaurantId,
      rating,
      description,
      postImageUrls,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
}

export async function getMyPosts(): Promise<Post[]> {
  return (
    await instance.get("/posts/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  ).data;
}
