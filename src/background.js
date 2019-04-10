chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {urlMatches: 'wixsite.com'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});




let counter = 0;
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    console.log('onUpdated', counter++)
    console.log(changeInfo.status)
    // if (changeInfo.status === 'complete'/* && !chrome.runtime.lastError*/) {
    //     console.log('asdasd')
    //     // loadScript('inject', tabId);
    // }
});