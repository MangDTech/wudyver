import axios from 'axios';

const sources = [
  text => `https://genius.com/api/search/multi?q=${encodeURIComponent(text)}&sort=popularity&text_format=plain&page=1&per_page=5`,
  text => `https://notapi.vercel.app/api/lyrics?q=${encodeURIComponent(text)}`,
  text => `https://globalapis.onrender.com/api/lyrics?songName=${encodeURIComponent(text)}`,
  text => `https://api.textyl.co/api/lyrics?q=${encodeURIComponent(text)}`,
  text => `https://king-aryanapis.onrender.com/api/lyrics?songName=${encodeURIComponent(text)}`,
  text => `https://lyrist.vercel.app/api/${encodeURIComponent(text)}`
];

const fetchLyrics = async (url) => {
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      const data = res.data;
      if (data) return data;
    }
  } catch (error) {}
  return null;
};

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });
  }

  const { type = 1, text } = req.query;

  if (!text) {
    return res.status(400).json({
      success: false,
      message: "Parameter text is required"
    });
  }

  const index = Math.max(0, Math.min(sources.length - 1, parseInt(type, 10) - 1));
  const urls = [sources[index](text), ...sources.filter((_, i) => i !== index).map(fn => fn(text))];

  let result = null;
  for (const url of urls) {
    result = await fetchLyrics(url);
    if (result) break;
  }

  if (result) {
    return res.status(200).json({
      result: result
    });
  }

  return res.status(500).json({
    success: false,
    message: "All sources failed"
  });
}
