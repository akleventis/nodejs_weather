const path = require("path");
const express = require("express");
const hbs = require("hbs");
const GEOCODE = require("./utils/geocode");
const FORECAST = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Alex Leventis",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Alex Leventis",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Alex Leventis",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up and running");
});
