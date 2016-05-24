var body, navToggled, toggleNav, trigger;

  navToggled = false;

  body = document.getElementsByTagName('body')[0];

  mobileNavElements = document.getElementsByClassName('mobile-nav__element');

  trigger = document.getElementById('mobile-nav__trigger');

  toggleNav = function() {
    navToggled = !navToggled;
    if (navToggled === true) {
      return body.className = 'mobile-nav--show';
    } else {
      return body.className = '';
    }
  };


  trigger.onclick = toggleNav;

  for (_i = 0, _len = mobileNavElements.length; _i < _len; _i++) {
    navLink = mobileNavElements[_i];
    navLink.onclick = toggleNav
  }

  //- Podświetlanie menu
  var tudostanieszwodezkranuMenuElement = document.getElementById("tudostanieszwodezkranuMenu");
  var prawdyimityMenuElement = document.getElementById("prawdyimityMenu");
  var wesprzyjMenuElement = document.getElementById("wesprzyjMenu");
  var partnerzyMenuElement = document.getElementById("partnerzyMenu");
  var onasMenuElement = document.getElementById("onasMenu");
  var prasaMenuElement = document.getElementById("prasaMenu");

  function highlightMenu(element) {
    //- console.log('Podświetlanie menu id: ' + element);
    clearMenuHighLighting();
    element.className = element.className + ' menu-active';
  }
  function removeMenuElementClass(elementVar) {
    elementVar.className = elementVar.className.replace(/\s*\bmenu-active\b/,'');
  }
  function clearMenuHighLighting() {
    removeMenuElementClass(prawdyimityMenuElement);
    removeMenuElementClass(wesprzyjMenuElement);
    removeMenuElementClass(tudostanieszwodezkranuMenuElement);
    removeMenuElementClass(partnerzyMenuElement);
    removeMenuElementClass(onasMenuElement);
    removeMenuElementClass(prasaMenuElement);
  }
  var truthsAndMyths = new Waypoint({
    element: document.getElementById("prawdyimity"),
    handler: function(direction) {
      if(direction == "up") {
        clearMenuHighLighting()
      } else {
        highlightMenu(prawdyimityMenuElement)
      }
    },
    offset: 150
  })
  var howToSupport = new Waypoint({
    element: document.getElementById("wesprzyj"),
    handler: function(direction) {
      if(direction == "up") {
        highlightMenu(prawdyimityMenuElement)
      } else {
        highlightMenu(wesprzyjMenuElement)
      }
    },
    offset: 100
  })
  var getWater = new Waypoint({
    element: document.getElementById("tudostanieszwodezkranu"),
    handler: function(direction) {
      if(direction == "up") {
        highlightMenu(wesprzyjMenuElement)
      } else {
        highlightMenu(tudostanieszwodezkranuMenuElement)
      }
    },
    offset: 50
  })
  var partners = new Waypoint({
    element: document.getElementById("partnerzy"),
    handler: function(direction) {
      if(direction == "up") {
        highlightMenu(tudostanieszwodezkranuMenuElement)
      } else {
        highlightMenu(partnerzyMenuElement)
      }
    },
    offset: 100
  })
  var about = new Waypoint({
    element: document.getElementById("onas"),
    handler: function(direction) {
      if(direction == "up") {
        highlightMenu(partnerzyMenuElement)
      } else {
        highlightMenu(onasMenuElement)
      }
    },
    offset: 50
  })
  var media = new Waypoint({
    element: document.getElementById("prasa"),
    handler: function(direction) {
      if(direction == "up") {
        highlightMenu(onasMenuElement)
      } else {
        highlightMenu(prasaMenuElement)
      }
    },
    offset: 50
  })
