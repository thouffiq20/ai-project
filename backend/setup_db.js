import { Client } from 'pg';

async function createDatabase() {
  const client = new Client({
    user: 'postgres',
    password: 'umar20',
    host: 'localhost',
    port: 5432,
    database: 'postgres' // Connect to default DB to run CREATE DATABASE
  });

  try {
    await client.connect();
    console.log('✅ Connected to default postgres database.');

    // Check if ai_mentor exists
    const res = await client.query("SELECT 1 FROM pg_database WHERE datname='ai_mentor'");
    if (res.rowCount === 0) {
      console.log('⏳ Creating ai_mentor database...');
      await client.query('CREATE DATABASE ai_mentor');
      console.log('✅ Database ai_mentor successfully created!');
    } else {
      console.log('✅ Database ai_mentor already exists.');
    }
  } catch (err) {
    console.error('❌ Error creating database:', err.message);
  } finally {
    await client.end();
  }
}

createDatabase();
