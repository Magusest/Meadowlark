import { getFortune } from "./fortune.js";

const VALID_EMAIL_REGEX = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@" +
    "[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?" +
    "(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
);

// fake "newsletter signup" interface
class NewsletterSignup {
  constructor({ name, email }) {
    this.name = name;
    this.email = email;
  }
  async save() {
    // here's where we would do the work of saving to a database
    // since this method is async, it will return a promise, and
    // since we're not throwing any errors, the promise will
    // resolve successfully
  }
}

const home = (req, res) => res.render("home");

const about = (req, res) => res.render("about", { fortune: getFortune() });

const notFound = (req, res) => {
  res.status(404);
  res.render("404");
};

const serverError = (err, _req, res, _next) => {
  console.error(err);
  res.status(500);
  res.render("500");
};

const newsletterSignup = (req, res) => {
  // Мы изучим CSRF позже... сейчас мы лишь
  // вводим фиктивное значение.
  res.render("newsletter-signup", { csrf: "Здесь находится токен CSRF" });
};

const newsletterSignupProcess = (req, res) => {
  const { name, email } = req.body;

  if (!VALID_EMAIL_REGEX.test(email)) {
    req.session.flash = {
      type: "danger",
      intro: "Validation error!",
      message: "The email address you entered was not valid.",
    };
    res.redirect(303, "/newsletter-signup");
  }

  new NewsletterSignup({ name, email })
    .save()
    .then(() => {
      req.session.flash = {
        type: "success",
        intro: "Thank you!",
        message: "You have now been signed up for the newsletter.",
      };
      return res.redirect(303, "/newsletter-archive");
    })
    .catch((err) => {
      req.session.flash = {
        type: "danger",
        intro: "Database error!",
        message: "There was a database error; please try again later.",
      };
      return res.redirect(303, "/newsletter-archive");
    });
};

const newsletterSignupThankYou = (req, res) =>
  res.render("newsletter-signup-thank-you");

const newsletter = (req, res) => {
  // Мы изучим CSRF позже... сейчас мы лишь
  // вводим фиктивное значение.
  res.render("newsletter", { csrf: "Здесь находится токен CSRF" });
};

const api = {
  newsletterSignup: (req, res) => {
    console.log("Токен CSRF (из скрытого поля формы): " + req.body._csrf);
    console.log("Имя (из видимого поля формы): " + req.body.name);
    console.log("Email (из видимого поля формы): " + req.body.email);
    res.send({ result: "success" });
  },
};

export {
  home,
  about,
  notFound,
  serverError,
  newsletterSignup,
  newsletterSignupProcess,
  newsletterSignupThankYou,
  newsletter,
  api,
};
