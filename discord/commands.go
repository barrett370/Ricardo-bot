package discord

import "github.com/bwmarrin/discordgo"

var (
	commands = []*discordgo.ApplicationCommand{
		{
			Name:        "go",
			Description: "returns lang!",
			Type:        discordgo.ChatApplicationCommand,
		},
	}

	commandHandlers = map[string]func(s *discordgo.Session, i *discordgo.InteractionCreate){
		"go": pingHandler,
	}
)

func pingHandler(s *discordgo.Session, i *discordgo.InteractionCreate) {
	s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
		Type: discordgo.InteractionResponseChannelMessageWithSource,
		Data: &discordgo.InteractionResponseData{
			Content: "lang!",
		},
	})
}

func messageCreate(s *discordgo.Session, m *discordgo.Message) {
	if m.Author.ID == s.State.User.ID {
		return
	}

}
