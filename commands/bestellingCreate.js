const { SlashCommandBuilder } = require('@discordjs/builders');
let { MessageActionRow, MessageButton } = require('discord.js');
const {client} = require("../index.js");
const fs = require('fs');
const jsonData = require("../bestelling.json")


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
        client.on('interactionCreate', async interaction => {
	
            if (!interaction.isButton()) return;
            
            else if (jsonData.Dag !== "") {
                interaction.reply("Er is al een bestelling actief! Gebruik /deletebestelling` om deze te verwijderen")
            }
            
            else {
                const finished = (error) => {
                    if (error) {
                        console.error(error)
                        return
                    }
                }

                jsonData.Dag = interaction.customId
                const Data = JSON.stringify(jsonData, null, 2)
                fs.writeFile("./bestelling.json", Data, finished)
                
                await interaction.reply("Bestelling voor **" + interaction.customId + "** gemaakt, gebruik `/addbroodje` om een broodje toe te voegen!")   
            }
            
});




    