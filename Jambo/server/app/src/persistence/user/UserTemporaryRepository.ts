import { ICacheManagerClient } from "../../communication/infrastructure/cache/CacheManagerClient";
import { IUser } from "../../entities/IUser";
import { IUserTemporaryRepository } from "./IUserTemporaryRepository";
import { IPendingUser } from "../../entities/IPendingUser";

export class UserTemporaryRepository implements IUserTemporaryRepository {
  private cacheManager: ICacheManagerClient;
  private ttl: number;

  constructor(client: ICacheManagerClient | undefined) {
    if (client === undefined) {
      throw Error("Client is undefined");
    }
    this.ttl = Number(Bun.env.USER_TEMPORARY_TTL_IN_SECONDS as string);
    this.cacheManager = client;
  }

  async add(user: IUser): Promise<void> {
    await this.cacheManager.put(user.email, JSON.stringify(user), this.ttl);
  }

  async get(key: string): Promise<IPendingUser | null> {
    const obj = await this.cacheManager.get(key);
    if (!obj || obj.length === 0) return null;
    const user = JSON.parse(obj) as IPendingUser;
    return user;
  }
}
