// server.js
const express = require("express");
const axios = require("axios");
const xml2js = require("xml2js");
const bodyParser = require("body-parser");
const cors = require("cors");
const { JSDOM } = require("jsdom");
const cheerio = require("cheerio");
const smmry = require("smmry")({ SM_API_KEY: "0CFBFC74B1" });

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(bodyParser.json()); // Ensure this line is included to parse JSON requests
app.use(bodyParser.urlencoded({ extended: true }));

var additionalUrls = [];
var createdPosts = [];

app.get("/extract", async (req, res) => {
  const { url } = req.query;
  if (!additionalUrls.includes(url)) {
    additionalUrls = [url, ...additionalUrls];
  }

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const title = $("title").text();
    const mainImage = $('meta[property="og:image"]').attr("content");
    const content = $("p").text();
    res.json({
      title,
      mainImage,
      content,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error extracting data" });
  }
});

app.post("/createArticle", (req, res) => {
  console.log(req);
  const { title, content, imageUrl } = req.body;
  const newArticle = {
    title: title,
    link: "",
    author: "",
    pubDate: Date.now(),
    guid: "",
    image: imageUrl,
    content,
  };
  createdPosts.push(newArticle);
  res.json(newArticle);
});

app.get("/medium-feed", async (req, res) => {
  let multipleArticles = [];
  let urls = [
    "https://medium.com/feed/@thelifedesignhub",
    "https://medium.com/feed/@riskaislmyh",
  ];
  try {
    for (const rssUrl of urls) {
      const response = await axios.get(rssUrl, {
        headers: { Accept: "application/rss+xml" },
      });
      const data = await xml2js.parseStringPromise(response.data, {
        mergeAttrs: true,
      });

      const articles = data.rss.channel[0].item.map((item) => {
        const content = item["content:encoded"][0];
        const dom = new JSDOM(content);
        const firstImage =
          dom.window.document.querySelector("figure img")?.src || "";

        return {
          title: item.title[0],
          link: item.link[0],
          author: item["dc:creator"][0],
          pubDate: item.pubDate[0],
          guid: item.guid[0]._,
          image: firstImage,
        };
      });

      multipleArticles = [...multipleArticles, ...articles];
    }
    // Fetch additional articles from URLs
    // Replace with your actual URLs

    const additionalArticles = await Promise.all(
      additionalUrls.map(async (url) => {
        try {
          const response = await axios.get(url);
          const html = response.data;
          const $ = cheerio.load(html);

          const title = $("title").text();
          const mainImage = $('meta[property="og:image"]').attr("content");
          const content = $("p").text();

          return {
            title,
            link: url,
            author: "", // Adjust as needed
            pubDate: new Date().toISOString(),
            guid: url,
            image: mainImage,
            content,
          };
        } catch (error) {
          console.error(`Error fetching additional article from ${url}`, error);
          return null;
        }
      })
    );

    const validAdditionalArticles = additionalArticles.filter(
      (article) => article !== null
    );

    // Combine Medium articles and additional articles
    const allArticles = [
      ...validAdditionalArticles,
      ...createdPosts,
      ...multipleArticles,
    ];

    // const summaries = await Promise.all(
    //   allArticles.map(async (article) => {
    //     const summaryResponse = await axios.get(`https://api.smmry.com/`, {
    //       params: {
    //         SM_API_KEY: "0CFBFC74B1",
    //         sm_url: article.link,
    //       },
    //     });
    //     return { ...article, summary: summaryResponse.data.sm_api_content };
    //   })
    // );
    // smmry
    //   .summarizeUrl(
    //     "https://medium.com/@chanukachandrayapa/reality-is-often-disappointing-b35aa57e588"
    //   )
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    res.json({ items: allArticles });
  } catch (error) {
    console.error("Error fetching Medium articles", error);
    res.status(500).json({ message: "Error fetching Medium articles" });
  }
});

app.get("/summary", async (req, res) => {
  const { url } = req.query;
  try {
    const data = await smmry.summarizeUrl(url, {
      SM_LENGTH: 3,
    });
    console.log(data);
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to summarize URL" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
