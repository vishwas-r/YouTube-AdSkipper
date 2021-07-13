/*
  "name": "YouTube AdSkipper",
  "short_name": "YouTube AdSkipper",
  "description": "Skip YouTube ads automatically as soon as YouTube provides a skip button.",
  "version": "1.2",
  "author": "Vishwas R",
*/
(function(){function e(a){if(a.fireEvent)a.fireEvent("onclick");else{var b=document.createEvent("Events");b.initEvent("click",!0,!1);a.dispatchEvent(b)}}function g(){clearTimeout(f);m()||(f=setTimeout(function(){h();g()},2E3))}function n(a){return a.map(function(b){return Array.from(document.getElementsByClassName(b))||[]}).reduce(function(b,c){return b.concat(c)},[])}function p(a){var b=null,c,k=function(){for(var d=a;null!==d;){if("none"===d.style.display)return d;d=d.parentElement}return null}();
k&&a!==b&&(c&&b&&(c.disconnect(),e(b)),c||(c=new MutationObserver(function(){null!==b.offsetParent&&(e(b),b=void 0,c.disconnect())})),b=a,c.observe(k,{attributes:!0}))}function h(){n(q).forEach(function(a){null===a.offsetParent?p(a):e(a)})}function m(){if(!("MutationObserver"in window))return!1;var a=function(b){return b&&b[0]}(document.getElementsByTagName("ytd-player"));if(!a)return!1;(new MutationObserver(function(){h()})).observe(a,{childList:!0,subtree:!0});clearTimeout(f);return!0}var f,q=["ytp-ad-text ytp-ad-skip-button-text",
"videoAdUiSkipButton","ytp-ad-skip-button ytp-button","ytp-ad-overlay-close-button"];try{var l=window.self!==window.top}catch(a){l=!0}l||g()})();