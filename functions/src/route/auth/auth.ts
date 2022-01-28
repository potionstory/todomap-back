import { DefaultContext } from "koa";
import { admin, db } from "../../service";
import { User } from "../user/type";

export const auth = async (
  ctx: DefaultContext,
  next: () => Promise<void>
): Promise<void> => {
  const { authorization } = ctx.headers;

  if (!authorization) {
    ctx.throw(401);
  }

  const token = authorization.split("Bearer ")[1];

  try {
    const { uid } = await admin.auth().verifyIdToken(token, true);

    await db
      .doc(`/users/${uid}`)
      .get()
      .then((doc) => {
        const data = doc.data();

        if (!data) {
          ctx.status = 409;
        } else {
          const { email, name } = data;
          const user: User = {
            email,
            name,
          };

          ctx.status = 200;
          ctx.state.uid = uid;
          ctx.body = user;

          next();
        }
      });
  } catch (err) {
    ctx.body = err;
  }
};
