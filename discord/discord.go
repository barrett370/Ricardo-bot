package discord

import (
	"log"

	"github.com/barrett370/Ricardo-bot/config"
	"github.com/bwmarrin/discordgo"
)

type Bot struct {
	session *discordgo.Session
}

func NewBot(s *discordgo.Session) *Bot {
	return &Bot{
		session: s,
	}
}

func Init() error {
	discord, err := discordgo.New("Bot " + config.Discord.BotToken)
	if err != nil {
		panic(err)
	}
	ricardo := NewBot(discord)
	ricardo.session.AddHandler(func(s *discordgo.Session, i *discordgo.InteractionCreate) {
		if handler, ok := commandHandlers[i.ApplicationCommandData().Name]; ok {
			handler(s, i)
		}
	})

	ricardo.session.AddHandler(func(s *discordgo.Session, r *discordgo.Ready) {
		log.Printf("Logged in as %v#%v", s.State.User.Username, s.State.User.Discriminator)
	})

	err = ricardo.session.Open()
	if err != nil {
		return err
	}
	defer ricardo.session.Close()

	log.Println("adding commands...")
	registeredCommands := make([]*discordgo.ApplicationCommand, len(commands))
	for i, v := range commands {
		cmd, err := ricardo.session.ApplicationCommandCreate(ricardo.session.State.User.ID, config.Discord.GuildID, v)
		if err != nil {
			return err
		}
		registeredCommands[i] = cmd
	}

	return nil

}
