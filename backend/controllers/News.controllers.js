import axios from "axios";
import * as cheerio from "cheerio";

export const GetNews = async (req, res) => {
  try {
    const response = await axios.get("https://kathmandupost.com/national", {
      responseType: "text",
    });

    const html = response.data;
    const $ = cheerio.load(html);
    const newsList = [];

    $("article").each((i, el) => {
      const headline = $(el).find("h3").text().trim();
      const slug = $(el).find("p").text().trim();
      const link = $(el).find("a").attr("href");
      const image =
        $(el).find("figure img").attr("data-src") ||
        $(el).find("figure img").attr("src");

      newsList.push({
        headline,
        slug,
        image,
        link
      })
      
    });

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.json({ source: "kathmandupost", total: newsList.length, news: newsList });
  } catch (error) {
    console.error("Scraping error:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
