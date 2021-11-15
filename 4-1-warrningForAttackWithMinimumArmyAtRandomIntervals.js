// ==UserScript==
// @name       warrningForAttackWithMinimumArmyAtRandomIntervals
// @namespace  sashkinaaa
// @version    0.1
// @description  warrning if there is attack with at minimum army at random intervals
// @match      https://*.imperiaonline.org/imperia/game_v5/game/villagejs.php*
// @copyright  2021, sashkinaaa
// ==/UserScript==

$("<p id='submitAttacked' style='background-color: white; padding: 2px; font-size: 8px;'>Example</p>").appendTo("body");

//prompt("Брой единици за предопреждение:"); 
var limit_edinici = 2222; //army count
//prompt("Проверка за атака на през период (секунди):");
var intervalChecked = 180; //time interval to check
intervalChecked = Number(intervalChecked);

var lim_sound = 0; // 0 for no sound and 1 for sound

//counters for number of times sound is played
var playSoundAfterCount = -2;
var playSoundAgain = 45 / (intervalChecked+2);

function checkRedFlag()
{
  xajax_listRedFlag(containersStuff.findContaner({saveName:'showRedMissions',title:'Атаки по мен',template:'untabbed'}))

  var getTxtH4 = $(".tabstrip-content").find("h4").text();
  var getTxtH4_1, bg;

  // check if there is an attack coming. If there is no attack the color of submitAttacked paragraph will be white
  if (getTxtH4 == 'undifined' || getTxtH4 == '') { getTxtH4 = "Няма текущи мисии"; $("#submitAttacked").css("background-color", "white"); }

  $("#submitAttacked").html(getTxtH4);

  getTxtH4_1 = $("#submitAttacked").html();
        
  //set color to red if there is an attack coming
  $('#submitAttacked:contains("Атаки по мен")').css('background-color', 'red');

  bg = $("#submitAttacked").css("background-color");

  //check for attack, if it is no attacks make background white
  if ((getTxtH4_1 == "Атаки по мен") || (bg == "rgb(255, 0, 0)") || bg == "red")
    {
      //count of attacks coming
      var count_flagMissions = Number($("tr[class='flagHaveMission']").length);
      //variable for the biggest attack coming
      var maxE = 0;
      //find biggest attack
      for (var i = 0; i < count_flagMissions; i++)
        {
          var checkE = Number($("tr[class='flagHaveMission']").slice(i).first().find('td').slice(3).first().text().replace(/\s+/g, ''));
          if (maxE < checkE) { maxE = checkE; }
        }

        //if biggest attack is bigger than the limit play sound
        if (maxE >= limit_edinici)
          {
            //if the sound is turned off, then turn it on. If it is on check if audio is played enouth times
            if (lim_sound == 0)
              {
                //sound to be played
                $("<audio id='wav-attacktome' autoplay='autoplay'> <source src='http://www.soundrangers.com/demos/sirens/ambulance_siren.mp3' /> </audio>").appendTo("body");
                lim_sound = 1;
              }
            else
              {
                playSoundAfterCount++;
                if (playSoundAgain <= playSoundAfterCount) { lim_sound = 0; playSoundAfterCount = -2; }
              }
            }
        else
          {
            lim_sound = 0;
            $("#wav-attacktome").remove();
            $("#submitAttacked").css("background-color", "white");
          }
    }
  else
    {
      lim_sound = 0;
      $("#wav-attacktome").remove();
      $("#submitAttacked").css("background-color", "white");
    }
}

(function loop() {
    var rand = Math.round(Math.random() * (60000)) + 35000;
    setTimeout(function() {
            checkRedFlag();
            console.log(rand);
            loop();
    }, rand);
}());