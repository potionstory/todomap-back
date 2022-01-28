import Router from "koa-router";
import todo from "./todo";
import user from "./user";

const route = new Router();

// route > user
route.use("/user", user.routes());
route.use("/todo", todo.routes());

export default route;
