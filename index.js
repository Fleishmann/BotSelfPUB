const { Client, MessageEmbed } = require('discord.js');
const config = require("./config.json");
const fs = require("fs");
const chalk = require('chalk');

const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_MEMBERS',
        'GUILD_PRESENCES'
    ]
})

console.log(

    `
  CARREGANDO...

      By D1V1V3 PUN1SHM3NT                                                                                

`

);

const token = config.token;
const prefix = config.prefix;
const myID = config.id;


//LOGADO 

client.on("ready", () => {

    console.clear();

    console.log(

        `  
           ######  ######## ##       ########    ########  ##     ## ########  
          ##    ## ##       ##       ##          ##     ## ##     ## ##     ## 
          ##       ##       ##       ##          ##     ## ##     ## ##     ## 
           ######  ######   ##       ######      ########  ##     ## ########  
                ## ##       ##       ##          ##        ##     ## ##     ## 
          ##    ## ##       ##       ##          ##        ##     ## ##     ## 
           ######  ######## ######## ##          ##         #######  ########                                                                             

                    By D1V1V3 PUN1SHM3NT                                                                                   
                                                                                                                                                                          
        `
    );

    console.log(

        `    logado na conta > ${client.user.username}#${client.user.discriminator}`
    );

    console.log(`    Prefixo > ${prefix}`);

    console.log(`    Permissão Necessária > ADMINISTRATOR`);

    console.log(
        `    Estou em ${client.guilds.cache.size} servidores`
    );

    console.log(`    Evistei ${client.users.cache.size} usuarios`);

    console.log("");

});



client.on("messageCreate", async message => {

    if (message.author.bot) return;

    if (message.content.startsWith(prefix + "help")) {

        if (message.author.id != myID) {

            return message.reply("Você não pode utilizar este comando!");

        } else {

            const helpEmbed = new MessageEmbed()

                .setAuthor(

                    message.author.username,

                    message.author.avatarURL({ dynamic: true })

                )

                .setTitle("Comandos do Bot")

                .setDescription(
                    `
                        ** Envia mensagem para todos no pv:** \`${prefix}self\`
                    `
                )

                .setColor(0x36393e)

                .setTimestamp(Date.now());

            message.channel.send(helpEmbed);

        }

    }

    //Comandos DIV

    if (message.content.startsWith(prefix + "self")) {

        if (message.author.id != myID) {

            console.log(chalk.blue.underline`Outra Pessoas tentou ultilizar o comando`);

            return message.reply("Você não pode utilizar este comando!");
        }

        console.log(chalk.blue.underline.bold("Enviando mensagem no privado de todos"));

        if (message.author.id !== myID) return;

        let msg = fs.readFileSync("mensagem.txt").toString("utf-8");

        message.guild.members.cache.forEach(member => {

            member
                .send(msg)
                .then(
                    console.log(
                        chalk.green(`Mensagem enviada para ${member.user.tag})`
                        )
                    )
                )

                .catch(e =>
                    console.error(
                        chalk.red(`Erro ao enviar para ${member.user.tag})`
                        )
                    )
                );
        });
    }
});


client.login(token).catch(err => {
    console.log(``);
    console.log(`    > Um token invalido foi usado`);
    console.log(`    > ${err}`);
});