$(function () {
    $("#scrape").on("click", event => {
        event.preventDefault();
        $.getJSON("/scrape", function (data) {

        });
        location.reload();
    });
    $("#clear").on("click", event => {
        event.preventDefault();
        $.getJSON("/drop", () => {

        });
        console.log("collection dropped")
        $("#display").empty();
        $("#savedCard").empty();
    });

    $(document).on("click", '.saved', function () {
        var id = $(this).attr('id');
        console.log("Article ID: " + id);

        $.ajax({
            type: "PUT",
            url: "/save-Article/" + id,
        }).then(function (response) {
            alert("Article Saved")

        });
    });

    $(".deleteArticle").on("click", function () {
        console.log("deleteButton clicked");
        var id = $(this).attr('id');
        $.ajax("/delete-Article/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted article", id);
                location.reload();
            });
    });
});