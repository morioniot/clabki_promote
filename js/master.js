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
    var nameContainer = $('<span/>', {class:'reviewer_name'});
    nameContainer.text(slideInfo.reviewer_name.toUpperCase());

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
    nameContainer.appendTo(fullDataContainer);
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

    var currentSlide;;
    var slidesCount;
    var movementDirection;

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
        setInterval(moveAutomatically, time);
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
    };

    return {
        initialize: initialize,
        setSliderTiming: setSliderTiming
    };
};

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

    //Creating and initializing reviews slider
    var reviewsSlider = ReviewsSlider();
    axios.get('../json/ratings.json', {responseType: 'json'})
    .then(function(response) {
        reviewsSlider.initialize(response.data);
        reviewsSlider.setSliderTiming(8500);
    })
    .catch(function(error) {
        console.log(error);
    });

});
