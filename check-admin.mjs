import mysql from 'mysql2/promise';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

// Parse MySQL connection string
const url = new URL(`mysql://${connectionString.replace('mysql://', '')}`);
const config = {
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  port: url.port || 3306,
  ssl: true,
};

async function checkAdmin() {
  let connection;
  try {
    connection = await mysql.createConnection(config);
    
    const [rows] = await connection.execute(
      'SELECT id, email, name, role FROM app_users WHERE email = ?',
      ['kevin.shelton@invictusbpo.com']
    );
    
    if (rows.length > 0) {
      console.log('✓ Admin user found!');
      console.log(JSON.stringify(rows[0], null, 2));
    } else {
      console.log('✗ Admin user not found');
    }
    
  } catch (error) {
    console.error('Error checking admin user:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkAdmin();
