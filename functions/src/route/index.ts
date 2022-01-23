import Router from "koa-router";
import { getUsers, signUp } from "./user";

const route = new Router();

route.use("/user", getUsers.routes());
route.use("/signup", signUp.routes());

export default route;
