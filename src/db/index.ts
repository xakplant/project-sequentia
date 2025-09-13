import { Sequelize } from 'sequelize';

// TODO postgres for PROD 
// Option 1: Passing a connection URI
export const sequelize = new Sequelize('sqlite::memory:', {
    logging: console.log
}) // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres


