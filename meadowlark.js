import express from "express";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getFortune } from "./lib/fortune.js";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Setting view Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));

app.get("/about", (req, res) => {
  res.render("about", { fortune: getFortune() });
});

// 404 page
app.use((req, res) => {
  res.status(404);
  res.render("404");
});

// 500 page
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render("500");
});

app.listen(port, () =>
  console.log(
    `Express has starded on http//localhost:${port}` +
      " Press Ctrl + C for end."
  )
);
