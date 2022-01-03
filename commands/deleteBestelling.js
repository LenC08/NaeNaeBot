const { SlashCommandBuilder } = require('@discordjs/builders');
const jsonData = require("../bestelling.json")
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deletebestelling')
		.setDescription('verwijder de huidige bestelling'),
	async execute(interaction) {
        
        const finished = (error) => {
            if (error) {
                console.error(error)
                return
            }
        }
        
        
		jsonData.Dag = "";
        jsonData.bestelling = [];
        Data = JSON.stringify(jsonData, null, 2)
        fs.writeFile("./bestelling.json", Data, finished)

        interaction.reply("Bestelling verwijderd! Gebruik `/createbestelling` om een nieuwe te maken")
	},
};