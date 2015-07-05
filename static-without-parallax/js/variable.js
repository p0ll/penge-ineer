/*=================================================
true = enable
false = disable
1000 = 1 second

be careful, each var must have ; at the end of line
=================================================*/

/*=================================================
preloader
=================================================*/
var __preloaderFadeOut = 1200; // fadeout time
var __preloaderDelay = 800; // delay time

/*=================================================
scroll to element
=================================================*/
var  __scrollToSpeed = 1250; // scroll to element speed
var  __scrollToEase = 'easeInOutCirc'; // easing type, read document for more info

/*=================================================
header background, set one of below to true
the first true will be enable
=================================================*/
var __imageHeader = true; // image background toggle
var __videoHeader = false; // video background toggle
var __slideshowHeader = false; // slideshow background toggle

// video header setting
var __youtubeUrl = 'https://www.youtube.com/watch?v=EiQBaW201sg'; // youtube video url
var __videoStartTime = 70; // video start time, 70 mean 70 seconds
var __videoEndTime = 140; // video end time, 140 mean 140 seconds
var __videoMute = true; // mute video

// slideshow header config
var __imageNumber = 4; // how many slideshow image to show, please view document for more info about image name format
var __vegasStatic = false; // true for fade effect slideshow, false for css3 effect slideshow
var __vegasShuffle = false; // random image
var __vegasDelay = 10000; // slideshow delay
var __vegasTransitionDuration = 2500; // transition duration
var __vegasAnimationDuration = 12000; // animation duration, __vegasDelay + 2000 for better fadeout timing
var __vegasAnimationSet = [ // animation effect, read document for more info
        'kenburnsUp',
        'kenburnsDown',
        'kenburnsLeft',
        'kenburnsRight'
      ];
var __vegasTransitionSet = [ // transition effect, read document for more info
        'swirlLeft',
        'swirlLeft2',
        'swirlRight',
        'swirlRight2'
      ];

/*=================================================
gradient overlay
=================================================*/
var __gradient = true; // gradient overlay effect, disable will auto enable normal overlay

/*=================================================
parallax header, only effect on image background 
header for better performance (slideshow header wont effect)
=================================================*/

var __parallaxHeader = false; // parallax effect

/*=================================================
countdown toggle and config
=================================================*/

var __countdown = true; // countdown function, false to disable
var __countdownDate = new Date(2016, 1 - 1, 1); // count date, ie.
                                                 // new Date(2016, 12 - 1, 24) mean 2016-12-24 Christmas Eve
                                                 // new Date(2016, 12 - 1, 24, 15) mean 2016-12-24 Christmas Eve 3:00 PM
var __countdownTimezone = -8; // countdown timezone
var __countdownDesc = 'Landing Soon'; // text under countdown

/*=================================================
owl carousel config
=================================================*/

var __owlDelayText = 6000; // intro text rotate delay
var __owlDelayImg = 5000; // about section image slide delay

/*=================================================
mailchimp
=================================================*/

var mailChimpVersion = false; // if false, php/sunscribe.php will do the subscribe job
var mailChimpUrl = "YOUR_MAILCHIMP_POST_URL"; // if mailchimp enable above, set this to your mailchimp post url, for more info please read the document, if you enable mailchimp version but not set the post url, browser will receive a jquery error

  // ajax mailchimp custom message

  $.ajaxChimp.translations.eng = { // custom mailchimp message
    'submit': 'Please wait',
    0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
    1: '<i class="fa fa-close"></i> Enter a valid e-mail address',
    2: '<i class="fa fa-close"></i> E-mail address is not valid',
    3: '<i class="fa fa-close"></i> E-mail address is not valid',
    4: '<i class="fa fa-close"></i> E-mail address is not valid',
    5: '<i class="fa fa-close"></i> E-mail address is not valid'
  }

  // dedault message
  // Submit Message
  // 'submit': 'Submitting...'
  // Mailchimp Responses
  // 0: 'We have sent you a confirmation email'
  // 1: 'Please enter a value'
  // 2: 'An email address must contain a single @'
  // 3: 'The domain portion of the email address is invalid (the portion after the @: )'
  // 4: 'The username portion of the email address is invalid (the portion before the @: )'
  // 5: 'This email address looks fake or invalid. Please enter a real email address'

/*=================================================
google map
=================================================*/

var __googleMap = true; // google map toggle
var __myLatlng = new google.maps.LatLng(32.838254, 130.586871); // google map location
var __mapZoom = 12; // map zoom level, 0 - 21
var __markerTitle = 'Welcome'; // map marker hover title
var __mapType = google.maps.MapTypeId.SATELLITE; // map type, change SATELLITE to ROADMAP, HYBRID or TERRAIN

/*=================================================
do not edit below code
=================================================*/

if (__vegasStatic) {
  var __vegasAnimation = 'fade';
  var __vegasTransition = 'fade';
} else {
  var __vegasAnimation = __vegasAnimationSet;
  var __vegasTransition = __vegasTransitionSet;
}