// ==UserScript==
// @name Аз обичам да спя - произволни времена за местене
// @namespace sashkinaaa
// @version 2.0
// @description Added a random interval between moving army
// @match https://*.imperiaonline.org/imperia/game_v5/game/villagejs.php*
// @copyright 2014, sashkinaaa
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

document.body.style.background = '';

function checker() {
    if (document.getElementsByClassName('incoming province')[0] != null) {
        xajax_changeProvArrow(2, 1)
        xajax_premiumMoveAll(1)
        xajax_premiumMoveAll(2)
        xajax_premiumMoveAll(3)
        xajax_transport_all(containersStuff.findContaner({
            saveName: 'transportation',
            title: 'Транспортни мисиии'
        }));
        document.body.style.background = '';
    }
    //xajax_settings(2,0,'',true)
    xajax_find_babysit(1, 1);
}

(function loop() {
    var rand = Math.round(Math.random() * (20000)) + 50000;
    setTimeout(function() {
            checker();
            console.log(rand);
            loop();
    }, rand);
}());
