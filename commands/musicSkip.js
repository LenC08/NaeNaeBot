const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	StreamType,
	createAudioPlayer,
	createAudioResource,
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
let music = require('./musicPlay') 

function playAudio() { 
    const stream = ytdl(music.queue[0].url, { filter: 'audioonly' });
    const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
    const player = createAudioPlayer(); 
    player.play(resource);
    music.VoiceConnection.subscribe(player);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('skip to the next song'),
	async execute(interaction) {
        console.log(music.queue, "skip")
        if (music.queue.length === 1) {
            music.VoiceConnection.destroy()
            interaction.reply("No more songs in the queue!")
        } else {
            music.queue.shift()
            playAudio()
            interaction.reply("Skipped!")
        }
	},
}