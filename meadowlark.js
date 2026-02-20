import express from "express";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { home, about, notFound, serverError } from "./lib/handlers.js";
import { weatherMiddleware } from "./lib/middleware/weather.js";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isMainModule = process.argv[1] === __filename;

// Setting view Handlebars
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views/partials"),
    helpers: {
      section: function (name, option) {
        if (!this._section) this._section = {};
        this._section[name] = option.fn(this);
        return null;
      },
    },
  })
);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "/public")));

app.use(weatherMiddleware);

app.get("/", home);

app.get("/about", about);

// 404 page
app.use(notFound);

// 500 page
app.use(serverError);

if (isMainModule) {
  app.listen(port, () =>
    console.log(
      `Express has started on http://localhost:${port}` +
        " Press Ctrl + C to end."
    )
  );
}

export default app;
