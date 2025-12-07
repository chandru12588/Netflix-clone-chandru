import axios from "axios";

const API_KEY = import.meta.env.VITE_YT_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YT_CHANNEL_ID;

// Fetch all videos
export const getAllVideos = async () => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&type=video&order=date&key=${API_KEY}`;
  const res = await axios.get(url);
  return res.data.items;
};
