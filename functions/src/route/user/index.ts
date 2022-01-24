import Router from "koa-router";
import { getUser, getUsers, signIn, signUp } from "./user";

const route = new Router();

route.get("/", getUsers);
route.post("/signIn", signIn);
route.post("/signUp", signUp);
route.get("/:id", getUser);

export default route;
