(function($) {
  'use strict';

/*=================================================
function
=================================================*/

  // platform detect

  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  var isIE9;
  
  function _platformDetect() {
    var $html= $('html');
    if ($html.hasClass('ie9')) isIE9 = true;
  }

  // preloader
  function _preloader() {

    $('#preloader-img').fadeOut(__preloaderFadeOut);
    $('#preloader').delay(__preloaderDelay).fadeOut(__preloaderFadeOut);

  }

  // element height
  function _setHeight() {

    var vH = $(window).height();
    var $introWrapper = $('.intro-wrapper');
    var introWrapperHeight = $introWrapper.height();
    var introWrapperMargin = (vH - introWrapperHeight) / 2;

    $('#intro').css('height', vH);
    $introWrapper.css({'margin-top' : introWrapperMargin});

  }

  // smooth scroll
  function _smoothScroll() {

    var platform = navigator.platform.toLowerCase();
    if (platform.indexOf('win') == 0 || platform.indexOf('linux') == 0) {
      $.srSmoothscroll({
        step: 100,
        speed: 110,
        ease: 'easeOutCubic',
        target: $('body'),
        container: $(window)
      });
    }

  }

  // scroll to element
  function _scrollTo() {

    $('a[href^="#"]').on('click',function(e) {
      var target = this.hash;
      var $target = $(target);
      e.preventDefault();

      if (target.length && $(this).attr("href") != '#intro') {
        $('html, body').stop().animate({
          'scrollTop': $target.offset().top
        },  __scrollToSpeed, __scrollToEase, function() {
          window.location.hash = target;
        });
      } else if (target.length && $(this).attr("href") == '#intro') {
        $("html, body").stop().animate({
          scrollTop: 0
        }, __scrollToSpeed, __scrollToEase, function() {
          window.location.hash = target;
        });
      }
    });

  }

  // header and overlay style
  function _headerStyleToggle() {

    if (__imageHeader) {
      _heroHeader();
      _imageHeader();
    } else if (__videoHeader) {
      _videoHeader();
    } else if (__slideshowHeader) {
      _vegas();
    }
    if (__gradient) {
      $('.overlay').addClass('gradient');
    }

  }

  // image set for slideshow
  var slideShowImageSet = [];
  for (var i = 1; i <= __imageNumber; i++) {
    slideShowImageSet.push('img/header/slideshow-' + (i < 10 ? '0' + i : i) + '.jpg');
  }

  // vegas slideshow
  function _vegas() {
    var vegasImageSet = slideShowImageSet.map(function(val) {
      return {'src' : val};
    });
    $('#intro').vegas({
      preload: true,
      timer: false,
      shuffle: __vegasShuffle,
      delay: __vegasDelay,
      transitionDuration: __vegasTransitionDuration,
      animationDuration: __vegasAnimationDuration,
      slides: vegasImageSet,
      animation: __vegasAnimation,
      transition: __vegasTransition
    });
  }
  
  // image background header
  function _imageHeader() {
    $("#intro").backstretch("img/header/static.jpg"); // replace the image with same file name
  }

  // youtube video background header
  function _videoHeader() {
    var $intro = $('#intro');
    if (isMobile) {
      $intro.backstretch('img/header/video-mobile.jpg'); // disable video background on mobile, set a background image for them
    }
    else {
      var $bgVideo = $('#bg-video');
      var $volume = $('#volume');

      $intro.backstretch('img/header/video.jpg'); // before video start, set a background image for desktop too
      $bgVideo.attr('data-property', "{videoURL: __youtubeUrl, showControls: false, autoPlay: true, loop: true, mute: __videoMute, startAt: __videoStartTime, stopAt: __videoEndTime, quality: 'default', containment: '#intro'}");
      $bgVideo.YTPlayer();
      
      if (__videoMute) {
        $volume.addClass('fa-volume-off');
      } else {
        $volume.addClass('fa-volume-up');
      }
      $('#video-control').show();
      $('#play').on('click', function() {
        var $this = $(this);
        $this.toggleClass('fa-play fa-pause', function() {
          ($this.hasClass('fa-play')) ? $bgVideo.pauseYTP() : $bgVideo.playYTP();
        });
      });
      
      $volume.on('click', function() {
        var $this = $(this);
        $this.toggleClass('fa-volume-off fa-volume-up', function() {
          ($this.hasClass('fa-volume-off')) ? $bgVideo.muteYTPVolume() : $bgVideo.unmuteYTPVolume();
        });
      });
    }
  }

  // hero header
  function _heroHeader() {
    $(window).on('scroll', function() {
      if (!isMobile) {
        var st = $(document).scrollTop();
        var $intro = $('#intro');
        var introHeight = $intro.height();
        var parallaxStart = 0;
        var parallaxUntil = introHeight;
        var top = 0;
        if (__parallaxHeader) {
          if (st <= parallaxStart) {
            top = 0;
          } else if (st <= parallaxUntil ) {
            top = 0 + (st / parallaxUntil) * 450;
          }
          $intro.css('top', top);
        }
      }
    });
  }

  // menu
  function _menu() {
    var $navToggle = $('.nav-toggle');
    var $menuIcon = $(".menu-icon");
    var $menuIconA = $navToggle.add($menuIcon);
    $menuIconA.tooltip({placement: 'left'}); // tooltip
    $menuIconA.on('click', function(e) {
      e.preventDefault();
      $(this).blur(); // focus fadeout tooltip on click
      if ($navToggle.hasClass('nav-close')) {
        $navToggle.removeClass('nav-close').addClass('nav-open');
        $navToggle.find('i').removeClass('fa-navicon').addClass('fa-close');
        $menuIcon.each(function(i) {
          $(this).stop(true).delay((i++) * 50).fadeTo(300, 1);
        });
      } else if ($navToggle.hasClass('nav-open')) {
        $navToggle.removeClass('nav-open').addClass('nav-close');
        $($menuIcon.get().reverse()).each(function(i) {
          $(this).stop(true).delay((i++) * 50).fadeTo(300, 0, function() {
            $(this).hide();
          });
        });
      }
      return false;
    });
  }

  // countdown
  function _countdown() {
    if (__countdown) {
      var $countdown = $('#countdown');
      var countdownDate = __countdownDate;
      $countdown.countdown({
        until: countdownDate,
        timezone: __countdownTimezone,
        fomat: 'dHMS',
        significant: 1,
        padZeroes: true,
        description: '<br>' + __countdownDesc
      })
    } else {
      $('.countdown-wrapper').remove();
    }
  }

  // owl carousel
  function _owlCarousel() {

    $('#text-rotate').owlCarousel({
      singleItem: true,
      autoPlay: __owlDelayText,
      stopOnHover: false,
      pagination: false,
      autoHeight: true
    });

    $('.img-carousel').owlCarousel({
      singleItem: true,
      autoPlay: __owlDelayImg,
      stopOnHover: true,
      addClassActive: true,
      pagination: false,
      navigation: true,
      navigationText: [
        '<i class="fa fa-angle-left"></i>',
        '<i class="fa fa-angle-right"></i>'
        ],
      autoHeight: true
    });

  }

  // lightbox
  function _lightbox() {
    $('.img-carousel').each(function() {
      $(this).magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
          enabled: true,
          navigateByImgClick: true
        },
        image: {
          tError: '<a href="%url%">The image #%curr%</a> could not be loaded.', // error message
          titleSrc: 'title'
        },
        zoom: {
          enabled: true,
          duration: 300 // zoom duration time
        }
      });
    });
  }

  // validation email address
  function _formValidation(emailAddress) {
    var emailRegex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return emailRegex.test(emailAddress);
  }

  // mailchimp
  function _mailChimp() {
    var $form = $("#subscribe-form");
    var $formNotice = $form.find('.form-notice');
    var $subscribeNotice = $form.find('.subscribe-notice');
    var $subscribeEmail = $('#subscribe-email');
    $form.ajaxChimp({
      callback: _mailChimpStatus,
      language: "eng",
      type: "POST",
      url: mailChimpUrl
    });
    function _mailChimpStatus (resp) {
      if (resp.result === "error") {
        $subscribeEmail.focus();
        $form.find('button[type="submit"]').prop('disabled', true);
        $formNotice.stop(true).hide().removeClass('fa-check valid-bg').addClass('fa-close error-bg').fadeIn(function() {
          $(this).delay(1500).fadeOut(function() {
            $form.find('button[type="submit"]').prop('disabled', false);
          });
        });
      }
      else if (resp.result === "success") {
        $form[0].reset();
        $subscribeEmail.blur();
        $form.find('button[type="submit"]').prop('disabled', true);
        $formNotice.stop(true).hide().removeClass('fa-close error-bg').addClass('fa-check valid-bg').fadeIn(function() {
          $(this).delay(1500).fadeOut(function() {
            $form.find('button[type="submit"]').prop('disabled', false);
          });
        });
      }
    }
  }

  // subscribe form
  function _subscribeForm() {
    var $form = $('#subscribe-form');
    var $formNotice = $form.find('.form-notice');
    var $subscribeEmail = $('#subscribe-email');
    var $subscribeNotice = $('.subscribe-notice');
    $subscribeEmail.prop('type', 'text');
    $form.on('submit', function(e) {
    var subscribeEmailVal = $('#subscribe-email').val();
      e.preventDefault();
      if (subscribeEmailVal == '') {
        $subscribeEmail.focus();
        $form.find('button[type="submit"]').prop('disabled', true);
        $formNotice.stop(true).hide().removeClass('fa-check valid-bg').addClass('fa-close error-bg').fadeIn(function() {
          $subscribeNotice.stop(true).hide().html('<i class="fa fa-close error"></i> Please enter a valid email').fadeIn();
          $(this).delay(1500).fadeOut(function() {
            $form.find('button[type="submit"]').prop('disabled', false);
          });
        });
      }
      else if (!_formValidation(subscribeEmailVal)) {
        $subscribeEmail.focus();
        $form.find('button[type="submit"]').prop('disabled', true);
        $formNotice.stop(true).hide().removeClass('fa-check valid-bg').addClass('fa-close error-bg').fadeIn(function() {
          $subscribeNotice.stop(true).hide().html('<i class="fa fa-close error"></i> Email address is invalid').fadeIn();
          $(this).delay(1500).fadeOut(function() {
            $form.find('button[type="submit"]').prop('disabled', false);
          });
        });
      }
      else {
        $.ajax({
          type: 'POST',
          url: 'php/subscribe.php',
          data: {
            email: subscribeEmailVal
          },
          success: function() {
            $form[0].reset();
            $subscribeEmail.blur();
            $form.find('button[type="submit"]').prop('disabled', true);
            $formNotice.stop(true).hide().removeClass('fa-close error-bg').addClass('fa-check valid-bg').fadeIn(function() {
              $subscribeNotice.stop(true).hide().html('<i class="fa fa-check valid"></i> Thank you for subscribing').fadeIn();
              $(this).delay(1500).fadeOut(function() {
                $form.find('button[type="submit"]').prop('disabled', false);
              });
            });
          }
        });
      }
      return false;
    });
  }

  // contact form
  function _contactForm() {
    var $form = $("#contact-form");

    $form.on("submit", function(e) {
      var $input = $form.find('input, textarea');
      var contactNameVal = $("#contact-name").val();
      var contactEmailVal = $("#contact-email").val();
      var contactMessageVal = $("#contact-message").val();
      var $formNotice = $form.find('.form-notice');
      var $contactNoticeMessage = $('.contact-notice');

      e.preventDefault();
      $(this).find('button[type="submit"]').prop('disabled', true);
      if (contactNameVal == "" || contactEmailVal == "" || contactMessageVal == "") {
        $formNotice.stop(true).hide().removeClass('fa-check valid-bg').addClass('fa-close error-bg').fadeIn(function() {
          $contactNoticeMessage.stop(true).hide().html("<i class='fa fa-close error'></i> All fields are required").fadeIn();
          $(this).delay(1500).fadeOut(function() {
            $form.find('button[type="submit"]').prop('disabled', false);
          });
        });
        $input.each(function() {
          if (this.value === '') {
            this.focus();
            return false;
          }
        });
      }
      else if (!_formValidation(contactEmailVal)) {
        $formNotice.stop(true).hide().removeClass('fa-check valid-bg').addClass('fa-close error-bg').fadeIn(function() {
          $contactNoticeMessage.stop(true).hide().html("<i class='fa fa-close error'></i> Email address is invalid").fadeIn();
          $(this).delay(1500).fadeOut(function() {
            $form.find('button[type="submit"]').prop('disabled', false);
          });
        });
        $("#contact-email").focus();
      }
      else {
        $.ajax({
          type: "POST",
          url: "php/contact.php",
          data: {
            name: contactNameVal,
            email: contactEmailVal,
            message: contactMessageVal
          },
          success: function() {
            $formNotice.stop(true).hide().removeClass('fa-close error-bg').addClass('fa-check valid-bg').fadeIn(function() {
              $contactNoticeMessage.stop(true).hide().html("<i class='fa fa-check valid'></i> Message have been sent").fadeIn();
              $(this).delay(1500).fadeOut(function() {
                $form.find('button[type="submit"]').prop('disabled', false);
              });
            });
            $form[0].reset();
            $input.blur();
          }
        });
      }
      return false;
    });
  }

/*=================================================
window on load function
=================================================*/
  $(window).on('load', function() {
    _preloader();
    _headerStyleToggle();
    _owlCarousel();
    _setHeight();
  });

/*=================================================
document on ready function
=================================================*/

  $(document).on('ready', function() {
    _platformDetect();
    _smoothScroll();
    _scrollTo();
    _menu();
    _countdown();
    _lightbox();
    if (mailChimpVersion) {
      _mailChimp();
    } else {
      _subscribeForm();
    }
    _contactForm();
    if (__googleMap) {
      _mapToggle();
    } else {
      __disableMap();
    }
  });

/*=================================================
window on resize function
=================================================*/

  $(window).on('resize', function() {
    if (!isMobile) {
      _setHeight();
    }
    if (__googleMap) {
      _googleMap();
    } else {
      _disableMap();
    }
  }).trigger('resize');

})(jQuery);