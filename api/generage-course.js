import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic, style } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Ти си експерт по образователни технологии. Създаваш структурирани учебни курсове."
        },
        {
          role: "user",
          content: `Създай учебен курс на български език по тема: "${topic}". 
                   Стил на обучение: ${style}.
                   Формат: 
                   - Заглавие на курса
                   - Кратко описание
                   - 5 модула с по 3 урока всеки
                   - Практическо упражнение за всеки модул`
        }
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const courseContent = completion.choices[0].message.content;
    res.status(200).json({ course: courseContent });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Грешка при генериране на курса' });
  }
}
