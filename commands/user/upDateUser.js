const { SlashCommandBuilder, UserSelectMenuBuilder, stripIndents, bold } = require('discord.js');
const db = require('../../db/db');
const { id } = require('common-tags');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('actualizar-usuario')
        .setDescription('Estas renovado como el Fenix, actualiza tu usuario perro')
        .addStringOption(option =>
            option
                .setName('email')
                .setDescription('Ingresa tu nuevo email: ')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const email = interaction.options.getString('email');
            const id = interaction.user.id;
            console.log(email, id);
            const userOld = db.prepare(`
            SELECT email FROM users
            WHERE user_id = ?
            `).get(id);

            if (!userOld) return await interaction.reply('Ups! Tu usuario no se ha registrado');

            const statement = db.prepare(`
            UPDATE users
            SET email = ?
            WHERE user_id = ?
            `);
            statement.run(email, id);
            //tambien se puede agrear dentro de un array 
            await interaction.reply(` Hey <@${interaction.user.id}> 
            Se actualizo tu email de ${bold(userOld.email)}
            a este email: ${bold(email)}
            `);

        } catch (error) {
            /*if (!id) {
                await interaction.reply(`<@${interaction.user.id}> Tu usuario ya esta registrado`);
            }*/
            console.log(error);
        }
    },
};