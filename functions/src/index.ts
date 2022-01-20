import * as functions from "firebase-functions";
import Koa from "koa";
import Router from "koa-router";
import route from "./route";

const app = new Koa();
const router = new Router();

router.use(route.routes());

app.use(router.routes()).use(router.allowedMethods());

export const api = functions
  .region("asia-northeast3")
  .https.onRequest(app.callback());
