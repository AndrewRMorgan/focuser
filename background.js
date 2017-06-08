chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'loading' && tab.status == 'loading') {
    chrome.browserAction.setTitle({title: 'Focuser - Status: Loading'});
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.status == 'complete') {
    chrome.browserAction.setIcon({path: "icon24off.png", tabId: tab.id});
    chrome.browserAction.setTitle({title: 'Focuser - Hide Links and GIFs'});
  };
});

var toggle = 0;

chrome.browserAction.onClicked.addListener(function(tab) {
  if (toggle == 1) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "off"}, function(response) {
      });
    });
    chrome.browserAction.setIcon({path: "icon24off.png", tabId: tab.id});
    chrome.browserAction.setTitle({title: 'Focuser - Hide Links and GIFs'});
    toggle = 0;
  }
  else if (toggle == 0) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "on"}, function(response) {
      });
    });
    chrome.browserAction.setIcon({path: "icon24.png", tabId: tab.id});
    chrome.browserAction.setTitle({title: 'Focuser - Show Links and GIFs'});
    toggle = 1;
  }
});
