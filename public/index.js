$(function () {


    let displayArticles = () => {

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

        $.getJSON("/all", data => {
            console.log(data)
        });
    });


    $("#clear").on("click", event => {
        event.preventDefault();
        $.getJSON("/drop", () => {

        });
        console.log("collection dropped")
    });
});