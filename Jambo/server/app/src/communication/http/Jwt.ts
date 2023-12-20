import jwt from "@elysiajs/jwt";

export class Jwt {
  public static jwt() {
    return jwt({
      name: "jwt",
      secret: Bun.env.JWT_SECRET as string,
    });
  }
}
