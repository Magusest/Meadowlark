import { getFortune } from "./fortune";

const home = (res, req) => res.render("home");

const about = (res, req) => res.render("about", { fortune: getFortune() });

const notFound = (res, req) => {
  res.status(404);
  res.render("404");
};

const serverError = (res, req, err, next) => {
  res.status(500);
  res.render("500");
};

export { home, about, notFound, serverError };
