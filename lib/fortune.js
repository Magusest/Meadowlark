const fortunes = [
  "Победи свои страхи, или они победят тебя.",
  "Рекам нужны истоки.",
  "Не бойся неведомого.",
  "Тебя ждет приятный сюрприз.",
  "Будь проще везде, где только можно.",
];

export function getFortune() {
  const idx = Math.round(Math.random() * fortunes.length);
  return fortunes[idx];
}
