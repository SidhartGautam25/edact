/** @jsx createElement */

import http from "node:http";

import { createElement } from "../../src/edact.js";
import { renderToString } from "../../src/renderer/string.js";

import App from "./app.jsx";

function renderDocument(content) {
  return `
<!DOCTYPE html>
<html>

<head>
    <title>Edact SSR</title>
</head>

<body>

<div id="app">

${content}

</div>

</body>

</html>
`;
}

const server = http.createServer((req, res) => {
  const html = renderDocument(renderToString(<App />));

  res.setHeader("Content-Type", "text/html");

  res.end(html);
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
