import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
dotenv.config()

const production = process.env.ONPROD === 'true';

const db = new Sequelize({
  dialect: 'sqlite',
  storage: (production)?'./src/db/database.sqlite3':'./src/db/database.development.sqlite3'
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