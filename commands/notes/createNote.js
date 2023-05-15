const { SlashCommandBuilder } = require('discord.js');
const db = require('../../db/db');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('crear-notitas')
        .setDescription('Crea tu nota perro')
        .addStringOption(option =>
            option
                .setName('contenido')
                .setDescription('Rolo de Texto ñero: ')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const content = interaction.options.getString('contenido');
            const created = new Date().toISOString();

            const statement = db.prepare(`
      INSERT INTO notes (content, user_id, created_at)
      VALUES (?, ?, ?)
    `);
            statement.run(content, interaction.user.id, created);
            //tambien se puede agrear dentro de un array 
            await interaction.reply(`Nueva notiña creada perro: ${content}.`);

        } catch (error) {
            if (error.message === 'UNIQUE constraint failed: users.user_id') {
                await interaction.reply(`<@${interaction.user.id}> Tu usuario ya esta registrado`);
            }
            console.log(error);
        }
    },
};