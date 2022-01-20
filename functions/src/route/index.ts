import Router from "koa-router";
import { getUsers } from "./user";

const route = new Router();

route.use("/user", getUsers.routes());

export default route;
