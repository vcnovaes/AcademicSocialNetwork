import Elysia, { InternalServerError, NotFoundError } from "elysia";
import { IUser } from "../entities/IUser";
import { HttpStatusCode } from "../communication/http/HTTPStatusCode";
import { Jambo } from "..";
import cookie from "@elysiajs/cookie";
import { Jwt } from "../communication/http/Jwt";
import { Auth } from "../security/Auth";

export const UserPresenter = new Elysia().group("user", (app) =>
  app
    .post("/register", async ({ body, set }) => {
      try {
        const userData = body as IUser;
        if (!Jambo.validateUserData(userData)) {
          set.status = HttpStatusCode.BAD_REQUEST;
          return {
            error: "Bad Request: Invalid user data",
          };
        }
        await Jambo.registerTemporary(userData);
        set.status = 200;
        return;
      } catch (error) {
        console.error("Error registering user:", error);
        set.status = HttpStatusCode.INTERNAL_SERVER_ERROR;
        return {
          error: "Internal Server Error",
        };
      }
    })
    .post("/confirm", async ({ body, set }) => {
      const { email, confirmationCode } = body as any;
      if (!email || !confirmationCode) {
        set.status = 400;
        return;
      }
      const usr = await Jambo.confirmRegistration(email, confirmationCode);
      if (usr == undefined) {
        set.status = 400;
        return;
      }
      set.status = 200;
      return usr;
    })

    .use(Jwt.jwt())
    .use(cookie())

    .post("/login", async ({ jwt, cookie, setCookie, body, set }) => {
      const auth = await Auth.startSession(body, setCookie, jwt, cookie);
      if (auth) {
        set.status = 200;
        return cookie.auth;
      }
      set.status = HttpStatusCode.BAD_REQUEST;
    })

    .get("/test", async ({ jwt, set, cookie: { auth } }) => {
      const profile = await jwt.verify(auth);

      if (!profile) {
        set.status = 401;
        return "Unauthorized";
      }

      return `Hello ${JSON.stringify(profile.email)}`;
    })
    .put("/", async ({ jwt, set, cookie: { auth }, body }) => {
      const { email } = (await jwt.verify(auth)) as any;

      if (!email) {
        set.status = HttpStatusCode.UNAUTHORIZED;
        return "Unauthorized";
      }
      if (!Jambo.validateUserData(body as any)) {
        set.status = HttpStatusCode.BAD_REQUEST;
        return "Bad Request";
      }
      try {
        await Jambo.updateUserData(email, body as IUser);
      } catch (err) {
        console.error("Error updating user: ", email);
        console.error(err);
        throw new InternalServerError();
      }
    })

    .delete("/", async ({ jwt, set, cookie: { auth } }) => {
      const email = await Auth.verifySession(auth, jwt);
      if (!email) {
        set.status = HttpStatusCode.FORBIDDEN;
        return;
      }
      try {
        await Jambo.deleteUser(email as string);
      } catch (err) {
        console.error("Error updating user: ", email);
        console.error(err);
        throw new InternalServerError();
      }
    })

    .get("/", async ({ jwt, cookie: { auth } }) => {
      const email = await Auth.verifySession(auth, jwt);
      const userData = await Jambo.getUser(email);
      if (!userData) {
        throw new NotFoundError();
      }
      return userData;
    })
);
