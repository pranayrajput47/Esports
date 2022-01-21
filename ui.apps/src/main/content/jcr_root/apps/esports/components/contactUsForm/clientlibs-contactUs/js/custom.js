$(document).ready(function () {


    $("[name='firstname']").on("input", function () {
        let username = $(this).val();
        let namExp = /^[a-zA-Z ]+$/;
        if ((!namExp.test(username) && username !== "") || username.length > 100) {
            let fnameStr = username.substring(0, username.length - 1);
            $(this).val(fnameStr);
        }
    });
    $("[name='lastname']").on("input", function () {
        let username = $(this).val();
        let namExp = /^[a-zA-Z ]+$/;
        if ((!namExp.test(username) && username !== "") || username.length > 100) {
            let fnameStr = username.substring(0, username.length - 1);
            $(this).val(fnameStr);
        }
    });

    $("input[name='email']").on('input', function () {
        var regexname = new RegExp("^[a-zA-Z0-9.@]*$");
        var inputVal = $(this).val();
        if (!regexname.test(inputVal) || inputVal.length > 50) {
            var textStr = inputVal.substring(0, inputVal.length - 1);
            $(this).val(textStr);
            return false;
        }
    });
    $("input[name='zip']").on('input', function () {
        var regexname = /^[0-9]+$/;
        var inputVal = $(this).val();
        if (!regexname.test(inputVal) || inputVal.length > 5) {
            var textStr = inputVal.substring(0, inputVal.length - 1);
            $("input[name='zip']").val(textStr);
        }
    });
    $("input[name=phone]").on("input", function () {
        var passwrdNu = /^[0-9]+$/;
        var mobile = $(this).val();
        if (!passwrdNu.test(mobile) || mobile.length > 15) {
            var mobilestr = mobile.substring(0, mobile.length - 1);
            $(this).val(mobilestr);
        }
    });
    $("[name='message']").on("input", function () {
        let address = $(this).val();
        if (address == "" || address.length > 200) {
            let addressStr = address.substring(0, address.length - 1);
            $(this).val(addressStr);
        }
    });


    // 

    $("#esportsSubmit").click(function (e) {

        e.preventDefault();
        // RegEx variables
        let emailRe = /^\b[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b$/i;
        let zipCodeRe = /^[0-9]{5}$/;
        let city = $("[name='selectCity'] option:selected").val();
        let fullName = $("[name='firstname']").val();
        let lastName = $("[name='lastname']").val();
        let email = $("[name='email']").val();
        let zipcode = $("[name='zip']").val();
        let description = $("#con-message").val();
        if (city == "") {
            $(".CityError").show();
            $("[name='selectCity']").focus();
        } else if (fullName == "") {
            $(".fNameError").show();
            $("[name='firstname']").focus();
        } else if (lastName == "") {
            $(".lNameError").show();
            $("[name='lastname']").focus();
        } else if (email == "" || !emailRe.test(email)) {
            $(".EmailError").show();
            $("[name='email]").focus();
        } else if (zipcode == "" || !zipCodeRe.test(zipcode)) {
            $(".PincodeError").show();
            $("[name='zip]").focus();
        } else if ($("#inlineCheckbox3").prop("checked") == false) {
            $(".QuestionError1").show();
        } else if ($("#inlineCheckbox5").prop("checked") == false) {
            $(".QuestionError2").show();
        } else if (description == "") {
            $(".MessageError").show();
            $("#con-message").focus();
        } else if ($("#inlineCheckbox6").prop("checked") == false) {
            $(".EnrollError").show();
        } else {
            formData = {
                fullName: fullName,
                email: email,
                description: description,
                zipCode: zipcode,


            };

            console.log(formData);
            // $.ajax({
            //     url: submitApi,
            //     method: "POST",
            //     data: JSON.stringify(formData),
            //     contentType: 'application/json',
            //     success: function (res) {
            //         if (res.code == 200) {
            //             if (showDialogueMessage == "true") {
            //                 showDialogSouthPole(dataSuccess, successURL);
            //                 signUpFormSubmitSouthPoleAnalytics(
            //                     ctaText,
            //                     "successful |" + pageUrlPathPage,
            //                     ""
            //                 );
            //             } else {
            //                 window.location.href = successURL;
            //                 signUpFormSubmitSouthPoleAnalytics(
            //                     ctaText,
            //                     " unsuccessful |" + pageUrlPathPage,
            //                     ""
            //                 );
            //             }

            //         }
            //         if (res.code == 401) {
            //             showDialogSouthPole(allReadyMessage, successURL);
            //             signUpFormSubmitSouthPoleAnalytics(
            //                 ctaText,
            //                 " unsuccessful |" + pageUrlPathPage,
            //                 ""
            //             );
            //         }
            //     },
            //     error: function (error) {
            //         showDialogSouthPole(dataError, window.location.href);
            //         signUpFormSubmitSouthPoleAnalytics(
            //             ctaText,
            //             " unsuccessful |" + pageUrlPathPage,
            //             dataError
            //         );

            //     },
            // });
        }

    });

    $("[name='selectCity']").on("change", function () {
        $(".CityError").hide();
    });
    $("[name='firstname']").on("input", function () {
        $(".fNameError").hide();
    });
    $("[name='lastname']").on("input", function () {
        $(".lNameError").hide();
    });
    $("[name='email']").on("input", function () {
        $(".EmailError").hide();
    });
    $("[name='zip']").on("input", function () {
        $(".PincodeError").hide();
    });
    $("#inlineCheckbox3").on("input", function () {
        $(".QuestionError1").hide();
    });
    $("#inlineCheckbox5").on("input", function () {
        $(".QuestionError2").hide();
    });
    $("#con-message").on("input", function () {
        $(".MessageError").hide();
    });
    $("#inlineCheckbox6").on("input", function () {
        $(".EnrollError").hide();
    });





})