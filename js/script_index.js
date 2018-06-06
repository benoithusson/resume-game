'use strict';


$(document).ready(function(){

///////////////////////////////////////////// ANIMATION BLUE BLOC ON THE LEFT /////////////////////////////////////////////

///// STEP 1
    $( "#container_text_id_image").click(function(){ // To implement an addEventListener on an HTML element

//  To move the bloc on the right  
      $( "#container_text_id_image" ).animate({ // To implement an animation
        opacity: "0.7", // choose the CSS properties we want to change
        left: "10",
        height:"470",
      }, 250, function() { // When the animation is over
          console.log('animation bloc complete');
      }),
// Change the color of the text          
          $("#text_id_image").animate({
            opacity: "1",
            marginTop:"7",

          }, 250, function(){
            console.log('animation opacity text complete');
      });   

      $('#text_id_image_visible').animate({
        left:"200",
      })


///// STEP 2 : AFTER THE ANIMATION
// To move the bloc on its position by default
          $("#container_text_id_image").mouseleave(function(){

            $("#container_text_id_image").animate({
              left: "-180",
              opacity: "0.2",
              height:"50",
            }, 250, function () {
              console.log('animation mouseleave complete');
            }),
// Change the color of the text   
            $("#text_id_image").animate({
              opacity: '0',
            }, 250, function() {
              console.log('original color text');
            })
          });   
    });

///////////////////////////////////////////// ANIMATION BLUE BLOCK : PLAY BUTTON ////////////////////////////

///// STEP 1
    $('#div_1').mouseenter(function(){

      $('#div_1').animate({
        height:"175",
      }, 300, function(){
        console.log('animation : bloc play width complete')
      })
      
      $('#rules').animate({
        lineHeight:"30",
      }, 10, function(){
        console.log('animation : bloc rules complete')
      });

      $('#rules').delay(50).show(); // To show the block 
                                    // To put display : 'block' in .animate() doesn't work

      $('#link_play').css('fontSize', '25px');

    });

///// STEP 2 : AFTER THE ANIMATION
      $('#div_1').mouseleave(function(){

        $('#div_1').animate({
          height:"50",
        }, 300, function(){
          console.log('animation bloc play back to position complete')
        })

        $('#rules').animate({
          lineHeight:"1",
        }, 300, function(){
          console.log('animation : bloc rules complete')
        });

        $('#rules').delay(300).hide(); // To hide the block 

        $('#link_play').css('fontSize', '20px'); 
      });

///////////////////////////////////////////// ANIMATION BLUE BLOC : DOWNLOAD RESUME 1 /////////////////////////////////////////////







});






