const fs = require('fs');
const {Client, Collection, Intents} = require('discord.js');
const jsonData = require("./bestelling.json")

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

//727

setInterval(async function() {
    const now = new Date()
    let timeUntil = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 49, 0, 0).getTime() - now.getTime();
    if (timeUntil < 0 && timeUntil > -60000) {
        const user =  await client.users.fetch("251084760825331713")
        user.send("wysi")
        client.channels.cache.get("881492781611229238").send("test")
    }
}, 60000)

const activities = [
    "el senior de la nocheeeee", 
	"el terror de la nocheeeee",
    "busssssssssssssssssssssssssssssssssssssssssssssssss"
];

client.on("ready", () => {
    // run every 10 seconds
    setInterval(() => {
        // generate random number between 1 and list length.
        const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
        const newActivity = activities[randomIndex - 1];

        client.user.setActivity(newActivity);
    }, 10000);
});

client.login("OTY5NjQ4NjUxNjk1NjkzODQ1.GSw21o.93bfbs_ajQUkLPc08a_hIl7Zi_PVXaQONgaIpM");
