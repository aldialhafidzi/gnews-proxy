export default async function handler(req, res) {
  const category = req.query.category || "general";
  const API_KEY = process.env.GNEWS_API_KEY;

  try {
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
