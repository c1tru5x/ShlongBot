// server.js
// where your node app starts

// init project
const express = require("express");
const fs = require("fs");
const discordBotkit = require("botkit-discord");
var Client = require("uptime-robot");

const app = express();

const discordBot = require("./bot");

// this is the code for the guides
app.use(require('./guides'));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

//Actual Botcode
//Required init
const Discord = require('discord.js');
const client = new Discord.Client();
//Start of actual code
const call = '!shlong '
var status = ['hard','rotten','soft']
//container for commands
var commands = ['avocado','freeleon','drink','choice']
var choice = ['yes','no']

//Feedback if no errors
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === call + 'help') 
	{
		message.channel.send('Available Commands: (!shlong [command])\n'); 
		for (let i = 0; i < commands.length; i++) 
		{
			message.channel.send(commands[i] + '\n');
		}
	}
	if (message.content === call + 'avocado') 
	{
		message.channel.send('Avocado is ' + status[Math.floor(Math.random()*status.length)] + "!");
	}
	if (message.content === call + 'freeleon') 
	{
		message.channel.send(`${message.author.username} thinks ikaros should get his role back!`);
    message.react('👍')
    .then(() => message.react('👎')); 
    
    const filter = (reaction, user) => {
	  return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    message.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '👍') {
			message.reply('you reacted with a thumbs up.');
		} else {
			message.reply('you reacted with a thumbs down.');
		}
	})
	.catch(collected => {
		message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
	});
	}
  if (message.content === call + 'drink')
	{
		message.channel.send("Goaßmass saffa! :beers:"); //beer emojy
	}
  if (message.content === call + 'choice')
	{
		message.channel.send(choice[Math.floor(Math.random()*choice.length)]); 
	}
});

client.login(process.env.DISCORD_TOKEN);
