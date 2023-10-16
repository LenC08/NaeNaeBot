const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed, EmbedBuilder} = require('discord.js');
const jsonData = require("../bestelling.json")


function getEmbed() {
  const embed = new EmbedBuilder()
    .setColor('#ff75f1')
    .setTitle(jsonData.Dag)

  if (jsonData.bestelling.length === 0) {
    embed.addFields({
      name: "Er zijn nog geen bestellingen toegevoegd",
      value: "Gebruik `/addbestelling` om er toe te voegen!"
    })
  } else {
    let lijst = ""
    for (let i = 0; i < Object.keys(jsonData.bestelling).length; i++) {
      lijst = lijst + "**" + jsonData.bestelling[i].name + "** \xa0\xa0\ ◆ \xa0\xa0\ " + jsonData.bestelling[i].value + "\n"
    }
    embed.addFields({name: "\u200B", value: lijst})
  }

  let randomNr = Math.floor(Math.random() * 3)

  if (randomNr === 1) {
    embed.setImage("https://i.imgur.com/LBIu0XQ.jpeg")
  } else if (randomNr === 2) {
    embed.setImage("https://i.imgur.com/W5Oyxid.jpeg")
  } else embed.setImage("https://i.imgur.com/bItAkbW.png")
  console.log(randomNr)
  return embed;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bestelling')
    .setDescription('bekijk bestelling'),
  async execute(interaction) {
    if (jsonData.Dag === "" || jsonData.bestelling === []) {
      interaction.reply("Maak eerst een bestelling aan met `/createbestelling` en voeg broodjes toe!")
    } else interaction.reply({embeds: [getEmbed()]})
  }
}
