export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic, style } = req.body;

  // Връщаме демо съдържание докато оправяме OpenAI
  const demoCourse = `
🎯 СУЧЕТО: ${topic}
📚 СТИЛ: ${style}

ЗАГЛАВИЕ: "Въведение в ${topic}"
ОПИСАНИЕ: Персонализиран курс създаден специално за теб!

МОДУЛ 1: ОСНОВИ
✓ Урок 1: Какво е ${topic}
✓ Урок 2: Ключови принципи  
✓ Урок 3: Практически примери
🎯 Упражнение: Приложи знанията в реален scenario

МОДУЛ 2: НАПРЕДНАЛИ ТЕХНИКИ
✓ Урок 1: Стратегии за успех
✓ Урок 2: Избягване на често срещани грешки
✓ Урок 3: Оптимизация на резултатите
🎯 Упражнение: Създай свой собствен проект

🚀 СКОРО: AI-генерирано съдържание ще замени това демо!
`;

  // Симулираме забавяне като истински API
  await new Promise(resolve => setTimeout(resolve, 1000));

  res.status(200).json({ course: demoCourse });
}
