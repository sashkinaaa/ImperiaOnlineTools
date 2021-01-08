// ==UserScript==
// @name       Set Player To Attack
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @copyright  2013, Djambazov
// @match https://*/imperia/game_v5/game/villagejs.php
// ==/UserScript==

//open an prompt, where the user have to set the player, which he will attack (playerToAttack) and save the response in the local storage
var playerToAttack = prompt("Player you will attack while saving the army: ");
localStorage.setItem("playerToAttack",playerToAttack);
