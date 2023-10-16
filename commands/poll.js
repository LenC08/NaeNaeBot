const {SlashCommandBuilder} = require('@discordjs/builders');
const {ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
let memberArray = require("../members.json")
let serverUsers = []
let rowArray = []

function fetchMembers() {
  for (let i = 0; i < memberArray.length; i++) {
    serverUsers.push(memberArray[i].displayName)
  }
}

function sorteerMembers() {
  for (let i = 0; i < serverUsers.length; i++) {
    if (i % 5 === 0) {
      rowArray.push(new ActionRowBuilder())
    }
    rowArray[rowArray.length - 1].addComponents(
      new ButtonBuilder()
        .setCustomId(serverUsers[i])
        .setLabel(serverUsers[i])
        .setStyle(ButtonStyle.Primary)
    )
  }
}

function createButtons(interaction) {
  if (serverUsers.length > 25) {
    interaction.reply("te veel members")
  } else {
    sorteerMembers()
  }
}


module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('uwu'),
  async execute(interaction) {
    fetchMembers()
    createButtons(interaction)
    interaction.reply({content: '**Stemmen maar!!! :yum:**', components: rowArray})
  }
}
