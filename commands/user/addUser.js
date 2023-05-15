const { SlashCommandBuilder } = require('discord.js');
const db = require('../../db/db');



module.exports = {
  data: new SlashCommandBuilder()
    .setName('agregar-usuario')
    .setDescription('Agrega tu Usuario a nuestro bot')
    .addStringOption(option =>
      option
        .setName('nombre')
        .setDescription('Tu nombre: ')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('apellido')
        .setDescription('Tu apellido: ')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('email')
        .setDescription('tu email: ')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const name = interaction.options.getString('nombre');
      const lastname = interaction.options.getString('apellido');
      const email = interaction.options.getString('email');
      const id = interaction.user.id;
      console.log(name, lastname, email, id);
      const created = new Date().toISOString();
      /**pedir una fecha */
      /*
      console.log(created);
      console.log(new Date(created).toLocalString());
      */
      const statement = db.prepare(`
      INSERT INTO users (user_id, first_name, last_name, email, created_user)
      VALUES (?, ?, ?, ?, ?)
    `);
      statement.run(id, name, lastname, email, created);
      //tambien se puede agrear dentro de un array 
      await interaction.reply(`Hola <@${interaction.user.id}>, Bienvenido a este Servidor!`);

    } catch (error) {
      if (error.message === 'UNIQUE constraint failed: users.user_id') {
        await interaction.reply(`<@${interaction.user.id}> Tu usuario ya esta registrado`);
      }
      console.log(error);
    }
  },
};