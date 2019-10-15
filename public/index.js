$(function () {

    const displayArticles = data => {
        data.comment.forEach(function (article, i) {
            var button = $("<button>").text("x").attr("class", "btn btn-danger delete").attr("data-id", data.comment[i]._id);
            $(".savedComment").append("<p>" + data.comment[i].body + "</p>", button);
        })
    }

    $("#scrape").on("click", function (event) {
        event.preventDefault();
        $.getJSON("/scrape", function (data) {

        });
        location.reload();
    });
    $("#clear").on("click", function (event) {
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


    $(".saveComment").on("click", function () {

        let id = $(this).attr('data-id');
        console.log("clicked" + id);
        console.log($(".userComment").val().trim());
        $.ajax({
            url: "/articles/" + id,
            method: "POST",
            data: {
                body: $(".userComment").val().trim()
            }
        }).then(
            function (data) {
                console.log(data);
            });
        $(".userComment").val("");

        $.ajax({
            method: "GET",
            url: "/articles/" + id
        })
            // With that done, add the note information to the page
            .then(function (data) {
                console.log(data);
                // The title of the article
                displayArticles(data);
            });
        $(".savedComment").empty();
    });

    $(".addComment").on("click", function () {
        let id = $(this).attr('id');
        $(".saveComment").attr("data-id", id);
        $(".article").attr("data-id", id);
        console.log("clicked" + id);
        $.ajax({
            url: "/articles/" + id,
            method: "GET",
        }).then(
            function (data) {
                console.log(data);
                displayArticles(data);
            });
        $(".savedComment").empty();
    });

    $(document).on("click", "button.delete", function (event) {
        event.preventDefault();
        console.log("clicked delete")
        let id = $(this).attr('data-id');
        $.ajax({
            url: "/delete-comment/" + id,
            method: "DELETE",
        }).then(
            function (data) {
                console.log(data);
                alert("commet deleted");
                location.reload();
            });
    });
});