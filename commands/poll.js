const { SlashCommandBuilder, SlashCommandUserOption } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, GuildMember } = require('discord.js');
let memberArray = require("../members.json")
let serverUsers = []
let rowArray = []
let groep0 = []
let groep1 =[]
let groep2 =[]
let groep3 =[]
let groep4 =[]

function fetchMembers() {
	for (i=0 ; i < memberArray.length; i++) {
		serverUsers.push(memberArray[i].displayName)
	}
}

function sorteerMembers() {
	let j = 0
	let g = "groep"
	for (i=0; i < serverUsers.length; i++) {		
		if (eval(g + j + ".length === 5")) {
			eval("rowArray.push(new MessageActionRow().addComponents(" + g + j + "))")
			j++
		} else if (i === serverUsers.length - 1 ) {
			eval("rowArray.push(new MessageActionRow().addComponents(" + g + j + "))")
		} else {
		    eval(g + j + ".push(new MessageButton().setLabel('" + serverUsers[i] + "').setStyle('SUCCESS').setCustomId('" + serverUsers[i] + "'))")
		}	   
	}
}

function createButtons() {
		if (serverUsers.length > 25) {
			interaction.reply("te veel members")
		} else  {
			sorteerMembers()
		} 
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('uwu'),
	async execute(interaction) {
		fetchMembers()
		createButtons()
		interaction.reply({ content: '**Stemmen maar!!! :yum:**', components: rowArray })
		
    }

}