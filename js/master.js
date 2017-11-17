//ASKING FOR FOLLOWERS NUMBER
var updateFollowersCount = function() {
    console.log('Actualizando contador');
    axios('../server/getFollowers.php')
    .then(function(response) {
        $("#followers_count").html(response.data.fan_count);
    }).
    catch(function(error) {
        console.log(error);
    });
};

//UPDATE SIGNATURE
var updateSignature = function() {
    axios('../server/signatureGenerator.php')
    .then(function(response) {
        $("#signature").val(response.data.signature);
        $("#referenceCode").val(response.data.reference_code);
    })
    .catch(function(error) {
        console.log(error);
    });
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
            var config = {paramsSerializer: function(params) {
                return qs.stringify(params);
            }};
            parametersArray.forEach(function(parameterObject) {
                parameters[parameterObject['name']] = parameterObject['value'];
            });
            console.log(parameters);
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

window.onload = function() {
    updateSignature();
    updateFollowersCount();
    FB.Event.subscribe('xfbml.render', function() {
        console.log('entrando al render inicial');
        FB.Event.subscribe('edge.create', function(response) {
            updateFollowersCount();
        });
        FB.Event.subscribe('edge.remove', function(response) {
            updateFollowersCount();
        });
    });
};
