import { DefaultContext } from "koa";
import { db } from "../../service";

// TODO: [PUT] update
export const update = async (ctx: DefaultContext): Promise<void> => {
  if (ctx.method !== "POST") ctx.status = 400;

  try {
    const { uid } = ctx.state;
    const { todo } = ctx.req.body;

    await db
      .collection("todos")
      .doc(uid)
      .set(
        {
          todo,
        },
        { merge: true }
      )
      .then(() => {
        ctx.status = 200;
        ctx.body = todo;
      });
  } catch (err) {
    ctx.body = err;
  }
};
