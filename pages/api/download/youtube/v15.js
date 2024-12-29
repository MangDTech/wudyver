import axios from "axios";
import {
  FormData
} from "formdata-node";
const userAgentList = ["Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36", "Mozilla/5.0 (Linux; Android 10; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36"];
class YTDL {
  constructor() {
    this.userAgent = userAgentList[Math.floor(Math.random() * userAgentList.length)];
  }
  async fetchDescription(youtubeUrl) {
    try {
      const response = await axios.post("https://contentforest.com/api/tools/youtube-video-data", {
        youtube_link: youtubeUrl,
        pick_keys: ["title", "description", "shortDescription"]
      }, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          "Content-Type": "application/json",
          Origin: "https://contentforest.com",
          Referer: "https://contentforest.com/tools/youtube-description-extractor",
          "User-Agent": this.userAgent
        }
      });
      return response.data.shortDescription.replace(/\n+/g, " ").trim();
    } catch (error) {
      throw new Error("Error fetching video description");
    }
  }
  async fetchVideoData(youtubeUrl) {
    try {
      const apiUrl = `https://p.oceansaver.in/ajax/download.php?copyright=0&format=1080&url=${encodeURIComponent(youtubeUrl)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;
      const downloadRequest = await axios.get(apiUrl, {
        headers: {
          "User-Agent": this.userAgent,
          referer: "https://ddownr.com/"
        }
      });
      if (!downloadRequest.data.success) {
        throw new Error("Failed to initiate download.");
      }
      const {
        id: videoId,
        info: {
          title: videoTitle,
          image: thumbnailUrl
        }
      } = downloadRequest.data;
      let downloadUrl = "";
      while (true) {
        const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${videoId}`;
        const progressRequest = await axios.get(progressUrl);
        if (progressRequest.data.success && progressRequest.data.progress >= 1e3) {
          downloadUrl = progressRequest.data.download_url;
          break;
        }
        await new Promise(resolve => setTimeout(resolve, 3e3));
      }
      if (!downloadUrl) {
        throw new Error("Failed to fetch download URL.");
      }
      const downloadResponse = await axios.get(downloadUrl, {
        responseType: "arraybuffer"
      });
      const videoBuffer = downloadResponse.data;
      const formData = new FormData();
      formData.append("reqtype", "fileupload");
      formData.append("fileToUpload", videoBuffer, {
        filename: `${videoTitle.replace(/\s/g, "_")}.mp4`
      });
      const uploadResponse = await axios.post("https://catbox.moe/user/api.php", formData, {
        headers: {
          "User-Agent": this.userAgent
        }
      });
      const description = await this.fetchDescription(youtubeUrl);
      return {
        title: videoTitle,
        thumbnail: thumbnailUrl,
        description: description,
        downloadUrl: uploadResponse.data
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }
  const {
    url
  } = req.method === "GET" ? req.query : req.body;
  if (!url) {
    return res.status(400).json({
      error: "Missing YouTube URL"
    });
  }
  try {
    const ytdl = new YTDL();
    const data = await ytdl.fetchVideoData(url);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}