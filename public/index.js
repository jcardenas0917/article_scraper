$(function () {

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