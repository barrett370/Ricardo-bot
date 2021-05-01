type msg = {
  content: string,
  reply: (. string) => unit,
}
type event =
  | Ready
  | Message
type user = {tag: string}
type client = {
  login: (. string) => unit,
  user: user,
}

@send
external on: (
  client,
  @string
  [
    | #ready(unit => unit)
    | #message(msg => unit)
  ],
) => unit = "on"

let token = ""
@new @module("discord.js") external createClient: unit => client = "Client"

let c = createClient()
c->on(
  #ready(
    () => {
      Js.log("Logged in as " ++ c.user.tag)
    },
  ),
)

c->on(
  #message(
    msg => {
      if msg.content == "ping" {
        msg.reply(. "pong")
      }
    },
  ),
)

c.login(. token)
