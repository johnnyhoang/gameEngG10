import dotenv from 'dotenv';
dotenv.config({ path: 'd:/Hoa Hoang/Apps/gameEngG10/backend/.env' });

async function testGroq() {
  const key = process.env.GROQ_API_KEY;
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: 'Hello, who are you? Reply in 5 words.' }]
      })
    });
    console.log('Groq Status:', res.status);
    const data = await res.json();
    console.log('Groq Response:', JSON.stringify(data));
  } catch (err) {
    console.error('Groq Error:', err);
  }
}

testGroq();
