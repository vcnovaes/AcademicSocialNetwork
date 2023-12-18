import { Elysia } from "elysia"
import { UserPresenter } from "./presenters/UserPresenter"

const app = new Elysia()
  .get( "/", () => "Hello Elysia" )
  .use( UserPresenter )
  .listen( 3000 )

console.log(
  `🦊 Elysia is running at ${ app.server?.hostname }:${ app.server?.port }`
)
