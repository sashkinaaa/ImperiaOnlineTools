// ==UserScript==
// @name Аз обичам да спя
// @namespace sashkinaaa
// @version 1.0
// @description shine bright like a diamond
// @match https://*.imperiaonline.org/imperia/game_v5/game/villagejs.php*
// @copyright 2021, shine bright like a diamond
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
setInterval(
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
    }, 55000);