import dotenv from 'dotenv';
dotenv.config({ path: 'd:/Hoa Hoang/Apps/gameEngG10/backend/.env' });

async function listModels() {
  const key = process.env.GEMINI_API_KEY;
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await res.json();
    console.log('Available models:', data.models ? data.models.map(m => m.name) : data);
  } catch (err) {
    console.error(err);
  }
}

listModels();
