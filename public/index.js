$(function () {


    let displayArticles = articles => {
        articles.forEach((article) => {
            let div = $("<div>").attr("class", "card").css("width", "75rem").append(
                $("<div>").attr("class", "card-body").append(
                    $("<a>").attr("href", "http://nytimes.com" + article.link).attr("target", "_blank").html("<h3>" + article.title + "</h3"),
                    $("<p>").attr("class", "card-text").text(article.snip),
                    $("<button>").attr("class", "btn btn-success saved").attr("id", article._id).text("Save Article")
                )
            )
            $("#display").append(div)
        })

    }
    $("#scrape").on("click", event => {
        event.preventDefault();
        $.getJSON("/scrape", function (data) {

        });
        $.getJSON("/articles", data => {
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

    $(document).on("click", '.saved', function () {
        var id = $(this).attr('id');
        console.log("Article ID: " + id);

        $.ajax({
            type: "PUT",
            url: "/save/" + id,
        }).then(function (response) {
            console.log(JSON.stringify(response));

        });
    });

    // $("#saved").on("click", event => {
    //     event.preventDefault();
    //     $.get("/saved", function () {
    //         console.log("saved")
    //     })
    // });
});