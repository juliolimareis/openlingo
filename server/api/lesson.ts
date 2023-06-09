import fs from "fs";
import useVideo from "../utils/video";

export default defineEventHandler(async () => {
  const video = useVideo();

  return await fs.readFileSync("v1/auth.ts", "utf8");

  // return video.getSubtitle(["https://www.youtube.com/watch?v=qANpuNm9Dkg"]);
});