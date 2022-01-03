const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ewa')
		.setDescription('het leven is niet eerlijk nee :pensive:'),
	async execute(interaction) {
		return interaction.reply('ja');
	},
};