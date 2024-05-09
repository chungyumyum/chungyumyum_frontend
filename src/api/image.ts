import { Image } from "../types/image";
import { instance } from "./base";

export async function getPresignedUrl(file: any): Promise<Image> {
  return (
    await instance.post(
      "/aws/s3/presigned-url",
      {
        fileName: file,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
  ).data;
}
