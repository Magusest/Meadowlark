import express from "express";
import { engine } from "express-handlebars";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import {
  home,
  about,
  notFound,
  serverError,
  newsletterSignup,
  newsletterSignupProcess,
  newsletterSignupThankYou,
  newsletter,
  api,
} from "./lib/handlers.js";
import { weatherMiddleware } from "./lib/middleware/weather.js";
import pkg from "body-parser";
import cookieParser from "cookie-parser";
import { cookieSecret } from "./credentials.js";
import expressSession from "express-session";
import { flashMiddleware } from "./lib/middleware/flash.js";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isMainModule = process.argv[1] === __filename;
const { urlencoded, json } = pkg;

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

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(cookieParser(cookieSecret));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: cookieSecret,
  })
);

app.use(flashMiddleware);

app.get("/", home);

// handlers for browser-based form submission
app.get("/newsletter-signup", newsletterSignup);
app.post("/newsletter-signup/process", newsletterSignupProcess);
app.get("/newsletter-signup/thank-you", newsletterSignupThankYou);

// handlers for fetch/JSON form submission
app.get("/newsletter", newsletter);
app.post("/api/newsletter-signup", api.newsletterSignup);

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
