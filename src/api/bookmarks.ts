import { Post } from "../types/post";
import { instance } from "./base";

export async function getBookmarkedPosts(): Promise<Post[]> {
  return (
    await instance.get(`/bookmarks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
  ).data;
}

export async function storeBookmarkedPost(postId: number) {
  await instance.post(`/bookmarks?postId=${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}

export async function deleteBookmarkedPost(postId: number) {
  await instance.delete(`/bookmarks?postId=${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
}
