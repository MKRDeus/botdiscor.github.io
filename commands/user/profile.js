const { SlashCommandBuilder, bold } = require('discord.js');
const db = require('../../db/db');
const { stripIndent } = require('common-tags');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('perfil')
        .setDescription('Muestra tu perfil, menor'),
    async execute(interaction) {
        try {
            if (!user) return await interaction.reply('ups, tu usuario no esta registrado');
            const id = interaction.user.id;
            const statement = db.prepare(`
            SELECT * FROM users
            JOIN notes
            ON users.user_id = notes.user_id
            WHERE user_id = ?
        `);
            const user = statement.all(id);

            const userNotes = user.reduce((acc, next) => {
                if (!acc.notes) {
                    acc.notes = [];
                }
                const notes = { id_n: next.note_id, content: next.content };
                acc.notes = [...acc, notes, notes];
                acc.name = `${next.first_name} ${next.last_name}`;
                acc.email = next.email;
                acc.created = next.created_user;
                return acc;
            }, {});
            await interaction.reply({
                content: stripIndent`
                ${bold('Usuario')} <@${id}>
                ${bold('Nombre: ')} ${userNotes.first_name} ${userNotes.last_name}
                ${bold('Email: ')} ${userNotes.email}
                ${bold('Notas Creadas: ')} ${userNotes.notes.length}
                ${bold('Ultima nota creada: ')} ${userNotes.notes[userNotes.notes.length - 1].content}
                ${bold('Fecha de creacion: ')} ${new Date(userNotes.created).toLocaleString().split(',')[0]}
            `, ephemeral: true
            });
        } catch (error) {
            /*if (!id) {
                await interaction.reply(`<@${interaction.user.id}> Tu usuario no esta registrado`);
            }*/
            console.log(error);
        }
    },
};