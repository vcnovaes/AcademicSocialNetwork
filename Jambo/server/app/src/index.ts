import { Elysia } from "elysia";
import { UserPresenter } from "./presenters/UserPresenter";
import cors from "@elysiajs/cors";
import { JamboFacade } from "./bussiness/JamboFacade";
import { UserRegisterControlFactory } from "./bussiness/user/UserRegisterControl";
import { CacheManagerFactory } from "./communication/infrastructure/cache/CacheManagerFactory";
import { UserRepository } from "./persistence/user/UserRespository";
import { UserTemporaryRepository } from "./persistence/user/UserTemporaryRepository";
import { BcryptEncryptionStrategy } from "./utils/encryptation/BcryptEncryptionStrategy";
import cookie from "@elysiajs/cookie";
import { Jwt } from "./communication/http/Jwt";

const userRepository = new UserRepository();
const cacheManager = await CacheManagerFactory.getInstance();
const temporaryRepository = new UserTemporaryRepository(cacheManager);

export const Jambo = new JamboFacade(
  UserRegisterControlFactory.getInstance(
    userRepository,
    temporaryRepository,
    new BcryptEncryptionStrategy()
  )
);
const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .use(UserPresenter)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
