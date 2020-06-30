(function($, document, undefined) {
  
    $.fn.BBSlider = function(options) {
      var settings = $.extend({
          dotClass: "bb-dot",
          slideClass: "bb-slide",
          activeClass: "bb-active",
          autoPlay: false,
          slideDuration: 3000
        },
        options
      );
  
      var dotSelector = "." + settings.dotClass;
      var slideSelector = "." + settings.slideClass;
      var activeClass = settings.activeClass;
      var autoPlay = settings.autoPlay;
      var slideDuration = settings.slideDuration;
      var nextSlide = 0;
  
      var $dots = this.find(dotSelector);
      var $slides = this.find(slideSelector);
      var slideCount = $slides.length;
      var timeOutId = null;
  
      function moveTo(i) {
        
        if (timeOutId) {
          clearTimeout(timeOutId);
        }
        
        $slides.each(function(slideIndex, slide) {
          $(this).removeClass(activeClass);
          if (i === slideIndex) {
            $(this).addClass(activeClass);
          }
        });
  
        $dots.each(function(dotIndex, dot) {
          $(this).removeClass(activeClass);
          if (i === dotIndex) {
            $(this).addClass(activeClass);
          }
        });
  
        if (autoPlay) {
          var nextSlide = (i + 1) % slideCount;
          timeOutId = setTimeout(function() {
            moveTo(nextSlide);
          }, slideDuration);
        }
        
      }
  
      // Initializing
      moveTo(0);
  
      $dots.each(function(i, dot) {
        
        nextSlide = i;
        $(dot).click(
          (function(moveToSlide) {
            return function() {
              moveTo(moveToSlide);
            };
          })(nextSlide)
        );
      });
      
    };
    
  })(window.jQuery, window.document);