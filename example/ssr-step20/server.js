import { createServer } from "../../src/edserver.js";
await createServer({
  root: "./ssr-step20/app",
  port: 3000,
});
