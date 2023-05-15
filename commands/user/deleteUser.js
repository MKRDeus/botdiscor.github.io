const { SlashCommandBuilder, UserSelectMenuBuilder, stripIndents, bold } = require('discord.js');
const db = require('../../db/db');
const { id } = require('common-tags');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('elimina-tu-email')
        .setDescription('Estas deschavetado y quieres huir de mi elimina tu usuario pues, perro'),
    async execute(interaction) {
        try {
            const email = interaction.options.getString('email');
            const id = interaction.user.id;

            const statement = db.prepare(`
            DELETE FROM users
            WHERE user_id = ?
            `);
            statement.run(id);
            //tambien se puede agrear dentro de un array 
            await interaction.reply(` Hey <@${interaction.user.id}> 
            Tu usuario se ha borrado, corey taylor dijo 'show me the light and maybe tonight I tell you everything'
            Well We are th light
            `);

        } catch (error) {
            /*if (!id) {
                await interaction.reply(`<@${interaction.user.id}> Tu usuario ya esta registrado`);
            }*/
            console.log(error);
        }
    },
};