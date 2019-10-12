$(function () {
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
        let newComment = {
            author: $("#author").val().trim(),
            body: $("#userComment").val().trim()

        }
        var id = $(this).attr('id');
        console.log("clicked" + id);
        $.ajax({
            url: "/articles/" + id,
            method: "POST",
            data: newComment
        }).then(
            function (data) {
                console.log(data);
            });
    });

    $(".addComment").on("click", function () {
        var id = $(this).attr('id');
        console.log("clicked" + id);
        $.ajax({
            url: "/articles/" + id,
            method: "GET",
        }).then(
            function (data) {
                console.log(data);
                // data.forEach(function (comment, index) {
                //     $("#savedComment").append(data[index].author, data[index].body)
                // })
            });
    });

});