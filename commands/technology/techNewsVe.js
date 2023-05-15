const axios = require('axios');
const { SlashCommandBuilder, bold, ChannelType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');


let getNewTech = async () => {
    let response = await axios.get('https://newsapi.org/v2/top-headlines?country=ve&category=technology&apiKey=ff414b1553754449869ac91920b4fa60');
    let newTech = response.data;
    return newTech;
}



module.exports = {
    data: new SlashCommandBuilder()
        .setName('tech-ve')
        .setDescription('Provides information about technology News from Venezuela ')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to echo into')
                // Ensure the user can only select a TextChannel for output
                .addChannelTypes(ChannelType.GuildText)),
    async execute(interaction) {
        let news = await getNewTech();
        const random = Number(Math.floor(Math.random() * news.articles.length) );
        let randomNew = [random];
        let title = news.articles[randomNew[0]].title;
        let date = new Date(news.articles[randomNew[0]].publishedAt).toLocaleString().split('T')[0];
        
        const bodyNews = new EmbedBuilder().setTitle(`${title}`)
        .setURL(`${news.articles[randomNew[0]].url}`)
        .addFields(
            { name: `${date}`, value: 'Published', inline: true },
        );

        await interaction.reply({ embeds: [bodyNews] });
    },
};
