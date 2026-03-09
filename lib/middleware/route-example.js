import express from "express";
const app = express();
app.use((req, res, next) => {
  console.log("\nВСЕГДА");
  next();
});

app.get("/a", (req, res) => {
  console.log("/а: маршрут завершен");
  res.send("a");
});
app.get("/a", (req, res) => {
  console.log("/а: никогда не вызывается");
});

app.get("/b", (req, res, next) => {
  console.log("/b: маршрут не завершен");
  next();
});

app.use((req, res, next) => {
  console.log("ИНОГДА");
  next();
});

app.get("/b", (req, res, next) => {
  console.log("/Ь (часть 2): сгенерирована ошибка");
  throw new Error("b не выполнено");
});

app.use("/b", (err, req, res, next) => {
  console.log("/Ь ошибка обнаружена и передана далее");
  next(err);
});

app.get("/с", (err, req) => {
  console.log("/с: сгенерирована ошибка");
  throw new Error("c не выполнено");
});

app.use("/с", (err, req, res, next) => {
  console.log("/с: ошибка обнаружена, но не переданадалее");
  next();
});

app.use((err, req, res, next) => {
  console.log("обнаружена необработанная ошибка: " + err.message);
  res.send("500 - ошибка сервера");
});

app.use((req, res) => {
  console.log("маршрут не обработан");
  res.send("404 - не найдено");
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(
    `Express запущен на http://localhost:${port}` +
      "для завершения нажмите Ctrl+C."
  )
);
