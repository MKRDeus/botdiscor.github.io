//acceso a la base de datos
/*
const db = require('./db');

//Para borrar una tabla de forma automatica
// const deteleTableUsers = (name) => {
//     const statement = db.prepare(`
//     DROP TABLE IF EXISTS users
//     `);
//     statement.run();
// }

//se crea una tabla para la base de datos
const createUsersTable = () => {
    console.log("borrando...");
    db.prepare('DROP TABLE IF EXISTS users').run();
    console.log("borradas");
    const statement = db.prepare(`
        CREATE TABLE IF NOT EXISTS users(
            user_id TEXT PRIMARY KEY,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL,
            created_user DATE NOT NULL
        )
    `);
    statement.run();
};

const createNotesTable = () => {
    db.prepare('DROP TABLE IF EXISTS notes').run();
    const statement = db.prepare(`
        CREATE TABLE IF NOT EXISTS notes(
            note_id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at DATE NOT NULL,
            content TEXT NOT NULL,
            user_id TEXT NOT NULL,
            FOREIGN KEY (user_id)
                REFERENCES users (user_id)
                    ON DELETE CASCADE
        )
    `);
    statement.run();
};

const createTables = async () => {
    console.log('creando tablas...');
    await createUsersTable();
    await createNotesTable();
    console.log('tablas creadas!');
}

createTables();*/