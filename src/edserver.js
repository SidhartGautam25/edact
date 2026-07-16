import http from "node:http";

import { createElement } from "../edact/edact.js";
import { renderToString } from "../edact/renderer/string.js";

function renderDocument(content) {
  return `
<!DOCTYPE html>
<html>

<head>
  <title>Edact</title>
</head>

<body>

<div id="app">
${content}
</div>

</body>

</html>
`;
}

async function loadPage(root) {
  const module = await import(`${root}/page.js`);

  return module.default;
}

async function createServer({ root = "./app", port = 3000 } = {}) {
  const App = await loadPage(root);

  const server = http.createServer((req, res) => {
    const html = renderDocument(renderToString(createElement(App)));

    res.setHeader("Content-Type", "text/html");

    res.end(html);
  });

  server.listen(port, () => {
    console.log(`EdServer running on http://localhost:${port}`);
  });
}

export { createServer };
