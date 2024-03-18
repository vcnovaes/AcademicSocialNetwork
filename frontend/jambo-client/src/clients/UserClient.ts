import HttpClient from "./HttpClient";
import Jambo from "./JamboAPI";

export class UserClient {
  public static signup(request: IUserRequest): Promise<IUserRequest> {
    return new HttpClient<IUserRequest>().post(
      Jambo.ServiceURL("users", "pub", "create"),
      request
    );
  }
  public static update(request: IUserRequest, userId: string, jwt: string) {
    return new HttpClient<IUserRequest>().put(
      Jambo.ServiceURL("users", "pvt", userId),
      request,
      Jambo.authHeader(jwt)
    );
  }
  public static get(userId: string, jwt: string) {
    return new HttpClient<IUserRequest>().get(
      Jambo.ServiceURL("users", "pvt", userId),
      Jambo.authHeader(jwt)
    );
  }
}

export interface IUserRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
