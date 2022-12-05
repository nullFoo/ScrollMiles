var amountScrolledSinceLast = 0;

var prevY = 0;


chrome.storage.local.get(["scrolled_amount"], function(result) {
    if(result.scrolled_amount == null) {
        console.log("result was null")
        chrome.storage.local.set({ "scrolled_amount": 0 }, function() {
            console.log("set to 0")
        })
    }
    console.log(result.scrolled_amount);
    amountScrolledSinceLast = 0;
});

setInterval(function() {
    if(amountScrolledSinceLast != 0) {
        chrome.storage.local.get(["scrolled_amount"], function(result) {
            console.log(result.scrolled_amount);
            chrome.storage.local.set({ "scrolled_amount" : result.scrolled_amount + amountScrolledSinceLast }, function() {
                console.log("set to " + (result.scrolled_amount + amountScrolledSinceLast)); 
            })
            amountScrolledSinceLast = 0;
        });
    }
},
2000);

//var port = chrome.runtime.connect({name: "scrollDetect"});
console.log("amountScrolledSinceLastcroller started tracking");

window.onscroll = function (e) {
    var scrollDif = Math.abs(window.scrollY - prevY);
    amountScrolledSinceLast += scrollDif;
    prevY = window.scrollY;
}