import { Sequelize } from "sequelize";

const db = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.sqlite3'
});

const connection = async ()=>{
    try {
    await db.authenticate();
    db.sync()
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }
}

export {connection,db}