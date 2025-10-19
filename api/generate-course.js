import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic, style } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Ти си експерт по образователни технологии. Създаваш структурирани учебни курсове на БЪЛГАРСКИ език."
        },
        {
          role: "user",
          content: `Създай учебен курс на български език по тема: "${topic}". 
                   Стил на обучение: ${style}.
                   Формат: 
                   - Заглавие на курса
                   - Кратко описание (2-3 изречения)
                   - 3 модула с по 2 урока всеки
                   - Практическо упражнение за всеки модул
                   - Заключение`
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const courseContent = completion.choices[0].message.content;
    res.status(200).json({ 
      success: true,
      course: courseContent 
    });
    
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Грешка при генериране на курса. Опитай отново.' 
    });
  }
}
