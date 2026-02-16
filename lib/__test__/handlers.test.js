import { jest } from "@jest/globals";
import { home, about, notFound, serverError } from "../handlers";

test("home page render", () => {
  const req = {};
  const res = { render: jest.fn() };
  home(res, req);
  expect(res.render).toHaveBeenCalledWith("home");
});

test("about page with fortune", () => {
  const req = {};
  const res = { render: jest.fn() };
  about(res, req);
  expect(res.render).toHaveBeenCalledWith(
    "about",
    expect.objectContaining({ fortune: expect.any(String) })
  );
});

test("Not Found page render", () => {
  const req = {};
  const res = { status: jest.fn().mockReturnThis(), render: jest.fn() };
  notFound(res, req);
  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.render).toHaveBeenCalledWith("404");
});

test("Server Error page render", () => {
  const err = new Error("some error");
  const req = {};
  const res = { status: jest.fn().mockReturnThis(), render: jest.fn() };
  const next = jest.fn();
  serverError(res, req, err, next);
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.render).toHaveBeenCalledWith("500");
});
