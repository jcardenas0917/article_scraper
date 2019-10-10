$(function () {


    let displayArticles = articles => {
        articles.forEach(article => {
            let div = $("<div>").attr("class", "card-body").css("width", "89rem").append(
                $("<a>").attr("href", "http://nytimes.com" + article.link).attr("target", "_blank").html("<h3>" + article.title + "</h3").css("background-color", "springgreen"),
                $("<p>").attr("class", "card-text").text(article.snip),
            )
            $("#card").append(div)
        })

    }
    $("#home").on("click", event => {
        event.preventDefault();
        $.get("/", function () {
            console.log("homepage")
        })
    })
    $("#scrape").on("click", event => {
        event.preventDefault();
        $.getJSON("/scrape", function (data) {

        });

        $.getJSON("/articles", data => {
            console.log(data);
            displayArticles(data);
        });
    });


    $("#clear").on("click", event => {
        event.preventDefault();
        $.getJSON("/drop", () => {

        });
        console.log("collection dropped")
        $("#display").empty();
    });
});