import HttpClient from "./HttpClient";
import Jambo from "./JamboAPI";

export class AuthClient {
  public static authenticate(request: IAuthRequest): Promise<IAuthReponse> {
    return new HttpClient<IAuthReponse>().post(
      Jambo.ServiceURL("auth", "pub", "authenticate"),
      request
    );
  }
}

export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IAuthReponse {
  JamboAuthCookie: string;
  user_id: string;
}
