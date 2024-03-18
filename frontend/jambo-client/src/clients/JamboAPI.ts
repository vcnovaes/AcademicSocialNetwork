export default class Jambo {
  private static jamboApiRoute = "http://0.0.0.0:8000/";
  static ServiceURL = (serviceName: string, type: string, route: string) => {
    return `${Jambo.jamboApiRoute}api/${serviceName}/${type}/${route}`;
  };
  public static authHeader = (jwt: string) => {
    return { JamboAuthCookie: jwt };
  };
}
