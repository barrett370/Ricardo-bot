package main

import (
	"log"
	"os"
	"os/signal"

	"github.com/barrett370/Ricardo-bot/config"
	"github.com/barrett370/Ricardo-bot/discord"
)

func main() {
	config.Load()

	err := discord.Init()
	if err != nil {
		panic(err)
	}

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt)
	log.Println("Press Ctrl+C to exit")
	<-stop

}

type foo string

const (
	a foo = "a"
	b     = "b"
)
