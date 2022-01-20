import Router from "koa-router";
import { getUsers } from "./user";

const routes = new Router();

routes.use("/user", getUsers.routes());

export default routes;
