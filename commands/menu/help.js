const { SlashCommandBuilder, bold } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('help-country')
        .setDescription('Provides a help of how look for countries!'),
    async execute(interaction) {
        await interaction.reply(`Para buscar por paises debes colocar el slash y despues la abreviacion del pais: \n VE=venezuela; \n US=United States; \n GB=United Kingdom; \n DE=Germany; \n FR=France; \n BR=Brasil; \n AR=Argentina; \n CH=Suiza; \n CO=Colombia; \n IE=Irlanda; \n IT=Italy; \n PT=Portugal`);
    },
};

