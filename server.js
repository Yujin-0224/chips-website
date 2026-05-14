const fs = require("node:fs");
const http = require("node:http");
const https = require("node:https");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 8000);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".wav": "audio/wav",
  ".webp": "image/webp",
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, {
    "Cache-Control": "no-store",
    ...headers,
  });
  res.end(body);
}

function getDriveAudioUrl(fileId) {
  return new URL(`https://drive.usercontent.google.com/download?id=${encodeURIComponent(fileId)}&export=download`);
}

function proxyDriveAudio(req, res, fileId) {
  const upstreamUrl = getDriveAudioUrl(fileId);
  const headers = {};
  if (req.headers.range) headers.Range = req.headers.range;

  const upstreamReq = https.request(upstreamUrl, { method: req.method, headers }, (upstreamRes) => {
    const responseHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Accept-Ranges": upstreamRes.headers["accept-ranges"] || "bytes",
      "Cache-Control": "public, max-age=300",
      "Content-Type": upstreamRes.headers["content-type"] || "audio/wav",
    };

    for (const header of ["content-length", "content-range", "last-modified", "etag"]) {
      if (upstreamRes.headers[header]) responseHeaders[header] = upstreamRes.headers[header];
    }

    if (responseHeaders["Content-Type"] === "application/octet-stream") {
      responseHeaders["Content-Type"] = "audio/wav";
    }

    res.writeHead(upstreamRes.statusCode || 200, responseHeaders);
    if (req.method === "HEAD") {
      upstreamRes.resume();
      res.end();
      return;
    }
    upstreamRes.pipe(res);
  });

  upstreamReq.on("error", () => {
    send(res, 502, "Could not load Google Drive audio.", { "Content-Type": "text/plain; charset=utf-8" });
  });

  upstreamReq.end();
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";

  const filePath = path.resolve(root, `.${pathname}`);
  if (!filePath.startsWith(root)) {
    send(res, 403, "Forbidden", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  fs.stat(filePath, (statError, stat) => {
    if (statError || !stat.isFile()) {
      send(res, 404, "Not found", { "Content-Type": "text/plain; charset=utf-8" });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Length": stat.size,
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
    });

    if (req.method === "HEAD") {
      res.end();
      return;
    }

    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    send(res, 204, "", {
      "Access-Control-Allow-Headers": "Range, Content-Type",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Origin": "*",
    });
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const audioMatch = url.pathname.match(/^\/api\/drive-audio\/([^/]+)$/);
  if (audioMatch) {
    proxyDriveAudio(req, res, audioMatch[1]);
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    send(res, 405, "Method not allowed", { "Content-Type": "text/plain; charset=utf-8" });
    return;
  }

  serveStatic(req, res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`CHIPS site running at http://127.0.0.1:${port}`);
});
