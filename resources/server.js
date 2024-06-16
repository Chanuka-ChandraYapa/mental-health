// server.js
const express = require("express");
const axios = require("axios");
const xml2js = require("xml2js");
const cors = require("cors");
const { JSDOM } = require("jsdom");

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());

app.get("/medium-feed", async (req, res) => {
  try {
    const rssUrl = "https://medium.com/feed/@skeiiidameee"; // Replace with your Medium RSS feed URL
    const response = await axios.get(rssUrl, {
      headers: { Accept: "application/rss+xml" },
    });
    const data = await xml2js.parseStringPromise(response.data, {
      mergeAttrs: true,
    });

    const articles = data.rss.channel[0].item.map((item) => {
      // Extract the first image from the content:encoded field
      const content = item["content:encoded"][0];
      const dom = new JSDOM(content);
      const firstImage =
        dom.window.document.querySelector("figure img")?.src || "";

      return {
        title: item.title[0],
        link: item.link[0],
        // description: item.description[0],
        author: item["dc:creator"][0],
        pubDate: item.pubDate[0],
        guid: item.guid[0]._,
        image: firstImage, // Add the extracted image URL
      };
    });

    res.json({ items: articles });
  } catch (error) {
    console.error("Error fetching Medium articles", error);
    res.status(500).json({ message: "Error fetching Medium articles" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
