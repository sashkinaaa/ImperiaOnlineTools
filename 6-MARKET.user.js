// ==UserScript==
// @name MARKET
// @namespace mine
// @version 0.1
// @description MARKET bot
// @match   http*://*.imperiaonline.org/imperia/game_v5/game/villagejs.php
// @copyright 2015 RealmDown
// ==/UserScript==

var script = document.createElement("script");
script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
document.body.appendChild(script);
var woodMaxPrice = prompt('Wood max price:');
var ironMaxPrice = prompt('Iron max price:');
var stoneMaxPrice = prompt('Stone max price:');
var e = $.Event('keyup');
e.keyCode = 39;
var curPrices = {
    wood: 0,
    iron: 0,
    stone: 0
};
var initialise = function init() {
    var market = document.getElementById('market');
    curPrices.wood = market.getElementsByTagName('li')[2].textContent;
    curPrices.iron = market.getElementsByTagName('li')[3].textContent;
    curPrices.stone = market.getElementsByTagName('li')[4].textContent;
};
var bought = document.createElement('div');
bought.style.marginLeft = '130px';
bought.style.backgroundColor = 'lightBlue';
bought.style.borderStyle = 'inset';
bought.setAttribute('id', 'bought');
bought.style.position = 'absolute';
bought.textContent = "purchased resources:";
document.body.appendChild(bought);

var buyWood = function bW() {
    xajax_buyResources(123456, 1);
    setTimeout(function() {
        var mbx = document.getElementById('messagebox123456');
        var woodQuanty = mbx.getElementsByTagName('a')[1].textContent;
        var woodInpt = document.getElementById('amountToBuyId');
        //console.log("wood: "+woodQuanty+" - "+curPrices.wood);
        $('#amountToBuyId').val(woodQuanty);
        $('#amountToBuyId').trigger(e);
        $('#buyForm .button-v2').submit();
        var boughtLi = document.createElement('li');
        boughtLi.style.backgroundColor = 'lightBlue';
        boughtLi.setAttribute('id', 'boughtLi');
        boughtLi.style.display = 'iline-block';
        //boughtLi.style.marginTop = '580px';
        boughtLi.style.borderStyle = 'inset';
        boughtLi.textContent = "bought " + woodQuanty + " wood for " + curPrices.wood + " per ? unit";
        document.getElementById('bought').appendChild(boughtLi);
        //console.log("Wood bought!!!******************************************************************************");
        //console.log(v);
    }, 700);
};

var buyIron = function bI() {
    xajax_buyResources(123456, 2);
    setTimeout(function() {
        var mbx = document.getElementById('messagebox123456');
        var ironQuanty = mbx.getElementsByTagName('a')[1].textContent;
        var ironInpt = $('#amountToBuyId');
        //console.log("iron: "+ironQuanty+" - "+curPrices.iron);
        $('#amountToBuyId').val(ironQuanty);
        $('#amountToBuyId').trigger(e);
        $('#buyForm .button-v2').submit();
        var boughtLi = document.createElement('li');
        boughtLi.style.backgroundColor = 'lightBlue';
        boughtLi.setAttribute('id', 'boughtLi');
        //boughtLi.style.display = 'iline-block';
        //boughtLi.style.marginTop = '580px';
        boughtLi.style.borderStyle = 'inset';
        boughtLi.textContent = "bought " + ironQuanty + " iron for " + curPrices.iron + " per ? unit";
        document.getElementById('bought').appendChild(boughtLi);
        //console.log("Iron bought!!!******************************************************************************");
        //console.log(v);
    }, 700);
};

var buyStone = function bS() {
    xajax_buyResources(123456, 3);
    setTimeout(function() {
        var mbx = document.getElementById('messagebox123456');
        var stoneQuanty = mbx.getElementsByTagName('a')[1].textContent;
        var stoneInpt = $('#amountToBuyId');
        //console.log("stone: "+stoneQuanty+" - "+curPrices.stone);
        $('#amountToBuyId').val(stoneQuanty);
        $('#amountToBuyId').trigger(e);
        $('#buyForm .button-v2').submit();
        var boughtLi = document.createElement('li');
        boughtLi.style.backgroundColor = 'lightBlue';
        boughtLi.setAttribute('id', 'boughtLi');
        //boughtLi.style.display = 'iline-block';
        //boughtLi.style.marginTop = '580px';
        boughtLi.style.borderStyle = 'inset';
        boughtLi.textContent = "bought " + stoneQuanty + " stone for " + curPrices.stone + " per ? unit";
        document.getElementById('bought').appendChild(boughtLi);


        //console.log("Stone bought!!!******************************************************************************");
        //console.log(v);
    }, 700);
};

var btn = document.createElement('input');
btn.setAttribute('value', 'Start');
btn.setAttribute('type', 'button');
btn.setAttribute('id', 'startBtn');
btn.style.marginTop = "-650px";
btn.style.display = 'block';
btn.style.backgroundColor = 'red';
document.body.appendChild(btn);
btn.addEventListener("click", makeDeal, false);

var info = document.createElement('div');
info.setAttribute('id', 'info');
info.style.display = 'block';
info.style.width = '125px';
info.style.marginTop = '5px';
document.body.appendChild(info);

var woodInfo = document.createElement('li');
woodInfo.style.backgroundColor = 'lightBlue';
woodInfo.style.borderStyle = 'inset';
woodInfo.textContent = 'Wood max price ' + woodMaxPrice;
document.getElementById('info').appendChild(woodInfo);

var ironInfo = document.createElement('li');
ironInfo.style.backgroundColor = 'lightBlue';
ironInfo.style.borderStyle = 'inset';
ironInfo.textContent = 'Iron max price ' + ironMaxPrice;
document.getElementById('info').appendChild(ironInfo);

var stoneInfo = document.createElement('li');
stoneInfo.style.backgroundColor = 'lightBlue';
stoneInfo.style.borderStyle = 'inset';
stoneInfo.textContent = 'Stone max price ' + stoneMaxPrice;
document.getElementById('info').appendChild(stoneInfo);

xajax_tradeTabs(containersStuff.findContaner({
    saveName: 'trade',
    title: '?????'
}), 2, 1);

function makeDeal() {
    xajax_buyResources(123456, 2);
    initialise();
    $(document).ready(function() {
        document.getElementById('startBtn').style.backgroundColor = 'green';
        document.getElementById('startBtn').value = 'Working';
    });
    if (Number(curPrices.wood) <= Number(woodMaxPrice)) {
        buyWood();
        setTimeout(function() {
            makeDeal();
        }, 2000);
    } else if (Number(curPrices.iron) <= Number(ironMaxPrice)) {
        buyIron();
        setTimeout(function() {
            makeDeal();
        }, 2000);
    } else if (Number(curPrices.stone) <= Number(stoneMaxPrice)) {
        buyStone();
        setTimeout(function() {
            makeDeal();
        }, 2000);
    } else {
        setTimeout(function() {
            makeDeal();
        }, 300);
    }
}