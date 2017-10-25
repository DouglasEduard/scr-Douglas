function AjaxGet() {
    $.ajax({
        url: "Service/SCR2Service.svc/DoWork",
        type: "GET",
        dataType: "json",
        success: function (result) {
            console.info(result);
        }
    });
};
