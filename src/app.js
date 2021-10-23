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

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  GEOCODE(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) return res.send({ error });
    FORECAST(lat, long, (error, forecastData) => {
      if (error) return res.send({ error });
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    name: "Alex Leventis",
    errorMessage: "Page not found",
  });
});

const PORT = process.env.PORT || 3000

// app.listen(PORT, () => {
//   console.log("Server is up and running");
// });

app.listen(PORT, "0.0.0.0");
