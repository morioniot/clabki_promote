//GLOBAL VARIABLES
var currentCountrySelected;
var currentCurrencySelected;
var currentPlanSelected = "basicPlan";


var countryToCurrency =  {
    
    AR: "USD",
    BO: "USD",
    CL: "USD",
    CO: "COP",
    CR: "USD",
    CU: "USD",
    EC: "USD",
    SV: "USD",
    ES: "USD",
    GT: "USD",
    GQ: "USD",
    HN: "USD",
    MX: "USD",
    NI: "USD",
    PA: "USD",
    PY: "USD",
    PE: "USD",
    PR: "USD",
    DO: "USD",
    UY: "USD",
    VE: "USD"

};

var plansInformation = {

    basicPlan : {
        USD: "9",
        COP: "25000",
        peoplePerDay: "1000",
        days: "3"
    },

    morePeople : {
        USD: "15",
        COP: "40000",
        peoplePerDay: "2000",
        days: "3"
    },

    moreDays : {
        USD: "17",
        COP: "45000",
        peoplePerDay: "1000",
        days: "7"
    }

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
    if(country !== "CO") {
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
    var people = plansInformation[currentPlanSelected]["peoplePerDay"];

    //Form variables
    $("input[name='amount']").val(price);
    $("input[name='currency']").val(currentCurrencySelected);
    //Display tags
    $(".price_explanation .currency").html(currentCurrencySelected);
    $(".price_explanation .value").html("$" + price);
    $(".price_explanation .days").html(days + " días");
    $(".price_explanation .people").html(people + " personas");
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

    //Creating stars element
    var starsContainer = $('<div/>', {class: 'stars_container'});
    var starsCount = slideInfo.review_rating;
    for(var i = 1; i <= 5; i++) {
        var star = $('<span/>', {class:'star'});
        if(i <= starsCount)
            star.addClass('full');
        star.appendTo(starsContainer);
    }

    //Creating date element
    var dateContainer = $('<span/>', {class:'review_date'});
    var date = moment(slideInfo.review_date, moment.ISO_8601);
    dateContainer.text(date.format('DD/MM/YYYY'));

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
    starsContainer.appendTo(fullDataContainer);
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
            if(currentBandDisplacement > limit)
                currentSlide = slidesCount;
            else {
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

$(document).ready(function() {

    updateFollowersCount();

    /******Adding event to doubts link and button*******/
    $("#doubt_link, .doubts_button").click(function(){
        $("#questions_popup").css("display", "flex");
        $("body").css("overflow", "hidden");
        updateDoubtsPopupAccess();
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
        currentCountrySelected = $option.find(".option").attr("id");
        currentCurrencySelected = countryToCurrency[currentCountrySelected];
        $(".dropdown dt").html(optionContent);
        $(".dropdown dd ul").hide();
        $("#country_selector").val(currentCountrySelected);
        updatePaymentMethodVariable( currentCountrySelected );
        updatePlanDisplays();
        updateSignature();
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

    /**********Tracking of users by code (timer used to avoid misscounts)*********/
    setTimeout(updateAccessCount, 8000)

    /******Changing currency depending on accessing country*******/
    axios.get('https://ipapi.co/json/', {responseType: 'json'})
    .then(function(response) {        
        
        if(countryToCurrency.hasOwnProperty(response.data.country)) {
            currentCountrySelected = response.data.country;
            currentCurrencySelected = countryToCurrency[currentCountrySelected];
            $(".dropdown dd ul .option#" + currentCountrySelected).trigger("click");
        }
        else {
            currentCountrySelected = "MX";
            currentCurrencySelected = countryToCurrency[currentCountrySelected];
            updatePlanDisplays();            
        }

    })
    .catch(function(error) {
        currentCountrySelected = "MX";
        currentCurrencySelected = countryToCurrency[currentCountrySelected];
        updatePlanDisplays();        
        console.log(error);
    });
});
