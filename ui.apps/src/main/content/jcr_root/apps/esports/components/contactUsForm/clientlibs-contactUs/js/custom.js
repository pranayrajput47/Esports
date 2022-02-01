$(document).ready(function () {
    let successMessage = $(".messagePopUp").attr("success-message");
    let errorMessage = $(".messagePopUp").attr("error-message");
    let apiUrl = $("#formModal").attr("api-Url");

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
        let state = $("[name='selectCity'] option:selected").val();
        let fullName = $("[name='firstname']").val();
        let lastName = $("[name='lastname']").val();
        let email = $("[name='email']").val();
        let zipcode = $("[name='zip']").val();
        let description = $("#con-message").val();
        let phone = $("input[name=phone]").val();
        if (phone == undefined) {
            phone = "";
        }
        let interested = $('.checkbox-val:checked').map(function (_, el) {
            return $(el).val();
        }).get();
        let enrolled = $("#inlineCheckbox6").prop("checked")
        if (enrolled == undefined) {
            enrolled = "";
        }
        if (state == "") {
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
            $("#con-email").focus();
        } else if (zipcode == "" || !zipCodeRe.test(zipcode)) {
            $(".PincodeError").show();
            $("#con-subject").focus();
        } else if ($("#inlineCheckbox1").prop("checked") == false && $("#inlineCheckbox2").prop("checked") == false && $("#inlineCheckbox3").prop("checked") == false) {
            $(".GradeError").show();
            $("#inlineCheckbox1").focus();

        } else if (description == "") {
            $(".MessageError").show();
            $("#con-message").focus();
        } else {
            formData = {
                state: state,
                fname: fullName,
                lname: lastName,
                email: email,
                description: description,
                pcode: zipcode,
                phone: phone,
                interested: interested,
                enrolled: enrolled


            };
            $(".form-custom").hide();
            $(".modal-header").hide();
            $(".modal-footer").hide()
            $(".loader-stride").show();
            $.ajax({
                url: apiUrl,
                method: "POST",
                data: formData,
                success: function (res) {
                    console.log(res.code)
                    if (res.code == 200) {
                        $(".loader-stride").hide();
                        $(".form-custom").hide();
                        $(".modal-header").show();
                        $(".messagePopUp").show();
                        $(".success-message").show();
                        $(document).on("click", ".close", function (e) {
                            location.reload();

                        });

                    } else {
                        $(".loader-stride").hide();
                        $(".form-custom").hide();
                        $(".modal-header").show();
                        $(".messagePopUp").show();
                        $(".error-message").show();
                        $(document).on("click", ".close", function (e) {
                            location.reload();

                        });
                    }
                },
                error: function (error) {
                    $(".loader-stride").hide();
                    $(".form-custom").hide();
                    $(".modal-header").show();
                    $(".messagePopUp").show();
                    $(".error-message").show();
                    $(document).on("click", ".close", function (e) {
                        location.reload();

                    });
                },
            });
        }

    });

    $("[name='selectCity']").on("change", function () {
        $(".CityError").hide();
        $(".fNameError").hide();
        $(".lNameError").hide();
        $(".EmailError").hide();
        $(".PincodeError").hide();
        $(".QuestionError2").hide();
        $(".MessageError").hide();
        $(".EnrollError").hide();
        $(".GradeError").hide();
    });
    $("[name='firstname']").on("input", function () {
        $(".fNameError").hide();
        $(".CityError").hide();
        $(".lNameError").hide();
        $(".EmailError").hide();
        $(".PincodeError").hide();
        $(".QuestionError2").hide();
        $(".MessageError").hide();
        $(".EnrollError").hide();
        $(".GradeError").hide();
    });
    $("[name='lastname']").on("input", function () {
        $(".lNameError").hide();
        $(".CityError").hide();
        $(".fNameError").hide();
        $(".EmailError").hide();
        $(".PincodeError").hide();
        $(".QuestionError2").hide();
        $(".MessageError").hide();
        $(".EnrollError").hide();
        $(".GradeError").hide();
    });
    $("[name='email']").on("input", function () {
        $(".EmailError").hide();
        $(".CityError").hide();
        $(".fNameError").hide();
        $(".lNameError").hide();
        $(".PincodeError").hide();
        $(".QuestionError2").hide();
        $(".MessageError").hide();
        $(".EnrollError").hide();
        $(".GradeError").hide();
    });
    $("[name='zip']").on("input", function () {
        $(".PincodeError").hide();
        $(".CityError").hide();
        $(".fNameError").hide();
        $(".lNameError").hide();
        $(".EmailError").hide();
        $(".QuestionError2").hide();
        $(".MessageError").hide();
        $(".EnrollError").hide();
        $(".GradeError").hide();
    });
    $("#inlineCheckbox1").on("input", function () {
        $(".QuestionError2").hide();
        $(".CityError").hide();
        $(".fNameError").hide();
        $(".lNameError").hide();
        $(".EmailError").hide();
        $(".PincodeError").hide();
        $(".MessageError").hide();
        $(".EnrollError").hide();
        $(".GradeError").hide();
    });
    $("#inlineCheckbox2").on("input", function () {
        $(".CityError").hide();
        $(".fNameError").hide();
        $(".lNameError").hide();
        $(".EmailError").hide();
        $(".PincodeError").hide();
        $(".QuestionError2").hide();
        $(".MessageError").hide();
        $(".EnrollError").hide();
        $(".GradeError").hide();
    });
    $("#inlineCheckbox3").on("input", function () {
        $(".CityError").hide();
        $(".fNameError").hide();
        $(".lNameError").hide();
        $(".EmailError").hide();
        $(".PincodeError").hide();
        $(".QuestionError2").hide();
        $(".MessageError").hide();
        $(".EnrollError").hide();
        $(".GradeError").hide();
    });
    $("#con-message").on("input", function () {
        $(".MessageError").hide();
        $(".CityError").hide();
        $(".fNameError").hide();
        $(".lNameError").hide();
        $(".EmailError").hide();
        $(".PincodeError").hide();
        $(".QuestionError2").hide();
        $(".EnrollError").hide();
        $(".GradeError").hide();
    });


})