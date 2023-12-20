import { Jambo } from "..";
import { HttpStatusCode } from "../communication/http/HTTPStatusCode";

export class Auth {
  static async startSession(
    { email, password }: any,
    setCookie: any,
    jwt: any,
    cookie: any
  ) {
    const user = await Jambo.verifyUserIdentity(email, password);
    if (user) {
      setCookie("auth", await jwt.sign({ email, password }), {
        maxAge: 7200,
      });
      return cookie.auth;
    }
  }

  static async verifySession(auth: any, jwt: any) {
    const { email } = (await jwt.verify(auth)) as any;
    return email;
  }
}
