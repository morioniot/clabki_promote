//ASKING FOR FOLLOWERS NUMBER
var updateFollowersCount = function() {
    axios('../server/getFollowers.php')
    .then(function(response) {
        $("#followers_count").html(response.data.fan_count);
    }).
    catch(function(error) {
        console.log(error);
    });
};

//UPDATE SIGNATURE
var updateSignature = function(value, country) {
    axios.get('../server/signatureGenerator.php', {
        params: {
            value : value,
            country: country
        }
    })
    .then(function(response) {
        $("#signature").val(response.data.signature);
        $("#referenceCode").val(response.data.reference_code);
    })
    .catch(function(error) {
        console.log(error);
    });
};

//UPDATES THE FORM TO INCLUDE OR NOT THE PAYMENT METHOD VARIABLE
var updatePaymentMethodVariable = function( country ) {
    //The payment method variable is updated only if the
    //country is different from COL
    $paymentMethodInput = $('input[name="paymentMethods"]');
    if(country !== "COL") {
        if(!($paymentMethodInput.length > 0)) {
            $("<input>")
            .attr("name", "paymentMethods")
            .attr("type", "hidden")
            .val("VISA,MASTERCARD,DINERS,AMEX")
            .appendTo("#form_fields_container");
        }
    }
    else {
        if($paymentMethodInput.length > 0)
            $paymentMethodInput.remove();
    }
};

//UPDATE VALUE DISPLAY (IN FORM)
var updateValueDisplay = function(value) {
    $("#payment_amount").val(value);
    $("#value_display").html("$" + value);
};

// SENDIND DATA TO SAVE IN DB
var itWasRegistered = false;
$("#join_us_form").on('submit', function( event ) {

    if(!itWasRegistered) {

        event.preventDefault();
        var isReadyToSend = true;
        $('.required').each(function() {
            if ($(this).val().replace(/\s+/g, '') === ''){
                isReadyToSend = false;
            }
        });

        if(isReadyToSend){
            var parametersArray = $("#join_us_form").serializeArray();
            var parameters = {};
            parametersArray.forEach(function(parameterObject) {
                parameters[parameterObject['name']] = parameterObject['value'];
            });
            axios.post('../server/register.php', Qs.stringify(parameters))
            .then(function(response) {
                if(response.data.error != undefined && !response.data.error) {
                    itWasRegistered = true;
                    $('#join_us_form').submit();
                }
                else {
                    console.log(response.data.error);
                    console.log(response.data);
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        }
        else{
            console.log("Por favor verifique que todos los campos hayan sido diligenciados");
        }
    }
});

$(document).ready(function() {

    updateFollowersCount();

    /******Adding event to doubts link*******/
    $("#doubt_link").click(function(){
        $("#questions_popup").css("display", "flex");
        $("body").css("overflow", "hidden");
    });

    /******Adding event to doubts link*******/
    $("#questions_group_container .close_button").click(function(){
        $("#questions_popup").css("display", "none");
        $("body").css("overflow", "auto");
    });

    /*****Creating functionality of fake select******/
    //Toggle options when "select" is clicked
    $(".dropdown dt").click(function() {
        var $selectList = $(".dropdown dd ul");
        $selectList.toggle();
    });

    //Select option clicked and hides options
    $(".dropdown dd ul li").click(function(){
        var $option = $(this);
        var optionContent = $option.html();
        var selectedCountry = $option.find(".option").attr("id");
        $(".dropdown dt").html(optionContent);
        $(".dropdown dd ul").hide();
        $("#country_selector").val(selectedCountry);
        updateSignature(12, selectedCountry);
        updatePaymentMethodVariable( selectedCountry );
    });

    //Hides options if another part of the page is clicked
    $(document).bind("click", function(e) {
        var $clicked = $(e.target);
        if(!$clicked.parents().hasClass("dropdown"))
            $(".dropdown dd ul").hide();
    });
});
