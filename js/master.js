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
var updateSignature = function( value ) {
    axios.get('../server/signatureGenerator.php', {
        params: {value : value}
    })
    .then(function(response) {
        $("#signature").val(response.data.signature);
        $("#referenceCode").val(response.data.reference_code);
    })
    .catch(function(error) {
        console.log(error);
    });
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
    updateSignature(20000);
    updateFollowersCount();

    /******Adding event to doubts link*******/
    $("#doubt_link").click(function(){
        $("#questions_popup").show();
        $("body").css("overflow", "hidden");
    });

    /******Adding event to doubts link*******/
    $("#questions_group_container .close_button").click(function(){
        $("#questions_popup").hide();
        $("body").css("overflow", "auto");
    });

    /*****Adding event handler to checkbox*******/
    $("#interested_check").change(function() {
        var value = 20000;
        if(this.checked) {
            value = 25000;
            updateValueDisplay(value);
            updateSignature(value);
        }
        else {
            updateValueDisplay(value);
            updateSignature(value);
        }
    });
});
