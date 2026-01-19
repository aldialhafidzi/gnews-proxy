export default async function handler(req, res) {
  const q = req.query.q || "example";
  const page = req.query.page || 1;
  const max = req.query.max || 5;
  const API_KEY = process.env.GNEWS_API_KEY;

  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
      q,
    )}&page=${page}&max=${max}&lang=en&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
