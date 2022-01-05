const { SlashCommandBuilder } = require('@discordjs/builders');
let music = require('./musicPlay') 
const { MessageEmbed } = require('discord.js');

function getEmbed() {
	const embed = new MessageEmbed()
			.setColor('#ff75f1')
			.setThumbnail("https://i.imgur.com/mFYHP7U.jpeg")
		 for(let i = 0; i < music.queue.length; i++) {	
			 
			function getNumber () {
				if (i === 0) {
					return "Now Playing"
				} else return i
			}			
				console.log("test")
				embed.addField("\u200B","**``" + getNumber() + ".``** " + music.queue[i].title + " **|** ``requested by: " + music.queue[i].member + "``")
			}
	 return embed
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('show the current queue'),
	async execute(interaction) {
		console.log(music.queue.length)
		if (music.queue.length === 0) {
			interaction.reply("queue empty")
			return
		}	else interaction.reply({embeds: [getEmbed()]})
	},
};