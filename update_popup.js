console.log("h");

let imperial = false;

document.getElementById("swapUnitsButton").onclick = () => {
        SwitchUnits();
}

updatePopup();
setInterval(() => {
    updatePopup();
},
2000);

function updatePopup() {
    chrome.storage.local.get(["scrolled_amount"]).then((result) => {
        console.log(result.scrolled_amount);
        result.scrolled_amount ||= 0;
        document.getElementById("pix_scrolled").innerHTML = result.scrolled_amount;
        var pixels = result.scrolled_amount;
        var cmOrInch = imperial ? px2inch(pixels) : px2cm(pixels);
        var text = imperial ? humanizeImperial(cmOrInch) : humanizeMetric(cmOrInch);
        document.getElementById("km_scrolled").innerHTML = text;
    });
}

function SwitchUnits() {
    imperial = !imperial;
    document.getElementById("swapUnitsButton").innerHTML = imperial ? "Switch to metric units" : "Switch to imperial units";
    updatePopup();
}

function humanizeMetric(centimeters) {
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
function humanizeImperial(inches) {
    if(inches < 12) {
        return Math.round(inches) + "in";
    }
    else if(inches < 36) {
        return Math.round(inches / 12) + "ft";
    }
    else if(inches < 63360) {
        return Math.round(inches / 36) + " yards";
    }
    else {
        return Math.round(inches / 63360) + " miles";
    }
}

function px2cm(px) {
  return px * 2.54 / 96;
}
function px2inch(px) {
  return px / 96;
}
