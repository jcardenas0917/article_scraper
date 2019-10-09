$(function () {


    let displayArticles = articles => {
        articles.slice(-10).forEach(article => {
            // var div = $("<div>").append(
            //     $("<p>").text(article.title),
            //     $("<p>").text(article.link),
            //     $("<p>").text(article.snip)
            // );
            // $("#display").append(div)
            var div = $("<div>").attr("class", "card").css("width", "89rem").append(
                $("<ul>").attr("class", "list-group list-group-flush"),
                $("<a>").attr("href", "http://nytimes.com" + article.link).attr("target", "_blank").text(article.title).css("background-color", "springgreen"),
                // $("<li>").attr("class", "list-group-item").text(article.link),
                $("<li>").attr("class", "list-group-item").text(article.snip),
            )
            $("#display").append(div)
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

        $.getJSON("/api/all", data => {
            displayArticles(data)
        });
    });


    $("#clear").on("click", event => {
        event.preventDefault();
        $.getJSON("/drop", () => {

        });
        console.log("collection dropped")
    });
});