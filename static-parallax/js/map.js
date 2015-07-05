  // google map
  function _googleMap() {
    var map;

    function ZoomControl(controlDiv, map) {
      var zoomControlDiv = document.createElement('div');
      zoomControlDiv.id = 'map-zoom';
      controlDiv.appendChild(zoomControlDiv);

      var zoomInButton = document.createElement('div');
      zoomInButton.id = 'map-zoom-in';
      zoomControlDiv.appendChild(zoomInButton);

      var zoomOutButton = document.createElement('div');
      zoomOutButton.id = 'map-zoom-out';
      zoomControlDiv.appendChild(zoomOutButton);

      google.maps.event.addDomListener(zoomInButton, 'click', function() {
        map.setZoom(map.getZoom()+1);
      });

      google.maps.event.addDomListener(zoomOutButton, 'click', function() {
        map.setZoom(map.getZoom()-1);
      });
    }

    function initialize() {
      var mapContainer = document.getElementById('map-canvas');
      var myLatlng = __myLatlng;
      var mapOptions = {
        zoom: __mapZoom,
        center: myLatlng,
        mapTypeId: __mapType,
        disableDefaultUI: true,
        mapTypeControl: false,
        scrollwheel: false
      }
      var map = new google.maps.Map(mapContainer, mapOptions);
      var icon = {
        url: 'img/marker.png'
        // size: new google.maps.Size(100, 111),
        // origin: new google.maps.Point(0, 0)
        // anchor: new google.maps.Point(0, 0)
      };
      var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          icon: icon,
          title: __markerTitle
      });

      var zoomControlDiv = document.createElement('div');
      var zoomControl = new ZoomControl(zoomControlDiv, map);

      zoomControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);

      google.maps.event.addDomListener(window, 'resize', function() {
        var center = map.getCenter();

        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
      });
    }

    google.maps.event.addDomListener(window, 'load', initialize);

  }

  // map toggle
  function _mapToggle() {

    var $mapToggle = $('.map-toggle');

    $mapToggle.on('click', function(e) {

      var $contact = $('#contact');
      var $contactContentWrapper = $('#contact').find('.container');
      var $contactOverlay = $('.contact-overlay');
      var $html = $("html, body");
      var $this = $(this);

      e.preventDefault();
      $this.blur();
      if($this.hasClass('map-hide')) {
        $this.text('Contact').removeClass('map-hide').addClass('map-show');
        $contactContentWrapper.stop(true).animate({opacity: 0}, 500, function() {

          $(this).css({'z-index' : 0});
          $contactOverlay.stop(true).slideUp(500);
          $html.stop(true).animate({scrollTop: $contact.offset().top}, 500);

        });
      } else if ($this.hasClass('map-show')) {
        $this.text('Map').removeClass('map-show').addClass('map-hide');
        $contactOverlay.stop(true).slideDown(500, function(){

          $contactContentWrapper.stop(true).css({'z-index' : 3}).animate({opacity: 1}, 500); 
          $html.stop(true).animate({scrollTop: $contact.offset().top}, 500); 
          
        });
      }
      return false;
    });
  }
  
  function _disableMap() {
    $('#map-canvas, .map-toggle').remove();
  }