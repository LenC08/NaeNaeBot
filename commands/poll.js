const { SlashCommandBuilder, SlashCommandUserOption } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('uwu'),
	async execute(interaction) {
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('uwu')
					.setStyle('LINK')
                    .setURL('https://pornhub.com')
					.setEmoji("769535791772729346"),
			);

		await interaction.reply({ content: 'test!', components: [row] });
		
      
    }

}