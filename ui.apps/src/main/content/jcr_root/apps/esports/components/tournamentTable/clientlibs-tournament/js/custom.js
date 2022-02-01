$(document).ready(function () {
    $(".loader-rce").show();
    fetchData("all");
});

$("#categories").on("change", function () {
    var category = $('#categories :selected').val();
    fetchData(category);
    $(".loader-rce").show();
});

function fetchData(category) {
    let content = [];
    let contentPath = $('#tableContents').attr('root-path');
    if (contentPath) {
        $.ajax({
            url: contentPath,
            method: "GET",
            contentType: 'application/json',
            success: function (res) {
                content = Object.values(res.request.resource.contentList);
                populate(content, category);
                $(".loader-rce").hide();

            },
            error: function (error) {

            },
        });
    }
}

function populate(content, category) {
    let element = [];
    if (category != "all") {
        for (var i = 0; i < content.length; i++) {
            if (content[i].gameType == category) {
                element.push(content[i]);
            }
        }
        createHTML(element);

    } else {
        for (var i = 0; i < content.length; i++) {
            if (content[i].instanceType) {
                element.push(content[i]);
            }
        }
        createHTML(element);
    }
}

function createHTML(images) {
    var rawTemplate = $("#tableTemplate").html();
    var compiledTemplate = Handlebars.compile(rawTemplate);
    var ourGeneratedHTML = compiledTemplate(images);
    $("#tableContents").html(ourGeneratedHTML);
}