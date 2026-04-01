import { Client } from 'pg';

const passwordsToTest = ['umar20', 'postgres', 'password', 'admin', 'root', '1234', '123456', 'AiMentorDB2026!'];

async function testPostgres() {
  for (const pw of passwordsToTest) {
    const client = new Client({
      user: 'postgres',
      password: pw,
      host: 'localhost',
      port: 5432,
      database: 'postgres' // default DB
    });

    try {
      await client.connect();
      console.log(`✅ SUCCESS with password: ${pw}`);
      await client.end();
      return pw;
    } catch (err) {
      if (err.code === 'ECONNREFUSED') {
        console.log(`❌ ECONNREFUSED (Server not running on 5432)`);
        return null; // Stop trying if server is down
      }
      console.log(`Failed with password '${pw}': ${err.message}`);
    }
  }
  return null;
}

testPostgres();
