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

function createServer({ App, port = 3000 }) {
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
