import http from "node:http";
import { createElement } from "../edact/edact.js";
import { renderToString } from "../edact/renderer/string.js";

function renderDocument(content) {
  return `
<!DOCTYPE html>
<html>
<head>
  <title>EdServer</title>
</head>
<body>

<div id="app">
${content}
</div>

</body>
</html>
`;
}

function getPagePath(root, url) {
  if (url === "/") {
    return `${root}/page.js`;
  }

  return `${root}${url}/page.js`;
}

async function loadPage(root, url) {
  const module = await import(getPagePath(root, url));

  return module.default;
}

async function createServer({ root = "./app", port = 3000 } = {}) {
  const server = http.createServer(async (req, res) => {
    const Page = await loadPage(root, req.url);

    const html = renderDocument(renderToString(createElement(Page)));

    res.setHeader("Content-Type", "text/html");

    res.end(html);
  });

  server.listen(port, () => {
    console.log(`EdServer running on http://localhost:${port}`);
  });
}

export { createServer };
