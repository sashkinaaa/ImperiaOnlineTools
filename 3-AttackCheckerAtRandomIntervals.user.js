// ==UserScript==
// @name       AttackCheckerAtRandomIntervals
// @namespace  sashkinaaa
// @version    1
// @description  Attack Checker At Random Intervals
// @match      https://*.imperiaonline.org/imperia/game_v5/game/villagejs.php*
// @copyright  2021, sashkinaaa
// ==/UserScript==

document.body.style.background = 'green';

function checker() {
        //create new element and set the alarm sound (external source)
        var player = document.createElement('audio');
        player.src = 'http://www.soundrangers.com/demos/sirens/ambulance_siren.mp3';
        player.preload = 'auto';

        //if there is an attack coming start the alarm and change the background around the game
        var currElements = document.getElementsByClassName('incoming province');
        for (var i = 0; i < currElements.length; i++) {
            if (currElements[i].className == 'incoming province') {
                document.body.style.background = 'red';
                player.play();
            }
        };
        //location.reload();
        xajax_find_babysit(1, 1);
    }

(function loop() {
    var rand = Math.round(Math.random() * (60000)) + 35000;
    setTimeout(function() {
            checker();
            console.log(rand);
            loop();
    }, rand);
}());