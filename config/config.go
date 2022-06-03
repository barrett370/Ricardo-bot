package config

import (
	"log"
	"os"
)

type DiscordConfig struct {
	GuildID  string
	BotToken string
}

var (
	Discord *DiscordConfig
)

func Load() {
	Discord = &DiscordConfig{
		GuildID:  os.Getenv("CLIENT_ID"),
		BotToken: os.Getenv("TOKEN"),
	}

	if Discord.GuildID == "" || Discord.BotToken == "" {
		log.Fatalf("invalid discord config, %v", *Discord)
	}
}
