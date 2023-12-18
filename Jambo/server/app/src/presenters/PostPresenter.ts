import Elysia from "elysia"

export const PostPresenter = new Elysia().group( "post", ( app ) =>
  app
    .get( "/test", () =>
    {

      return { " olá ": "hey " }
    } )
    .put( "//", () => { } )

)