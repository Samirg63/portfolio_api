import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()

const production = process.env.NODE_ENV === 'production';

const db =
  production?
  new Sequelize(process.env.DATABASE_URL!,{
    dialect:'postgres',
    protocol:'postgres',
    logging:false,
    dialectOptions:{
      ssl:{
        require:true,
        ca:fs.readFileSync('./ca.pem').toString()
      }
    }
  })
  :
    new Sequelize({
      dialect: 'sqlite',
      storage: './src/db/database.development.sqlite3',
      logging:false
    });

const connection = async ()=>{
    try {
      await db.authenticate();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

export {connection,db}