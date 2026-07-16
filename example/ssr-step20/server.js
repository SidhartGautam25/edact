import { createServer } from "../../src/edserver.js";
await createServer({
  root: new URL("./app", import.meta.url).href,
  port: 3000,
});
