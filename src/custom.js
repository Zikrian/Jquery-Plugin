var mainslider;
var sliding = false;

$(document).ready(function () {
    var options = {
        slides: ".slide", // Nama slide di slidecontainer
        swipe: false, // handler swipe, wajib include touchSwipe
        transition: "slide", // Transisi slide => slide dan fade
        slideTracker: true, // menambah pelacakan slide
        slideTrackerID: "slideposition", // Nama pelacakan slide
        slideOnInterval: false, // Interval slide
        interval: 9000, // Interval slide, jika slideOnInterval is enabled/true
        animateDuration: 1000, // Durasi animasi
        animationEasing: "ease", // Nilai yang diterima: linear ease in out in-out snap easeOutCubic
        // easeInOutCubic easeInCirc easeOutCirc easeInOutCirc easeInExpo easeOutExpo
        // easeInOutExpo easeInQuad easeInOutQuad easeInQuart easeOutQuart
        // easeInOutQuart easeInQuint easeOutQuint easeInOutQuint easeInSine easeOutSine
        //easeInOutSine easeInBack easeOutBack easeInOutBack
        pauseOnHover: false, // Pause jika user mengarahkan kursor ke slide container
        magneticSwipe: true, // efek menempel pada slide ketika swipping/dragging
        neverEnding: true, // aktifkan untuk membuat efek yang tidak pernah berhenti/neverending.
    };

    $(".slider").simpleSlider(options);
    mainslider = $(".slider").data("simpleslider");
    // That's all

    $(".slider").on("beforeSliding", function (event) {
        var prevSlide = event.prevSlide;
        var newSlide = event.newSlide;
        $(
            ".slider .slide[data-index='" + prevSlide + "'] .slidecontent"
        ).fadeOut();
        $(".slider .slide[data-index='" + newSlide + "'] .slidecontent").hide();
        sliding = true;
    });

    $(".slider").on("afterSliding", function (event) {
        var prevSlide = event.prevSlide;
        var newSlide = event.newSlide;
        $(
            ".slider .slide[data-index='" + newSlide + "'] .slidecontent"
        ).fadeIn();
        sliding = false;
    });

    // Control the slider by scrolling
    $(window).bind("mousewheel", function (event) {
        if (!sliding) {
            if (event.originalEvent.deltaY > 0) {
                mainslider.nextSlide();
            } else {
                mainslider.prevSlide();
            }
        }
    });

    //  Control the slider automatic
    showSlides();

    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("slide");
        for (i = 1; i < slides.length; i++) {
            mainslider.nextSlide();
        }
        setTimeout(showSlides, 20000);
    }

    $(".slide#satu").backstretch("../images/image1.png");
    $(".slide#dua").backstretch("../images/image2.png");
    $(".slide#tiga").backstretch("../images/image3.png");
    $(".slide#empat").backstretch("../images/image4.png");
    $(".slide#lima").backstretch("../images/image5.png");
    $(".slide#enam").backstretch("../images/image6.png");

    $(".slide .backstretch img").on("dragstart", function (event) {
        event.preventDefault();
    });

    $(".slidecontent").each(function () {
        $(this).css("margin-top", -$(this).height() / 2);
    });
});