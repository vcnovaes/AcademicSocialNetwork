import HttpClient from "./HttpClient";
import Jambo from "./JamboAPI";

export class PostsClient {
  public static create(
    request: IPostRequest,
    jwt: string
  ): Promise<IPostRequest> {
    return new HttpClient<IPostRequest>().post(
      Jambo.ServiceURL("posts", "pvt", "new-post"),
      request,
      Jambo.authHeader(jwt)
    );
  }
  public static update(request: IPostRequest, jwt: string) {
    return new HttpClient<IPostRequest>().put(
      Jambo.ServiceURL("posts", "pvt", "update-post"),
      request,
      Jambo.authHeader(jwt)
    );
  }
  public static get(userId: string, jwt: string) {
    return new HttpClient<IPostRequest[]>().get(
      Jambo.ServiceURL("posts", "pvt", `profile/${userId}`),
      Jambo.authHeader(jwt)
    );
  }
  public static delete(postId: string, jwt: string) {
    return new HttpClient<IPostRequest>().delete(
      Jambo.ServiceURL("posts", "pvt", `delete/${postId}`),
      Jambo.authHeader(jwt)
    );
  }
}

export interface IPostRequest {
  owner: string;
  text: string;
  id?: string;
}
