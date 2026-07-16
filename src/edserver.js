import http from "node:http";
import { createElement } from "../edact/edact.js";
import { renderToString } from "../edact/renderer/string.js";

const pageCache = new Map();

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

function Default404() {
  return createElement(
    "div",
    {
      style: "font-family:sans-serif;padding:40px",
    },
    createElement("h1", null, "404"),
    createElement("p", null, "Page not found."),
  );
}

function getPagePath(root, pathname) {
  if (pathname === "/") {
    return `${root}/page.js`;
  }

  return `${root}${pathname}/page.js`;
}

async function loadPage(root, pathname) {
  const pagePath = getPagePath(root, pathname);

  if (pageCache.has(pagePath)) {
    return pageCache.get(pagePath);
  }

  try {
    const module = await import(pagePath);

    pageCache.set(pagePath, module.default);

    return module.default;
  } catch {
    return null;
  }
}

async function createServer({ root = "./app", port = 3000 } = {}) {
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");

    const Page = await loadPage(root, url.pathname);

    const Component = Page ?? Default404;

    const html = renderDocument(renderToString(createElement(Component)));

    res.setHeader("Content-Type", "text/html");

    res.end(html);
  });

  server.listen(port, () => {
    console.log(`EdServer running on http://localhost:${port}`);
  });
}

export { createServer };
