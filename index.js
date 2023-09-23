import express from "express";
import bodyParser from "body-parser";

// Express set up.
const app = express();
const port = 3000;

// Middleware.
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// List of items to be stored.
var listItems = [];

// List of months and days.
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

app.get("/", (req, res) => {
  listItems = [];
  res.render("index.ejs", {todoItems: listItems, placeholderText: "Enter something to do!", date: days[new Date().getDay()] + ", " + month[new Date().getMonth()] + " " + new Date().getDate()});
});

app.get("/submit", (req, res) => {
  res.redirect("/");
});

app.post("/crossout", (req, res) => {
  const todoEntry = req.body.todoEntry;

  for (let i = 0; i < listItems.length; ++i) {
    if (listItems[i] === todoEntry) {
      if (!listItems[i].includes("<s tag-html>")) {
        listItems[i] = "<s tag-html>" + todoEntry;
        console.log(listItems[i] + " successfully converted.")
      }
    }
  }

  res.render("index.ejs", {todoItems: listItems, placeholderText: "Enter something to do!", date: days[new Date().getDay()] + ", " + month[new Date().getMonth()] + " " + new Date().getDate()});
});

app.post("/submit", (req, res) => {
  // The bar is an entry and is not empty.
  if (req.body.todoAddBar && req.body.todoAddBar.trim() !== "") {
    if (!listItems.includes(req.body.todoAddBar)) {
      listItems.push(req.body.todoAddBar);
      console.log("Item requested to be added: " + req.body.todoAddBar);
      res.render("index.ejs", {todoItems: listItems, placeholderText: "Enter something to do!", date: days[new Date().getDay()] + ", " + month[new Date().getMonth()] + " " + new Date().getDate()});
    } else {
      res.render("index.ejs", {todoItems: listItems, placeholderText: "Item already in list!", date: days[new Date().getDay()] + ", " + month[new Date().getMonth()] + " " + new Date().getDate()});
    }
  }
});

app.post("/", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
