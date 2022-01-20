const { SlashCommandBuilder } = require('@discordjs/builders')
const ytdl = require('ytdl-core');
const {
	AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} = require('@discordjs/voice');
const yts = require('yt-search');




module.exports = {    
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("play music")
        .addStringOption(option => option.setName("audio-name").setDescription("link").setRequired(true)),
    queue : [],
    VoiceConnection : "",
    async execute(interaction) {
    
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id ,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        module.exports.VoiceConnection = connection
        
console.log(module.exports.queue, "1")
        if (module.exports.queue[0] == undefined) {
             let song
             console.log("new song")
         if (ytdl.validateURL(interaction.options.getString("audio-name"))) {
            song = {
                url : interaction.options.getString("audio-name"),
                member : interaction.user.tag
            }
        } else {
            const { videos } = await yts(interaction.options.getString("audio-name")) 
            if (!videos.length) return interaction.reply("No songs were found!");
            song = {
              title: videos[0].title,
              url: videos[0].url,
              member: interaction.user.tag
            }                    
        }
        module.exports.queue.push(song) 
        playAudio()
        interaction.reply("Now playing **" + song.url +"**!")
        } else {
            let song
            if (ytdl.validateURL(interaction.options.getString("audio-name"))) {
               song = {
                   url : interaction.options.getString("audio-name"),
                   member : interaction.user.tag
               }
           } else {
               const { videos } = await yts(interaction.options.getString("audio-name")) 
               if (!videos.length) return interaction.reply("No songs were found!");
               song = {
                 title: videos[0].title,
                 url: videos[0].url,
                 member: interaction.user.tag
               }
               module.exports.queue.push(song)
           }
           interaction.reply("** " + module.exports.queue[module.exports.queue.length - 1].url + "** added to the queue!")
        }

        function playAudio() { 
            const stream = ytdl(module.exports.queue[0].url, { filter: 'audioonly' });
            const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
            const player = createAudioPlayer(); 
            player.play(resource);
            connection.subscribe(player);                
            
            player.on(AudioPlayerStatus.Idle, () => {
            if (module.exports.queue.length === 1) {
                module.exports.queue.shift()
                connection.destroy()               
            } else {
                module.exports.queue.shift()
                console.log(module.exports.queue) 
                playAudio()                
            }            
        }
    )
        }           
    }
}