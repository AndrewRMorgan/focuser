var onInterval;
var onIntervalRunning = false;

var offInterval;
var offIntervalRunning = false;

var linkHiderId = "";
var gifHiderId = "";
var hideLinksClass = "";
var hideGifsClass = "";

makeId();

function makeId() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 7; i++) {
      linkHiderId += possible.charAt(Math.floor(Math.random() * possible.length));
    };
    for (var i = 0; i < 7; i++) {
      gifHiderId += possible.charAt(Math.floor(Math.random() * possible.length));
    };
    for (var i = 0; i < 7; i++) {
      hideLinksClass += possible.charAt(Math.floor(Math.random() * possible.length));
    };
    for (var i = 0; i < 7; i++) {
      hideGifsClass += possible.charAt(Math.floor(Math.random() * possible.length));
    };
};

function onIntervalFunction() {
  if (onIntervalRunning == false) {
    onInterval = setInterval(on, 100);
    onIntervalRunning = true;
  }
};
function on() {
  if (document.getElementById(linkHiderId) == null) {
    var linkStyle = document.createElement("style");
    var hideLinksNode = document.createTextNode("." + hideLinksClass + " { text-decoration: none !important; color: inherit !important; font-weight: inherit !important; font-style: inherit !important; border-bottom: none !important }");
    linkStyle.appendChild(hideLinksNode);
    linkStyle.id = linkHiderId;
    document.head.appendChild(linkStyle);
  };
  if (document.getElementById(gifHiderId) == null) {
    var gifStyle = document.createElement("style");
    var hideGifsNode = document.createTextNode("." + hideGifsClass + " { opacity: 0 !important }");
    gifStyle.appendChild(hideGifsNode);
    gifStyle.id = gifHiderId;
    document.head.appendChild(gifStyle);
  };
  var anchorElement = document.getElementsByTagName('a');
  for (var i = 0; i < anchorElement.length; i++) {
    anchorElement[i].classList.add(hideLinksClass);
    anchorElement[i].parentNode.classList.add(hideLinksClass);
    anchorElement[i].parentNode.parentNode.classList.add(hideLinksClass);
  };
  var spanElement = document.querySelectorAll('a span');
  for (var i = 0; i < spanElement.length; i++) {
    spanElement[i].classList.add(hideLinksClass);
  };
  var divElement = document.querySelectorAll('div[style*=".gif"]');
  for (var i = 0; i < divElement.length; i++) {
    divElement[i].classList.add(hideGifsClass);
  };
  var divElement2 = document.querySelectorAll('div[id*="giphy"]');
  for (var i = 0; i < divElement2.length; i++) {
    divElement2[i].classList.add(hideGifsClass);
  };
  var imgElement = document.querySelectorAll('img[src*=".gif"]');
  for (var i = 0; i < imgElement.length; i++) {
    imgElement[i].classList.add(hideGifsClass);
  };
  var iframeElement = document.querySelectorAll('iframe[src*="giphy"]');
  for (var i = 0; i < iframeElement.length; i++) {
    iframeElement[i].classList.add(hideGifsClass);
  };
  var videoElement = document.querySelectorAll('video[poster*=".gif"]');
  for (var i = 0; i < videoElement.length; i++) {
    videoElement[i].classList.add(hideGifsClass);
  };
};

function offIntervalFunction() {
  if (offIntervalRunning == false) {
    offInterval = setInterval(off, 100);
    offIntervalRunning = true;
  }
};

function off() {
  var anchorElement = document.getElementsByTagName('a');
  for(var i = 0; i < anchorElement.length; i++) {
    anchorElement[i].classList.remove(hideLinksClass);
    anchorElement[i].parentNode.classList.remove(hideLinksClass);
    anchorElement[i].parentNode.parentNode.classList.remove(hideLinksClass);
  };
  var spanElement = document.querySelectorAll('a span');
  for (var i = 0; i < spanElement.length; i++) {
    spanElement[i].classList.remove(hideLinksClass);
  };
  var divElement = document.querySelectorAll('div[style*=".gif"]');
  for(var i = 0; i < divElement.length; i++) {
    divElement[i].classList.remove(hideGifsClass);
  };
  var divElement2 = document.querySelectorAll('div[id*="giphy"]');
  for (var i = 0; i < divElement2.length; i++) {
    divElement2[i].classList.remove(hideGifsClass);
  };
  var imgElement = document.querySelectorAll('img[src*=".gif"]');
  for(var i = 0; i < imgElement.length; i++) {
    imgElement[i].classList.remove(hideGifsClass);
  };
  var iframeElement = document.querySelectorAll('iframe[src*="giphy"]');
  for(var i = 0; i < iframeElement.length; i++) {
    iframeElement[i].classList.remove(hideGifsClass);
  };
  var videoElement = document.querySelectorAll('video[poster*=".gif"]');
  for (var i = 0; i < videoElement.length; i++) {
    videoElement[i].classList.remove(hideGifsClass);
  };
};

function clearIntervalOn(){
  clearInterval(onInterval);
  onIntervalRunning = false;
};

function clearIntervalOff() {
  clearInterval(offInterval);
  offIntervalRunning = false;
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "on") {
      clearIntervalOff();
      onIntervalFunction();
    } else if (request.action == "off") {
      clearIntervalOn();
      offIntervalFunction();
    }
  });
