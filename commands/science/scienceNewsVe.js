const axios = require('axios');
const { SlashCommandBuilder, bold } = require('discord.js');
const { EmbedBuilder } = require('discord.js');


let getNewTech = async () => {
    let response = await axios.get('https://newsapi.org/v2/top-headlines?country=ve&category=science&apiKey=ff414b1553754449869ac91920b4fa60');
    let newTech = response.data;
    return newTech;
}



module.exports = {
    data: new SlashCommandBuilder()
        .setName('science-ve')
        .setDescription('Provides information about Science News from Venezuela '),
    async execute(interaction) {
        try {
            let news = await getNewTech();
            const random = Number(Math.floor(Math.random() * news.articles.length) );
            let randomNew = [random];
            let title = news.articles[randomNew[0]].title;
            let date = new Date(news.articles[randomNew[0]].publishedAt).toLocaleString().split('T')[0];
            
            const bodyNews = new EmbedBuilder().setTitle(`${title}`)
            .setURL(`${news.articles[randomNew[0]].url}`)
            .addFields(
                { name: `${news.articles[randomNew[0]].author}`, value: 'Author' },
                { name: `${news.articles[randomNew[0]].description}`, value: 'Description', inline: true },
                { name: `${news.articles[randomNew[0]].content}`, value: 'Content', inline: true },
            )
            .setFooter({ text: `${date}` });
    
            await interaction.reply({ embeds: [bodyNews] });   
        } catch (error) {
            console.log(error);
        }
    },
};
