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
var countY = 0;
var countN = 0;

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
    function voteResult()
    {
    if(countY > countN)
    {
       message.react('✅'); //pass
       message.channel.send('Users voted for Leon!')
    }
    else if(countY < countN)
    {
       message.react('❌'); //pass
       message.channel.send('Users voted against Leon!')
    }
    else
    {
      message.channel.send('Equal amount of YES and NO');
    }
    }
    
		message.channel.send(`${message.author.username} thinks ikaros should get his role back!`);
    message.react('👍')
    .then(() => message.react('👎')); 
    
    
    //collector things
    const filterY = (reaction, user) => {
      return reaction.emoji.name === '👍' && user.id === message.author.id;
    };
    const filterN = (reaction, user) => {
      return reaction.emoji.name === '👎' && user.id === message.author.id;
    };

    const collectorY = message.createReactionCollector(filterY, { time: 15000 });
    const collectorN = message.createReactionCollector(filterN, { time: 15000 });

    collectorY.on('collect', (reaction, reactionCollector) => {
      console.log(`Collected ${reaction.emoji.name}`);
    });

    collectorY.on('end', collected => {
      countY = `${collected.size}`; 
    });
    collectorN.on('collect', (reaction, reactionCollector) => {
      console.log(`Collected ${reaction.emoji.name}`);
    });

    collectorN.on('end', collected => {
      countN = `${collected.size}`; 
      voteResult(); //needed only once
	  });
    //reset results
    countY = 0;
    countN = 0;
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