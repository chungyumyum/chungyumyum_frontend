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
