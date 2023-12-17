import { Elysia } from "elysia"
import { UserPresenter } from "./presenters/UserPresenter"
import mongoose from 'mongoose'

mongoose.connect( 'mongodb://user:pass@localhost:27017/crud_example' )
const app = new Elysia()
  .get( "/", () => "Hello Elysia" )
  .use( UserPresenter )
  .listen( 3000 )

console.log(
  `🦊 Elysia is running at ${ app.server?.hostname }:${ app.server?.port }`
)
