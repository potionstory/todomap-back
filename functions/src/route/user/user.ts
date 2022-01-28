import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DefaultContext } from "koa";
import { auth, db } from "../../service";
import { User, UserSignIn, UserSignUp } from "./type";

// TODO: [POST] signUp
export const signUp = async (ctx: DefaultContext): Promise<void> => {
  if (ctx.method !== "POST") ctx.status = 400;

  try {
    const { email, password, name }: UserSignUp = ctx.req.body;
    const userDoc = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!userDoc.empty) {
      ctx.status = 409;
    } else {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      const token = await data.user.getIdToken();
      const { uid } = data.user;
      const user = {
        email,
        name,
      };

      await db
        .collection("users")
        .doc(uid)
        .set(user)
        .then(() => {
          ctx.status = 200;
          ctx.body = { token };
        });
    }
  } catch (err) {
    ctx.body = err;
  }
};

// TODO: [POST] signIn
export const signIn = async (ctx: DefaultContext): Promise<void> => {
  if (ctx.method !== "POST") ctx.status = 400;

  try {
    const { email, password }: UserSignIn = ctx.req.body;
    const data = await signInWithEmailAndPassword(auth, email, password);
    const token = await data.user.getIdToken();

    ctx.status = 200;
    ctx.body = { token };
  } catch (err) {
    ctx.body = err;
  }
};

// TODO: [POST] 사용자 정보 가져오기
export const getUser = async (ctx: DefaultContext): Promise<void> => {
  if (ctx.method !== "GET") ctx.status = 400;

  try {
    const { id } = ctx.params;

    await db
      .doc(`/users/${id}`)
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
          ctx.body = user;
        }
      });
  } catch (err) {
    ctx.body = err;
  }
};
