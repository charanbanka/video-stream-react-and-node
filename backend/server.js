const express = require("express");
const fs = require("fs");
var cors = require("cors");

var app = express();
const corsOptions = {
  origin: "http://localhost:3000", // Allow only requests from this origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Include cookies when sending requests
  optionsSuccessStatus: 204, // Respond with 204 No Content for preflight requests
};

// Enable CORS for all routes
app.use(cors());

// Handle preflight requests
app.options('*', cors());

app.get("/", (req, res) => {
  res.send("app is connected");
});

app.get("/getVideos", (req, res) => {
  let videos = [{ name: "bigbuck" }, { name: "sample" }];
  res.status(200).json(videos || []);
});

const videoFileMap = {
  bigbuck: "videos/bigbuck.mp4",
  sample: "videos/sample.mp4",
};

app.get("/videos/:filename", (req, res) => {
  const filename = req.params.filename;
  const filepath = videoFileMap[filename];
  if (!filepath) return res.status(404).send("File not found!");

  const stat = fs.statSync(filepath);
  const filesize = stat.size;

  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0]);
    const end = parts[1] ? parseInt(parts[1]) : filesize - 1;

    const chunksize = end - start + 1;
    const file = fs.createReadStream(filepath, { start, end });
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${filesize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    file.pipe(res);
  } else {
    console.log("no range");
    const headers = {
      "Content-Length": filesize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, headers);
    fs.createReadStream(filepath).pipe(res);
  }
});

app.listen(8000, () => {
  console.log("Server listening on port num: 8000");
});
