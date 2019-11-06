let axios = require("axios");
let cheerio = require("cheerio");
// let db = require("./models");
let db = {
    Article: require("./models/Article"),
    Comment: require("./models/Comments")
};
module.exports = function (app) {

    // scraping articlegit
    app.get("/scrape", function (req, res) {
        axios.get("https://www.nytimes.com/section/world").then(function (response) {
            var $ = cheerio.load(response.data);
            $("article").each(function (i, element) {
                let result = {};
                result.title = $(element).children().children("h2").text();
                result.link = $(element).find("a").attr("href");
                result.snip = $(element).children().children("p").text();


                db.Article.create(result)
                    .then(dbArticle => {
                        console.log(dbArticle)
                    })
                    .catch(err => {
                        console.log(err);
                    });
            });

            res.send("Scrape Complete");
        });
    });

    //render index page and pass data
    app.get("/", function (req, res) {
        db.Article.find({}, function (err, data) {
            let hbsObject = {
                articles: data
            };
            res.render("index", hbsObject);
        })
    });

    //render saved articles page
    app.get("/saved", function (req, res) {
        db.Article.find({}, function (err, data) {
            let hbsObject = {
                articles: data
            };
            console.log(data)
            res.render("saved", hbsObject);
        });

    });

    //articles api
    app.get("/articles", function (req, res) {
        db.Article.find({}, function (error, data) {
            console.log(data)
            res.json(data);
        });
    });

    //comments api
    app.get("/comments", function (req, res) {
        db.Comment.find({}, function (error, data) {
            console.log(data)
            res.json(data);
        });
    });

    //drop all collections to start again
    app.get("/drop", function (req, res) {
        db.Article.deleteMany({}, function (err, del) {
        });

        db.Comment.deleteMany({}, function (err, del) {
        });
        res.send("Collection Dropped")
    });
    //update articles to saved
    app.put("/save-Article/:id", function (req, res) {
        db.Article.findByIdAndUpdate({ _id: req.params.id }, {
            $set: { saved: true }
        }).then(function (data) {
            res.json(data);
        });
    });
    //update articles to NOT saved
    app.delete("/delete-Article/:id", function (req, res) {
        db.Article.findByIdAndUpdate({ _id: req.params.id },
            {
                $set: { saved: false }
            }).then(function (data) {
                res.json(data);
            });
    });

    //Post comment on saved article and create the comments collection
    app.post("/articles/:id", function (req, res) {
        console.log(req.body);
        db.Comment.create(req.body)
            .then(function (dbComment) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comment: dbComment._id } }, { new: true });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    //get the article ID and include the comment to diplay on modal
    app.get("/articles/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id })
            .populate("comment")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
    //delete comment
    app.delete("/delete-comment/:id", function (req, res) {
        db.Comment.findByIdAndRemove(req.params.id, (err, comment) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send();
        });

    });
};