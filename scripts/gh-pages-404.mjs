import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const index = path.join(dist, "index.html");
const notFound = path.join(dist, "404.html");

if (!fs.existsSync(index)) {
  console.error("gh-pages-404: dist/index.html missing; run vite build first.");
  process.exit(1);
}
fs.copyFileSync(index, notFound);
console.log("gh-pages-404: copied dist/index.html -> dist/404.html");
