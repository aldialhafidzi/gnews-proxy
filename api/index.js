import express from "express";
import fetch from "node-fetch";

const app = express();

const GNEWS_BASE_URL = "https://gnews.io/api/v4";
const API_KEY = process.env.GNEWS_API_KEY;

// Middleware CORS (simple)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

/**
 * GET /api/search?q=example
 */
app.get("/api/search", async (req, res) => {
  try {
    const q = req.query.q || "example";

    const url = `${GNEWS_BASE_URL}/search?q=${encodeURIComponent(
      q,
    )}&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch GNews search",
      error: error.message,
    });
  }
});

/**
 * GET /api/top-headlines?category=general
 */
app.get("/api/top-headlines", async (req, res) => {
  try {
    const category = req.query.category || "general";

    const url = `${GNEWS_BASE_URL}/top-headlines?category=${category}&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch GNews headlines",
      error: error.message,
    });
  }
});

export default app;
