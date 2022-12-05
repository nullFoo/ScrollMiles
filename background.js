var miles = 0;

setInterval(() => {
    chrome.storage.sync.get(["scrolled_amount"]).then((result) => {
        chrome.storage.sync.set({ "scrolled_amount": result.value + miles })
        miles = 0;
    });
},
10000);

chrome.runtime.onConnect.addListener(function(port) {
      console.assert(port.name === "scrollDetect");
      port.onMessage.addListener(function(msg) {
        if (msg.cmd === "scroll") {
            miles += msg.amount;
        }
      });
});