import { Application } from "https://deno.land/x/oak/mod.ts";
import  router  from "./router.ts"

 const app = new Application();
 app.use(router.routes());
 app.use(router.allowedMethods());

// app.listen({port: 8000});
// console.log("Server is up and running");

import { serve } from "https://deno.land/std@0.89.0/http/server.ts";
import * as flags from "https://deno.land/std@0.89.0/flags/mod.ts";

const DEFAULT_PORT = 8080;
const argPort = flags.parse(Deno.args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

if (isNaN(port)) {
  console.error("Port is not a number.");
  Deno.exit(1);
}

const s = serve({ port: port });
console.log("http://localhost:" + port);

for await (const req of s) {
  req.respond({ body: "Hello World\n" });
}