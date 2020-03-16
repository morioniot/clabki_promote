//GLOBAL VARIABLES
var currentCountrySelected;
var currentCurrencySelected;
var currentPlanSelected = "secondPlan";


var countryToCurrency =  {

    AR: "ARS",
    BO: "USD",
    CL: "CLP",
    CO: "COP",
    CR: "USD",
    CU: "USD",
    EC: "USD",
    SV: "USD",
    ES: "USD",
    GT: "USD",
    GQ: "USD",
    HN: "USD",
    MX: "MXN",
    NI: "USD",
    PA: "USD",
    PY: "USD",
    PE: "PEN",
    PR: "USD",
    DO: "USD",
    UY: "USD",
    VE: "USD"

};

var plansInformation = {

    firstPlan : {
        USD: "10",
        COP: "30000",
        MXN: "195",
        PEN: "34",
        ARS: "590",
        CLP: "8580",
        people: "3000 y 6000",
        days: "3"
    },

    secondPlan : {
        USD: "20",
        COP: "60000",
        MXN: "390",
        PEN: "68",
        ARS: "1190",
        CLP: "17100",
        people: "7000 y 14000",
        days: "5"
    },

    thirdPlan : {
        USD: "40",
        COP: "120000",
        MXN: "780",
        PEN: "135",
        ARS: "2380",
        CLP: "34300",
        people: "15000 y 30000",
        days: "7"
    }

};

//SELECTS CORRECT ACCOUNT ID ACCORDING TO COUNTRY
var selectAccountIDBasedOnCountry = function(country) {
    
    var accountId = "";

    switch(country) {
        case "CO":
            accountId = "516688";
            break;
        case "MX":
            accountId = "815599";
            break;
        case "PE":
            accountId = "835903";
            break;
        default:
            accountId = "516688";            
    }

    return accountId;
};

//DISPLAYS CASH PAYMENT NOTE ACCOERDING TO CURRENT COUNTRY
var displayCashPaymentNote = function() {
    if (currentCountrySelected === "CO")
        $("#cash_payment_note").css("display", "block");
    else
        $("#cash_payment_note").css("display", "none");
};

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
var updateSignature = function() {
    axios.get('../server/signatureGenerator.php', {
        params: {
            value : plansInformation[currentPlanSelected][currentCurrencySelected],
            country: currentCountrySelected,
            currency: currentCurrencySelected
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
    //country is different from CO
    $paymentMethodInput = $('input[name="paymentMethods"]');
    if (country !== "CO" && country !== "MX" && country !== "PE") {
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
var updatePlanDisplays = function() {
    console.log(plansInformation[currentPlanSelected]);
    var price = plansInformation[currentPlanSelected][currentCurrencySelected];
    var days = plansInformation[currentPlanSelected]["days"];
    var people = plansInformation[currentPlanSelected]["people"];
    var accountId = selectAccountIDBasedOnCountry(currentCountrySelected);

    //Form variables
    $("input[name='amount']").val(price);
    $("input[name='currency']").val(currentCurrencySelected);
    $("input[name='accountId']").val(accountId);
    //Display tags
    $(".price_explanation .currency").html(currentCurrencySelected);
    $(".price_explanation .value").html("$" + price);
    $(".price_explanation .days").html(days + " días");
    $(".price_explanation .people").html(people + " personas");
};

//SHOWS POPUP INFORMING LABORAL HOURS IF IT IS NECESSARY
var showNoWorkingHoursPopup = function() {
    $("#before_shopping_popup").css("display", "flex");
    $("body").css("overflow", "hidden");
    return true;
};

// SENDING DATA TO SAVE IN DB
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
                    fbq('track', 'CompleteRegistration');
                    if (!showNoWorkingHoursPopup())                
                        $("#join_us_form").submit();                   
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

//CREATING SLIDE NODE
var createSlide = function( slideInfo ) {

    //Creating name element
    var nameElement = $('<span/>', {class:'reviewer_name'});
    nameElement.text(slideInfo.reviewer_name.toUpperCase());

    //Creating country image
    var countriesImagesRoute = './img/common/countries/';
    var countryImage =
        $('<img/>', {src: countriesImagesRoute + slideInfo.reviewer_country});

    //Cretaing identity element (name + country)
    var identityContainer = $('<div/>', {class:'identity_container'});
    nameElement.appendTo(identityContainer);
    countryImage.appendTo(identityContainer);

    //Creating avaliation element
    if(slideInfo.review_rating !== undefined) {
        var avaliationContainer = $('<div/>', {class: 'stars_container'});
        var starsCount = slideInfo.review_rating;
        for(var i = 1; i <= 5; i++) {
            var star = $('<span/>', {class:'star'});
            if(i <= starsCount)
                star.addClass('full');
            star.appendTo(avaliationContainer);
        }
    }
    else {
        var avaliationContainer = $('<div/>', {class: 'emotic_container'});
        //Adding 'positive' or 'negative' class according to recommendation type
        avaliationContainer.addClass( slideInfo.recommendation_type );
    }


    //Creating date element
    var dateContainer = $('<span/>', {class:'review_date'});
    dateContainer.text(slideInfo.display_date);

    //Crating review text element
    var textContainer = $('<p/>', {class:'review_text'});
    textContainer.text(slideInfo.review_text);

    //Creating link element
    var linkContainer = $('<a/>', {
        class: 'review_link',
        target: '_blank',
        href: slideInfo.review_link
    });
    linkContainer.text('Ver en Facebook');

    //Creting full data element (contains all the previous elements)
    var fullDataContainer = $('<article/>', {class:'review_data'});
    identityContainer.appendTo(fullDataContainer);
    avaliationContainer.appendTo(fullDataContainer);
    dateContainer.appendTo(fullDataContainer);
    textContainer.appendTo(fullDataContainer);
    linkContainer.appendTo(fullDataContainer);

    //Creating slide background image
    var imagesRoute = './img/common/reviews/';
    var slideBackgroundImage =
        $('<img/>', {src: imagesRoute + slideInfo.reviewer_picture});

    //Creating background veil
    var backgroundVeil = $('<div/>', {class:'slide_veil'});

    //Creating full Slide
    var slide = $('<li/>', {class: 'slide'});
    slideBackgroundImage.appendTo(slide);
    backgroundVeil.appendTo(slide);
    fullDataContainer.appendTo(slide);
    return slide;

};

//SLIDER OBJECT DEFINITION
var ReviewsSlider = function() {

    var sliderBand = $('#slider_band');
    var leftArrow = $('#left_arrow');
    var rightArrow = $('#right_arrow');

    var currentSlide;
    var slidesCount;
    var movementDirection;
    var slideChangeTime;
    var intervalId;

    var updateArrowsState = function() {

        //Checking left arrow state
        if(currentSlide > 1)
            leftArrow.removeClass('disabled');
        else
            leftArrow.addClass('disabled');

        //Checking right arrow state
        if(currentSlide < slidesCount)
            rightArrow.removeClass('disabled');
        else
            rightArrow.addClass('disabled');
    };

    var goToCurrentSlide = function() {
        sliderBand.css('left', '-' + (currentSlide - 1) * 100 + '%');
    };

    var goToNext = function() {
        if(currentSlide < slidesCount) {
            ++currentSlide;
            goToCurrentSlide();
            updateArrowsState();
        }
    };

    var goToPrevious = function() {
        if(currentSlide > 1) {
            --currentSlide;
            goToCurrentSlide();
            updateArrowsState();
        }
    };

    var moveAutomatically = function() {
        if(movementDirection === 'next') {
            if(currentSlide === slidesCount - 1)
                movementDirection = 'previous';
            goToNext();
        }
        else {
            if(currentSlide === 2)
                movementDirection = 'next';
            goToPrevious();
        }
    };

    var setSliderTiming = function(time) {
        slideChangeTime = time;
        activateAutomaticChange();
    };

    var activateAutomaticChange =  function() {
        sliderBand.css('transition', 'left 1s ease-out');
        intervalId = setInterval(moveAutomatically, slideChangeTime);
    };

    var deactivateAutomaticChange = function() {
        sliderBand.css('transition', 'none');
        clearInterval(intervalId);
    };

    var configureSwipeAndPan = function() {

        var sliderBandLeftPosition;
        var slideWidth = sliderBand.width() / slidesCount;
        var sliderManager = new Hammer.Manager($('#slider_touch')[0], {touchAction: 'pan-y'});
        var pan = new Hammer.Pan({threshold: 1, pointers: 0});
        var press = new Hammer.Press();
        sliderManager.add(pan);
        sliderManager.add(press);

        //Configuring press gesture
        sliderManager.on('press', function(e) {
            deactivateAutomaticChange();
        });

        sliderManager.on('pressup', function(e) {
            activateAutomaticChange();
        });

        //Start of the pan gesture
        sliderManager.on('panstart', function(e) {
            sliderBandLeftPosition = sliderBand.position().left;
            deactivateAutomaticChange();
        });

        //While the pan gesture is happening
        sliderManager.on('panleft panright', function(e) {
            sliderBand.css('left', sliderBandLeftPosition + e.deltaX);
        });

        //End of the pan gesture
        sliderManager.on('panend', function(e) {
            var limit = sliderBand.width() - (1.5 * slideWidth);
            var currentBandDisplacement = sliderBand.position().left * -1;
            //The user is trying to move to a slide after the last one
            if(currentBandDisplacement > limit)
                currentSlide = slidesCount;
            //The user is trying to move to a slide before the first one
            else if(currentBandDisplacement < 0) {
                currentSlide = 1;
            }
            else{
                //Computes how much the band was moved and adds one half more
                var displacementRate = (currentBandDisplacement/slideWidth) + (1/2);
                currentSlide = Math.ceil(displacementRate);
            }
            goToCurrentSlide();
            updateArrowsState();
            activateAutomaticChange();
        });
    };

    var initialize = function( slidesList ) {

        //Updating number of slides and current slide
        currentSlide = 1;
        slidesCount = slidesList.length;

        //Setting slider styles based on number of slides
        sliderBand.css('width', (slidesCount * 100) + '%');
        var slideWidth = 'calc(100%/' + slidesCount + ')';

        //Creating DOM element for each slide and appending them to the slider
        for(var i = 0; i < slidesCount; i++) {
            var slide = createSlide(slidesList[i]);
            slide.css('width', slideWidth);
            slide.appendTo(sliderBand);
        }

        //Allocating handlers for each arrow
        leftArrow.on('click', goToPrevious);
        rightArrow.on('click', goToNext);

        //Setting initial position of the slider
        goToCurrentSlide();
        updateArrowsState();
        movementDirection = 'next';

        //Enabling pan gesture
        configureSwipeAndPan();
    };

    return {
        initialize: initialize,
        setSliderTiming: setSliderTiming
    };
};

//GETS TOKEN FROM URL
var getTokenFromURL =  function() {
    var paramsList = location.search;
    var token = paramsList.substring(paramsList.indexOf('=') + 1);
    if(token !== '') return token;
    return false;
};

//SAVES IN DB ACCESS TO THE DOUBTS POPUP
var updateDoubtsPopupAccess = function() {
    var token = getTokenFromURL();
    if(token) {
        axios.post('../server/processDoubtsAccess.php', Qs.stringify({token: token}))
        .then(function(response) {
            if(response.data.error != undefined && !response.data.error) {
            }
            else {
                console.log(response.data.error);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }
};

//SAVES NEW ACCES TO THE PAGE USING TRACKING CODE
var updateAccessCount = function() {
    var token = getTokenFromURL();
    if(token) {
        axios.get('../server/countNewAccess.php', {
            params: {token : token},
            responseType: 'json'
        })
        .then(function(response) {
            if(!response.data.error)
                console.log("OK")
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}

//SCROLL FUNCTION (taken from github/benjamincharity/6058688)
var smoothScroll = function(el, to, duration) {
    if (duration < 0) {
        return;
    }
    var difference = to - $(window).scrollTop();
    var perTick = difference / duration * 10;
    this.scrollToTimerCache = setTimeout(function() {
        if (!isNaN(parseInt(perTick, 10))) {
            window.scrollTo(0, $(window).scrollTop() + perTick);
            smoothScroll(el, to, duration - 10);
        }
    }.bind(this), 10);
};

//IDENTIFIES MOBILE BROWSERS (regex taken from http://detectmobilebrowsers.com/)
var mobilecheck = function () {
    var check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

$(document).ready(function() {

    updateFollowersCount();

    /******Adding event to doubts link and button*******/
    $("#doubt_link, .doubts_button").click(function(){
        $("#questions_popup").css("display", "flex");
        $("body").css("overflow", "hidden");
        fbq('track', 'ViewContent', {
            content_type: 'doubts',
        });
        updateDoubtsPopupAccess();
    });

    /******Adding event to doubts link*******/
    $("#questions_group_container .close_button").click(function(){
        $("#questions_popup").css("display", "none");
        $("body").css("overflow", "auto");
    });

    /******Adding event to shopping popup close and later buttons*******/
    $("#before_shopping_popup .later_button, #before_shopping_popup .close_button")
        .click(function () {
            $("#before_shopping_popup").css("display", "none");
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
        currentCountrySelected = $option.find(".option").attr("id");
        currentCurrencySelected = countryToCurrency[currentCountrySelected];
        $(".dropdown dt").html(optionContent);
        $(".dropdown dd ul").hide();
        $("#country_selector").val(currentCountrySelected);
        updatePaymentMethodVariable( currentCountrySelected );
        updatePlanDisplays();
        updateSignature();
        displayCashPaymentNote();
    });

    //Hides options if another part of the page is clicked
    $(document).bind("click", function(e) {
        var $clicked = $(e.target);
        if(!$clicked.parents().hasClass("dropdown"))
            $(".dropdown dd ul").hide();
    });

    /*********Creating functionality of fafe plan options**********/
    //Adding events to radio buttons changes
    $("input[name='plan']").on("change", function() {
        var $selection = $(this);
        currentPlanSelected = $selection.attr("data-plan");
        updatePlanDisplays();
        updateSignature();
    });

    //Adding handlers to click events in fake buttons
    $(".option_button").click(function(){
        var $buttonPressed = $(this);
        var selectedReference = $buttonPressed.attr("data-reference");
        var $optionSelected = $("input[value='" + selectedReference + "']");
        $(".option_button").removeClass("selected");
        $buttonPressed.addClass("selected");
        $optionSelected.prop("checked", true);
        $optionSelected.trigger("change");
    });

    /*********Creating and initializing reviews slider*******/
    var reviewsSlider = ReviewsSlider();
    axios.get('../json/final_ratings.json', {responseType: 'json'})
    .then(function(response) {
        reviewsSlider.initialize(response.data);
        reviewsSlider.setSliderTiming(10000);
    })
    .catch(function(error) {
        console.log(error);
    });

    /**********Adding scroll event to the contact link in cash payment note ********/
    $("#cash_payment_note a").on('click', function(e) {
        e.preventDefault();
        smoothScroll($(window), $('footer').offset().top, 500);
    });

    /**********Tracking of users by code (timer used to avoid misscounts)*********/
    setTimeout(updateAccessCount, 8000)

    /******Changing page depending on accessing country*******/
    /*Exmaple: country, cash payment note (only for Colombia)*/
    axios.get('https://ipapi.co/json/', {responseType: 'json'})
    .then(function(response) {

        if(countryToCurrency.hasOwnProperty(response.data.country)) {
            currentCountrySelected = response.data.country;
            currentCurrencySelected = countryToCurrency[currentCountrySelected];
            $(".dropdown dd ul .option#" + currentCountrySelected).trigger("click");
        }
        else {
            /*This country is selected when the accessing country
            is not in the selection list*/
            currentCountrySelected = "CU";
            currentCurrencySelected = countryToCurrency[currentCountrySelected];
            updatePlanDisplays();
        }

    })
    .catch(function(error) {
        /*This country is selected when the accessing country
        is not in the selection list*/
        currentCountrySelected = "CU";
        currentCurrencySelected = countryToCurrency[currentCountrySelected];
        updatePlanDisplays();
        console.log(error);
    });
});
