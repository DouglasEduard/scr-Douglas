function AjaxGet(url) {
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (result) {
            return result;
        }
    });
};

function AjaxPost(url, value) {    
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(value),
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            return result;
        }
    });
}
