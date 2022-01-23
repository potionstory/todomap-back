import { createUserWithEmailAndPassword } from "firebase/auth";
import { DefaultContext } from "koa";
import Router from "koa-router";
import { auth, db } from "../../service";
import { User } from "./type";

const router = new Router();

// !: Deprecated API > delete
export const getUsers = router.get("/", async (ctx: DefaultContext) => {
  if (ctx.method !== "GET") ctx.status = 400;

  try {
    await db
      .collection("users")
      .get()
      .then((data) => {
        const users: User[] = [];

        data.forEach((doc) => {
          users.push({
            email: doc.data().email,
            name: doc.data().name,
            password: doc.data().password,
          });
        });

        ctx.status = 200;
        ctx.body = users;
      });
  } catch (err) {
    ctx.body = err;
  }
});

// TODO: [POST] signUp
export const signUp = router.post("/", async (ctx: DefaultContext) => {
  if (ctx.method !== "POST") ctx.status = 400;

  const { email, password, name }: User = ctx.req.body;

  try {
    const userDoc = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!userDoc.empty) {
      ctx.status = 409;
    } else {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async (data) => {
          const token = await data.user.getIdToken();
          const user = {
            email,
            name,
          };

          await db
            .collection("users")
            .add(user)
            .then(() => {
              ctx.status = 200;
              ctx.body = { token };
            });
        }
      );
    }
  } catch (err) {
    ctx.body = err;
  }
});
