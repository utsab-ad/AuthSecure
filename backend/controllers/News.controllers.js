import axios from "axios";
import * as cheerio from "cheerio";

export const GetKathmanduPost = async (req, res) => {
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
        link,
      });
    });

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.json({
      source: "kathmandupost",
      total: newsList.length,
      news: newsList,
    });
  } catch (error) {
    console.error("Scraping error:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
export const GeteKantipur = async (req, res) => {
  try {
   const response = await axios.get("https://ekantipur.com/news", {
      responseType: "text", 
    });

    const html = response.data;
    const $ = cheerio.load(html);
    const newsList = [];

    $("article.normal").each((i, el) => {
      const headline = $(el).find("h2 a").text().trim();
      const anchor = $(el).find("h2 a").attr("href");
      const link = `https://ekantipur.com${anchor}`;
      const slug = $(el).find("p").text().trim();
      const image = $(el).find(".image figure a img").attr("src") || $(el).find(".image figure a img").attr("data-src");

      newsList.push({
        headline,
        slug,
        image,
        link,
      });
    });

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.json({
      source: "Kantipur",
      total: newsList.length,
      news: newsList,
    });
  } catch (error) {
    console.error("Scraping error:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

export const GetTechPana = async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.techpana.com/category/previous-updates",
      {
        responseType: "text",
      }
    );

    const html = response.data;
    const $ = cheerio.load(html);
    const newsList = [];

    $(".single_grid-wrapper").each((i, el) => {
      const anchor = $(el).find("h4 a");
      const headline = anchor.text().trim();
      const link = anchor.attr("href")?.startsWith("http")
        ? anchor.attr("href")
        : `https://www.techpana.com${anchor.attr("href")}`;
      const image =
        $(el).find("img").attr("data-src") ||
        $(el).find("img").attr("src") || "";

      newsList.push({
        headline,
        image,
        link,
      });
    });

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.json({
      source: "techpana",
      total: newsList.length,
      news: newsList,
    });
  } catch (error) {
    console.error("Scraping error:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
