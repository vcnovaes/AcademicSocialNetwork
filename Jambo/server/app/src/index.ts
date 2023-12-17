import { Elysia } from "elysia"
import { UserPresenter } from "./presenters/UserPresenter"
import mongoose from 'mongoose'

// mongoose.connect( "mongodb://127.0.0.1:27017/jambo" )

const app = new Elysia()
  .get( "/", () => "Hello Elysia" )
  .use( UserPresenter )
  .listen( 3000 )

console.log(
  `🦊 Elysia is running at ${ app.server?.hostname }:${ app.server?.port }`
)
