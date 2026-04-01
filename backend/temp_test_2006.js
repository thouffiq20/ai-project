import pkg from 'pg';
const { Client } = pkg;

const passwordsToTest = ['umar20', 'postgres', 'password', 'admin', 'root', '1234', '123456', 'AiMentorDB2026!', 'umar@23', 'umar@24', 'umar-20'];

async function testPort() {
  for (const pw of passwordsToTest) {
    const client = new Client({
      user: 'postgres',
      password: pw,
      host: 'localhost',
      port: 2006,
      database: 'postgres'
    });

    try {
      await client.connect();
      console.log(`✅ Connection successful with password: ${pw}`);
      await client.end();
      return;
    } catch (err) {
      console.log(`❌ Failed with password '${pw}': ${err.message}`);
    }
  }
}

testPort();

