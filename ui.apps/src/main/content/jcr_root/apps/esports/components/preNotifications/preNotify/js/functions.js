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
    // if (flag != "true") {
    //     $(".gdprOld").css("display", "block");
    //     $(".gdpr-updated").css("display", "none");
    // }

    $(".btn-light-soft").click(function () {
        if (flag != "true") {
            document.cookie = "flag=true; path=/; expires=" + myDate.toGMTString() + ";";
            // if ($(".gdpr-updated").hasClass("disc-custom-builder") && flag != "true") {
            //     window.location.href = window.location.href;
            //     // $(".gdprOld").children(".accept-cookies").css("display", "none");
            //     // $(".gdprOld").css("display", "block");
            //     // $(".gdpr-updated").css("display", "block");
            //     // $("#gdprDiv").show();
            //     // $(".activeBtn").attr("href", "#");
            // }

            // else if ($(".gdpr-updated").hasClass("disc-custom-builder") && flag === "true") {
            //     $(".gdprOld").children(".accept-cookies").css("display", "none");
            //     $(".gdprOld").css("display", "block");
            //     $("#gdprDiv").show();
            //     $(".activeBtn").attr("href", "#");
            //     document.cookie = "customeBuilderFlag=true; path=/; expires=" + myDate.toGMTString() + ";"
            // } else if ($("#gdprDiv").length < 0) {
            //     $(".activeBtn").attr("href", "#");
            // }
        } else {
            // if ($(".gdpr-updated").hasClass("disc-custom-builder") && flag === "true") {
            //     $(".gdprOld").children(".accept-cookies").css("display", "none");
            //     $(".gdprOld").css("display", "block");
            //     $("#gdprDiv").show();
            //     $(".activeBtn").attr("href", "#");
            // }
            document.cookie = "customeBuilderFlag=true; path=/; expires=" + myDate.toGMTString() + ";"

            // else if ($(".gdpr-updated").hasClass("disc-custom-builder") && flag != "true") {
            //     $(".gdprOld").children(".accept-cookies").css("display", "none");
            //     $(".gdprOld").css("display", "block");
            //     $(".gdpr-updated").css("display", "block");
            //     $("#gdprDiv").show();
            //     $(".activeBtn").attr("href", "#");
            // }
        }

    });

    // if ($(".gdpr-lang-selector").length) {
    //     $(".accept-cookies").hide();
    //     $("#customGDPR").hide();
    //     $("#customGDPR1").hide();
    // } else {
    //     $("#cta-1").hide();
    //     $("#gdprDiv").hide();
    // }

    // if (flag === "true" && customeBuilderFlag != "true" && $(".gdpr-updated").hasClass("disc-custom-builder")) {
    //     $(".gdpr-updated").css("display", "block");
    //     $(".gdprOld").children(".accept-cookies").css("display", "none");
    //     $(".gdprOld").css("display", "block");
    //     $("#gdprDiv").show();
    // }
    // if (flag != "true" && customeBuilderFlag != "true" && $(".gdpr-updated").hasClass("disc-custom-builder")) {
    //     $(".activeBtn").attr("href", "javascript:void(0);");
    // }
    /*  $(".buttonClick").each(function() {
          const reHeader = $(".re-master");
          let defaultCountryCode = reHeader.attr("data-langcountry");
          let values=defaultCountryCode.split('_');
          let two=values[1];
          let updatedLanguage = two.toUpperCase();
          let classAvail = $(this).hasClass(updatedLanguage);
          console.log(classAvail);
          if(classAvail == true){
              $(this).addClass("active-border-red");
          }
      });*/
    // $(".buttonClick").click(function () {
    //     let heading = $(this).attr("data-heading");
    //     let description = $(this).attr("data-description");
    //     let ctaText = $(this).attr("data-ctaText");
    //     let ctaLink = $(this).attr("data-ctaLink");
    //     $("#head1").html(heading);
    //     $("#descr-1").html(description);
    //     $("#cta-1").html(ctaText);
    //     $("#cta-1").attr("href", ctaLink);
    //     $(".accept-cookies").show();
    //     $(".buttonClick").removeClass("active-border-red");
    //     $(this).addClass("active-border-red");
    // });


});
/*GDPR [END]*/