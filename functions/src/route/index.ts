import Router from "koa-router";
import user from "./user";

const route = new Router();

// route > user
route.use("/user", user.routes());

export default route;
