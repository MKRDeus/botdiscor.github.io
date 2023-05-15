const axios = require('axios');
const { SlashCommandBuilder, bold } = require('discord.js');


let getJoke = async () => {
    let response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    let joke = response.data;
    return joke;
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Provides a Random JOKE Bro!'),
    async execute(interaction) {
        // interaction.guild is the object representing the Guild in which the command was run
        let jokeValue = await getJoke();
        await interaction.reply(`${bold('Some Joke 7u7r')}  \n ${jokeValue.setup} \n ${jokeValue.punchline} \n ${bold('This joke is:')} ${jokeValue.type}`);
        //console.log(jokeValue);
    },
};



