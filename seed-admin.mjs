import bcrypt from 'bcrypt';
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
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false,
  },
};

async function seedAdmin() {
  let connection;
  try {
    connection = await mysql.createConnection(config);
    
    // Admin credentials
    const email = 'kevin.shelton@invictusbpo.com';
    const password = 'SecurePassword123!';
    const name = 'Kevin Shelton';
    const role = 'admin';
    
    // Hash password with bcrypt
    const passwordHash = await bcrypt.hash(password, 10);
    
    console.log(`Creating admin user: ${email}`);
    
    // Insert admin user
    const query = `
      INSERT INTO app_users (id, email, password_hash, name, role, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE
        password_hash = VALUES(password_hash),
        name = VALUES(name),
        role = VALUES(role),
        updated_at = NOW()
    `;
    
    const id = `admin-${Date.now()}`;
    await connection.execute(query, [id, email, passwordHash, name, role]);
    
    console.log('✓ Admin user created/updated successfully!');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Role: ${role}`);
    
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seedAdmin();
