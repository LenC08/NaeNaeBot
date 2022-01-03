const { SlashCommandBuilder } = require('@discordjs/builders');
const jsonData = require("../bestelling.json")
const fs = require('fs');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('verwijderbroodje')
		.setDescription('verwijder je broodjes van de bestelling')
        .addStringOption(option => option.setName('van').setDescription('Wat is de naam van de persoon voor wie het broodje geregistreerd is? (optioneel)').setRequired(false)),
	async execute(interaction) {
    console.log(jsonData.bestelling)
   
        function getName() {
        if (!interaction.options.getString('van')) {
             return interaction.user.tag
        } else return interaction.options.getString('van')
    }
      
        function deleteBroodjes(arr, name) {
          return arr.filter(e => e.name !== name)
        }

        const finished = (error) => {
          if (error) {
              console.error(error)
              return
          }
      } 
        jsonData.bestelling = deleteBroodjes(jsonData.bestelling, getName())
        let newJsonData = JSON.stringify(jsonData, null, 2)
        fs.writeFile("./bestelling.json", newJsonData, finished)
        interaction.reply("Alle broodjes voor **" + getName() + "** verwijderd!")
        
	}
}