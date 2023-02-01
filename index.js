const fs = require('fs');
const {Client, Collection, Intents} = require('discord.js');
const jsonData = require("./bestelling.json")

require('dotenv').config()

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS]});
module.exports = {client};

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
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
                    return
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

const activities = [
    "uwu",
	"owo",
];

client.on("ready", () => {
    // run every 10 seconds
    setInterval(() => {
        // generate random number between 1 and list length.
        const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
        const newActivity = activities[randomIndex];

        client.user.setActivity(newActivity);
    }, 10000);
});


client.login(process.env.TOKEN);