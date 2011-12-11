test("Popcorn Status.NET Plugin", function () {
  
  var popped = Popcorn("#video"),
    expects = 4,
    count = 0;
  
  expect(expects);
  
  function plus() {
    if ( ++count===expects) {
      start();
    }
  }
  
  stop();
   
  ok ('statusnet' in popped, "statusnet is a method of the popped instance");
  plus();

  popped.statusnet({
    target: "hovercarddiv",
    start : 1,
    end   : 6,
    type  : "HOVERCARD"
  } )
  .statusnet({
    target  : "subscribediv",
    type    : "SUBSCRIBE",
    username: "nm486",
    start   : 2,
    end     : 6
  } )
  .statusnet({
    target: "connectdiv",
    type: "CONNECT",
    start  : 3,
    end    : 6
  } )
  .volume(0)
  .play();
    
  ok (document.getElementById('hovercarddiv'), "hovercarddiv exists on the page" );
  plus();
  ok (document.getElementById('subscribediv'), "subscribediv exists on the page" );
  plus();
  ok (document.getElementById('connectdiv'), "connectdiv exists on the page" );
  plus();
  
  popped.exec( 2, function() {
    ok ( document.getElementById( "hovercarddiv" ).innerHTML, "hovercarddiv is not empty at 0:02 (expected)" );
    plus();
  });
  
  popped.exec( 3, function() {
    ok ( document.getElementById( "subscribediv" ).innerHTML, "subscribediv is not empty at 0:03 (expected)" );
    plus();
  });
  
  popped.exec( 4, function() {
    ok ( document.getElementById( "connectdiv" ).innerHTML, "connectdiv is not empty at 0:04 (expected)" );
    plus();
  });
  
  
});

