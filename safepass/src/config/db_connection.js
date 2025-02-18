import mysql from 'mysql2/promise';

// MySQL database connection credentials
const configcredential = {
    host: process.env.DB_HOST,       // Update if using a remote database
    user: process.env.DB_USER,            // MySQL username
    password:process.env.DB_PASSWORD,      // MySQL password
    database: process.env.DB_NAME, // Database name
    port: process.env.DB_PORT,              // Default MySQL port
    multipleStatements: process.env.DB_MULTI_STATEMENT,
    connectTimeout: 20000
};

// Function to get a new MySQL connection
export async function getDBConnection() {
    return await mysql.createConnection(configcredential);
}
