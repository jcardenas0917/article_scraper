// Dependencies
let express = require("express");
let mongoose = require("mongoose");
// Initialize Express
let app = express();
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
let exphbs = require("express-handlebars");


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScrape";
mongoose.connect(MONGODB_URI);

require("./routes/routes.js")(app)
// Listen on port 3000
app.listen(3000, function () {
    console.log("App running on port 3000!");
});
