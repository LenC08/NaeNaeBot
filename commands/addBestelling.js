const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');
const jsonData = require("../bestelling.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addbroodje')
		.setDescription('voeg een broodje toe aan de bestelling!')
        .addStringOption(option => option.setName('broodje').setDescription('welk broodje?').setRequired(true))
        .addStringOption(option => option.setName('voor').setDescription('Voor wie is het broodje? (optioneel)').setRequired(false)),
	async execute(interaction) {
        
    function naam() {
        if (interaction.options.getString('voor')) {
             return interaction.options.getString('voor')
        } else return interaction.user.tag
    }

        const broodje = interaction.options.getString('broodje');
        
        if (jsonData.Dag ==="") {
            interaction.reply("Er is nog geen bestelling aangemaakt, gebruik `/createbestelling` om er eentje te maken!")
        } else if (!broodje) {
            interaction.reply("Voeg een broodje toe na de command!")
        } else {

            const finished = (error) => {
                if (error) {
                    console.error(error)
                    return
                }
            }            
            jsonData.bestelling.push({name : naam(),
                                      value : broodje})
            Data = JSON.stringify(jsonData, null, 2)
            fs.writeFile("./bestelling.json", Data, finished)
            interaction.reply("Broodje voor **" + naam() + "** succesvol toegevoegd! Gebruik `/bestelling` om de hele bestelling te bekijken!")

        };
	},
};