import * as Koa from "koa";
import { Context } from "koa";
import * as Router from "koa-router";

const app = new Koa();
const router = new Router();

router.get("/", (ctx: Context) => {
  ctx.body = "Hello Koa!";
});

router.get("/test", (ctx: Context) => {
  ctx.body = "Test";
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(5001, () => {
  console.log("Listending to port 5001");
});
