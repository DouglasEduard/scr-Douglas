function Index_NewUserCandidate() {

    var CandidateUserDetail = {
        "Name": $("#index_full_name_id").val(),
        "EMail": $("#index_EMail").val(),
        "SelectedOption": $("#Index_SCR_UseOption").val()
    }

    var r = AjaxPost('Service/SCR2Service.svc/AddNewUserCandidate', CandidateUserDetail);

    if (r == 1)
       alert("Process performed successfully!");
};