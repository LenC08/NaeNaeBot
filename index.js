const fs = require('fs');
const {Client, GatewayIntentBits, Collection} = require('discord.js');
const jsonData = require("./bestelling.json")
const path = require("path");

require('dotenv').config()

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers]});
module.exports = {client};

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}


client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
  }
});


//Button eventlistener
client.on('interactionCreate', async interaction => {

  if (!interaction.isButton()) return;

  if (interaction.customId === "Maandag" || interaction.customId === "Dinsdag" || interaction.customId === "Donderdag" || interaction.customId === "Vrijdag") {

    //broodjesfunctie

    if (jsonData.Dag !== "") {
      interaction.reply("Er is al een bestelling actief! Gebruik `/deletebestelling` om deze te verwijderen")
    } else {
      const finished = (error) => {
        if (error) {
          console.error(error)

        }
      }

      jsonData.Dag = interaction.customId
      const Data = JSON.stringify(jsonData, null, 2)
      fs.writeFile("./bestelling.json", Data, finished)

      await interaction.reply("Bestelling voor **" + interaction.customId + "** gemaakt, gebruik `/addbroodje` om een broodje toe te voegen!")
    }
    //Voting functie
  } else {
    interaction.reply(interaction.customId)
  }


});


const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

setInterval(async function () {
  let now = new Date()
  let timeUntilEvening = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 27, 0, 0).getTime() - now.getTime();
  let timeUntilMorning = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 5, 27, 0, 0).getTime() - now.getTime();
  let timeUntil = (timeUntilEvening < timeUntilMorning) ? timeUntilEvening : timeUntilMorning

  if (timeUntil < 0 && timeUntil > -60000) {
    const user = await client.users.fetch("251084760825331713")
    await user.send("wysi https://tenor.com/view/aireu-wysi-osu-727-cookiezi-gif-20763403")
    await client.channels.cache.get("1122975932890755215").send("wysi https://tenor.com/view/aireu-wysi-osu-727-cookiezi-gif-20763403")
  }

  if (now.getHours() === 8 && now.getMinutes() === 0) {
    await client.channels.cache.get("968192015378567249").send("Goedemorgen! Het is tijd om je broodjes te bestellen! Gebruik `/addbroodje` om te beginnen!")
    await client.channels.cache.get("968192015378567249").send("https://tenor.com/view/good-morning-sigma-gm-sigma-wolf-pack-rise-and-grind-alpha-male-gif-18436891353706736629")
  }

}, 60_000)

const activities = [
  "el senior de la nocheeeee",
  "el terror de la nocheeeee",
  "busssssssssssssssssssssssssssssssssssssssssssssssss"
];

client.on("ready", () => {
  // run every 10 seconds
  setInterval(() => {
    // generate random number between 1 and list length.
    const randomIndex = Math.floor(Math.random() * (activities.length));
    const newActivity = activities[randomIndex];

    client.user.setActivity(newActivity);
  }, 10000);
});

client.login(process.env.TOKEN).then(r => console.log("Logged in!"));
