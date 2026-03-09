app.use((req, res, next) => {
  console.log(`Upload request: ${res.url}`);
  next();
});

app.use((req, res, next) => {
  console.log("End request");
  res.send("Thanks for the game!");
});

арр.use((req, res, next) => {
  console.log("Упс, меня никогда не вызовут!");
});
