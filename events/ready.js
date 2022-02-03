let memberArray = []
const fs = require('fs');

const finished = (error) => {
	if (error) {
		console.error(error)
		return
	}
}

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		const Guilds = client.guilds.cache.map((guild) => guild);
        await Guilds[0].members.fetch().then(fetchedMembers => {
			const realMembers = fetchedMembers.filter(member => member.user.bot === false)
			const members = JSON.stringify(realMembers, null, 2)
			fs.writeFile("./members.json", members, finished)
		}).catch(console.error);
		
		
	},
};