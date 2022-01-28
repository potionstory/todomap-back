import Router from "koa-router";
import auth from "../auth";
import { update } from "./todo";

const route = new Router();

route.put("/update", auth, update);

export default route;
