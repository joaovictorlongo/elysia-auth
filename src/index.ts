import { Elysia } from "elysia";
import { authRoutes } from "./routes";

const app = new Elysia({ prefix: '/api' }).use(authRoutes).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
