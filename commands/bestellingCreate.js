const {SlashCommandBuilder} = require('@discordjs/builders');
let {ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');


let Maandag = new ButtonBuilder()
  .setLabel('Maandag')
  .setStyle(ButtonStyle.Primary)
  .setCustomId('Maandag');
let Dinsdag = new ButtonBuilder()
  .setLabel('Dinsdag')
  .setStyle(ButtonStyle.Primary)
  .setCustomId('Dinsdag');
let Donderdag = new ButtonBuilder()
  .setLabel('Donderdag')
  .setStyle(ButtonStyle.Primary)
  .setCustomId('Donderdag');
let Vrijdag = new ButtonBuilder()
  .setLabel('Vrijdag')
  .setStyle(ButtonStyle.Primary)
  .setCustomId('Vrijdag');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createbestelling')
    .setDescription('start een nieuwe bestelling'),
  async execute(interaction) {

    const row = new ActionRowBuilder()
      .addComponents(Maandag, Dinsdag, Donderdag, Vrijdag);

    await interaction.reply({content: '**Kies een dag**', components: [row]});

  }


};





