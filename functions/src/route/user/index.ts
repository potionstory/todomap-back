import Router from "koa-router";
import { getUsers, signIn, signUp } from "./user";

const route = new Router();

route.get("/", getUsers);
route.post("/signIn", signIn);
route.post("/signUp", signUp);

export default route;
