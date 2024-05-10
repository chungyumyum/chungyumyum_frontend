import axios from "axios";
import { Post } from "../types/post";

export async function getPost(id: string): Promise<Post> {
  return (await axios.get(`/posts/${id}`)).data;
}

// export async function putPost(id:string){
//     return (await axios.post())
// }

export async function deletePost(id: string) {
  await axios.delete(`/posts/${id}`);
}

export async function getPosts(name: string): Promise<Post[]> {
  return (await axios.get(`/posts?name=${name}`)).data;
}

// export async function createPost(){}

export async function getMyPosts(): Promise<Post[]> {
  return (await axios.get("/posts/my")).data;
}
