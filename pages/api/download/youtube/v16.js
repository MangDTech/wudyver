import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.method === "GET" ? req.query : req.body;

  if (!id) {
    return res.status(400).json({ error: "ID YouTube tidak ditemukan" });
  }

  try {
    const { data: tokenData } = await axios.get('https://yt.tioo.eu.org/token', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://yt.tioo.eu.org/',
      },
    });

    const { token } = tokenData;
    const { data: videoData } = await axios.get('https://yt.tioo.eu.org/youtube', {
      params: { url: `https://www.youtube.com/watch?v=${id}` },
      headers: {
        'Authorization-Token': token,
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://yt.tioo.eu.org/',
      },
    });

    res.status(200).json(videoData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
