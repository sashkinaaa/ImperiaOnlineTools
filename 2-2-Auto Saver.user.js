// ==UserScript==
// @name       Auto Saver
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @copyright  2013, Djambazov
// @match https://*/imperia/game_v5/game/villagejs.php
// ==/UserScript==

//refresh the webpage at a given interval (60000 ms)
setInterval(function() {
    window.location.href = $(location).attr('href');
}, 60000);

//check if there is an saved army and if it is not saved it saves it. Be careful, if you have moving army, this script won't start!
if ($('#missions .outgoing.province').html() == null) {
    autoSave();
}

//var player = localStorage.getItem("playerToAttack"); - for dynamic username (use the Set Player To Attack script)
var player = "DukeVimes"; //just an example username "DukeVimes"

function autoSave() {
    //open the operation center (fortress)
    xajax_viewOperationCenter(containersStuff.findContaner());
    xajax_viewOperationCenter(1, {
        'tab': 2
    });


    //select all army
    setTimeout(function() {
        $("#sendAttackForm table.table-v3").find("tr").slice(1).first().find('a').each(function(e) {
            $(this).click()
        })
    }, 500)

    //choose a player using the username and the search button
    setTimeout(function() {
        $('#inpime').val(player);
    }, 1000)

    setTimeout(function() {
        $('.button-v3').click()
    }, 2000)

    //choose a province
    setTimeout(function() {
        $('#nomer').val(1);
    }, 3000)

    setTimeout(function() {
        xajax_doAttack(999, xajax.getFormValues('sendAttackForm'), document.getElementById('checkMe').value, 666)
    }, 4000)

    //2 - for field battle, 1 - fortress siege
    setTimeout(function() {
        xajax_doAttack(999, xajax.getFormValues('sendAttackForm'), document.getElementById('checkMe').value, 1);
        SetFocusTop()
    }, 5000)
}

