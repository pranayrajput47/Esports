/*GDPR [END]*/
$(document).ready(function () {

    var myDate = new Date();
    myDate.setDate(myDate.getDate() + 90);
    var flag = "";
    //Extracting cookies
    if (document.cookie.length != 0) {
        var namevaluepair = document.cookie.split("; ");
        for (var i = 0; i < namevaluepair.length; i++) {
            var namevaluearray = namevaluepair[i].split("=");
            if (namevaluearray[0] == "flag") {
                flag = namevaluearray[1];
            }
        }
    }
    if (flag != "true") {
        $(".alert-dismissible").css("display", "block");
    } else {
        $(".alert-dismissible").css("display", "none");
    }
    $(".btn-gdpr").click(function () {
        if (flag != "true") {
            document.cookie = "flag=true; path=/; expires=" + myDate.toGMTString() + ";";
        } else {
            document.cookie = "strideFlag=true; path=/; expires=" + myDate.toGMTString() + ";"
        }

    });

});
/*GDPR [END]*/