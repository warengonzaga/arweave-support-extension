chrome.runtime.onMessage.addListener(function(message, sender, response) {
    if (message.arweaveURL) {
        const queryParam = sender.tab.url.split("?")[1];
        const urlParams = new URLSearchParams(queryParam);
        const arweaveValue = urlParams.get("q");
        // hardcode for now but will support more public gateway
        const arweaveGateway = "https://arweave.net/";
        const arweaveCID = arweaveValue.slice(7);
        const redirectURL = arweaveGateway + arweaveCID;
        
        // redirect
        chrome.tabs.update(sender.tab.id, {url: redirectURL})     
        
        // debug
        console.log("Arweave native URL detected in address bar.");
        console.log("Arweave Native URL: " + arweaveValue);
        console.log("Arweave CID: " + arweaveCID);
        console.log("Redirect URL: " + sender.tab.url);
    }
});