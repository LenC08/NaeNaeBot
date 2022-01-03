const { SlashCommandBuilder, SlashCommandUserOption } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription(':uwu:.')
		.addUserOption(option => option.setName('stouterik').setDescription('The member to kick')),
	async execute(interaction) {
        if (interaction.user.id != "260764377127452673") {
            interaction.reply("**jij mag dit niet! :imp:**");
        } 
        else if (interaction.user.id = "260764377127452673") {
        let member = interaction.options.getMember('stouterik');
        member.kick();
        let memberName = member.user.username;
        interaction.reply("** :crab: " + memberName + " is gone :crab:**");
        }
      
    }

}