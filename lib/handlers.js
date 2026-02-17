import { getFortune } from "./fortune.js";

const home = (req, res) => res.render("home");

const about = (req, res) => res.render("about", { fortune: getFortune() });

const notFound = (req, res) => {
  res.status(404);
  res.render("404");
};

const serverError = (err, _req, res, _next) => {
  res.status(500);
  res.render("500");
};

export { home, about, notFound, serverError };
