export default async function handler(req, res) {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).json({ error: "url is required" });
  }

  try {
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", response.headers.get("content-type"));
    res.send(Buffer.from(buffer));
  } catch (e) {
    res.status(500).json({ error: "failed to fetch image" });
  }
}
