(function () {
  var timerId,
	  classList = [
		"ytp-ad-skip-button-text", // Video Ad; "Skip Ad" or "Skip Ads" button
		"videoAdUiSkipButton", // Video Ad
		"ytp-ad-skip-button ytp-button", // Video Ad; "Skip Ad" or "Skip Ads" button
		"ytp-ad-overlay-close-button", // Banner Ad; "X" button
	  ];
  var isInIframe = (function() {
    try {
      return (window.self !== window.top);
    } catch (e) {
      return true;
    }
  })();
  
  if (!isInIframe)
    initTimeout();
  
  function simulateClick(el) {
    var eventType = 'click';
	
	if (el.fireEvent) {
		el.fireEvent('on' + eventType);
	} else {
		var evObj = document.createEvent('Events');
		evObj.initEvent(eventType, true, false);
		el.dispatchEvent(evObj);
	}
  }

  function initTimeout() {
    clearTimeout(timerId);

    if (initDomTreeObserver()) {
      return;
    }
    timerId = setTimeout(function() {
      checkAndClickButtons();

      initTimeout();
    }, 2000);
  }

  function existingButtons(classNames) {
    return classNames.map(name => {
        return Array.from(document.getElementsByClassName(name)) || [];
      }).reduce(function(acc, elems) {
        return acc.concat(elems);
      }, []);
  }

  function isElementVisible(ele) {
    return ele.offsetParent === null ? false : true;
  }

  function simulateClickOnVisible(button) {
	var skipButton = null, skipButtonDomTreeObserver;
    var hiddenElement = (function() {
      var currentElement = button;
      while (currentElement !== null) {
        if (currentElement.style.display === 'none')
          return currentElement;

        currentElement = currentElement.parentElement;
      }

      return null;
    })();

    if (!hiddenElement || button === skipButton)
      return;
	
    if (skipButtonDomTreeObserver && skipButton) {
      skipButtonDomTreeObserver.disconnect();
      simulateClick(skipButton);
    }

    if (!skipButtonDomTreeObserver) {
      skipButtonDomTreeObserver = new MutationdomTreeObserver(function() {
        if (!isElementVisible(skipButton)) {
          return;
        }

        simulateClick(skipButton);
        skipButton = undefined;
        skipButtonDomTreeObserver.disconnect();
      });
    }

    skipButton = button;
    skipButtonDomTreeObserver.observe(hiddenElement, { attributes: true });
  }

  function checkAndClickButtons() {
    existingButtons(classList).forEach(button => {
      if (!isElementVisible(button)) {
        simulateClickOnVisible(button);        
        return;
      } 

      simulateClick(button);
    })
  }
  
  function initDomTreeObserver() {
    if (!('MutationdomTreeObserver' in window)) {
      return false;
    }

    var ytPlayer = (function(nodeList) {
      return nodeList && nodeList[0];
    })(document.getElementsByTagName('ytd-player'));

    if (!ytPlayer) {
      return false;
    }

    var domTreeObserver = new MutationdomTreeObserver(function() {
      checkAndClickButtons();
    });

    domTreeObserver.observe(ytPlayer, { childList: true, subtree: true });

    clearTimeout(timerId);

    return true;
  }

})();