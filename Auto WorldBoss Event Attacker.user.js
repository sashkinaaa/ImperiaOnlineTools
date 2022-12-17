// ==UserScript==
// @name       Auto WorldBoss Event Attacker
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Script for automatic world boss event attacking
// @copyright  2022, sashkinaaa
// @match https://*.imperiaonline.org/imperia/game_v5/game/villagejs.php*
// ==/UserScript==

setInterval(function() {
    window.location.href = $(location).attr('href');
}, 1860000);

attackWorldBoss();

function attackWorldBoss() {
    //open the world boss screen
    setTimeout(function() {
        xajax_viewWorldboss(containersStuff.findContaner({saveName:'worldboss',title:'Мрачната крепост',template:'untabbed'}), {});
     }, 2000)

    //click the world boss attack button
    setTimeout(function() {
        xajax_viewAttackWorldboss(containersStuff.findContaner({saveName:'attackWB',template:'untabbed',title:'Attack Worldboss'}));
       }, 4000)

    //select all army
    setTimeout(function() {
        $("#sendAttackFormWB table.table-v3").find("tr").slice(1).first().find('a').each(function(e) {
            $(this).click()
        })
    }, 6000)

    //send the attack to the world boss
    setTimeout(function() {
       xajax_sendAttackWorldboss(2,xajax.getFormValues('sendAttackFormWB'))
       }, 8000)

    //refresh the page, by clicking the capital button
    //the last parameter of the function is the number of the capital so, your attack should be sent from the capital and you should change the '1' to your capital number
    setTimeout(function() {
       xajax_change_current_province(666,1,'village.php',1)
       }, 10000)
}