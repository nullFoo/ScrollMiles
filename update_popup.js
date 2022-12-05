console.log("h");

updatePopup();
setInterval(() => {
    updatePopup();
},
2000);

function updatePopup() {
    chrome.storage.local.get(["scrolled_amount"]).then((result) => {
        console.log(result.scrolled_amount);
        document.getElementById("pix_scrolled").innerHTML = result.scrolled_amount;
        var cm = px2cm(result.scrolled_amount);
        document.getElementById("km_scrolled").innerHTML = humanize(cm);
    });
}

function humanize(centimeters) {
    if(centimeters < 100) {
        return Math.round(centimeters) + "cm";
    }
    else if(centimeters < 100000) {
        return Math.round(centimeters / 100) + "m";
    }
    else {
        return Math.round(centimeters / 100000) + "km";
    }
}

function px2cm(px) {
  return px * 2.54 / 96;
}