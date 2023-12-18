import { Elysia } from "elysia"
import { UserPresenter } from "./presenters/UserPresenter"
import cors from "@elysiajs/cors"

const app = new Elysia()
  .use( cors() )
  .get( "/", () => "Hello Elysia" )
  .use( UserPresenter )
  .listen( 3000 )

console.log(
  `🦊 Elysia is running at ${ app.server?.hostname }:${ app.server?.port }`
)
