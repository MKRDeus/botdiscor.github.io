const { SlashCommandBuilder, bold } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help-category')
        .setDescription('Provides a help of how look for categories!'),
    async execute(interaction) {
        await interaction.reply(`Para buscar por categorias debes colocar el slash y despues la categoria: \n Business \n Health \n Science \n Sports \n Technology`);
    },
};

