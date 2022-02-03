const { SlashCommandBuilder } = require('@discordjs/builders');
let { MessageActionRow, MessageButton } = require('discord.js');
const fs = require('fs');



    let Maandag = new MessageButton()
        .setLabel('Maandag')
        .setStyle('PRIMARY')
        .setCustomId('Maandag');
    let Dinsdag = new MessageButton()
        .setLabel('Dinsdag')
        .setStyle('PRIMARY')
        .setCustomId('Dinsdag');
    let Donderdag = new MessageButton()
        .setLabel('Donderdag')
        .setStyle('PRIMARY')
        .setCustomId('Donderdag');
    let Vrijdag = new MessageButton()
        .setLabel('Vrijdag')
        .setStyle('PRIMARY')
        .setCustomId('Vrijdag');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createbestelling')
		.setDescription('start een nieuwe bestelling'),
	    async execute(interaction) {   

            const row = new MessageActionRow()
             .addComponents(Maandag, Dinsdag, Donderdag, Vrijdag);                    
            
            await interaction.reply({ content: '**Kies een dag**', components: [row] });
            
	}
    
            
    
};





    