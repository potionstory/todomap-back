import { Context } from "koa";
import Router from "koa-router";
import { db } from "../../service/admin";
import { User } from "./type";

const router = new Router();

export const getUsers = router.get("/", async (ctx: Context) => {
  if (ctx.method !== "GET") ctx.status = 400;

  try {
    await db
      .collection("users")
      .get()
      .then((data) => {
        const users: User[] = [];

        data.forEach((doc) => {
          users.push({
            name: doc.data().name,
            age: doc.data().age,
          });
        });

        ctx.status = 200;
        ctx.body = users;
      });
  } catch (err) {
    ctx.body = err;
  }
});
