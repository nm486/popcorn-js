/**
  * Status.Net Popcorn.js plugin 
  * WARNING: As of December 11, 2011, this plugin works ONLY if you have an instance of status.NET running on your server.
  * Namely, you need <script>SN.init('YOUR_OAUTH_CONSUMER_KEY', 'YOUR_OAUTH_CONSUMER_SECRET');</script> in your HTML
  * You'll also need to point to your status.NET api.js file in the HTML:
  * Example - <script type='text/javascript' src='http://hungryeel.com/statusnet/js/api.js' ></script> 
  * Places Status.Net widgets inside target div 
  * Options parameter will need type, target, start and end time specified
  * Optional parameter is username
  *  
  * Type: type of Status.NET widget to be loaded - Status.Net currently supports Hovercards, Subscribe buttons, and Connect buttons
  * Target: the id of the div where the Status.Net widget will be loaded into
  * Start: the start time (in seconds) when this plugin will execute
  * End: the end time (in seconds) when the Status.Net widget will becpme hidden
  * Username: the username of the Status.Net user in which the Subscribe Button will be based on
  *  
  * @param Object options
  *
  * Example:
    var p = Popcorn('#video')
      .statusnet({
        type  : "SUBSCRIBE",
        target: "subscribeDiv",
        start : 5,
        end   : 86,
        username: "joe_user"
      } )
  *
  */

(function (Popcorn) {
  
  /* This function controls the activation of the Status.Net widget
   * Optional parameter is username (default is "")
   * 
   * mode: the type of Status.net widget to be activated.  Accepted values are "HOVERCARD", "SUBSCRIBE", and "CONNECT"
   * div: the id of the HTML div to contain the widget
   * username: the username of the Status.Net user in which the Subscribe Button will be based on 
   */
  var targetDiv;
 
  Popcorn.plugin( "statusnet", {
    manifest:{
      about:{
        name   : "Popcorn StatusNet Plugin",
        version: "0.2",
        author : "Stanley Tsang",
        website: "nm486.wordpress.com"
      },    
      options:{
        type   : {elem:"select", options:["HOVERCARD", "SUBSCRIBE", "CONNECT"], label:"Type"},
        target : {elem:"input", type:"text", label:"Target" },
        start  : {elem:'input', type:'number', label:'In'},
        end    : {elem:'input', type:'number', label:'Out'},
        // optional parameters:
        username: {elem:'input', type:'text', label:'Username'}
      }
    },
    
    _setup: function(options) {
      // Set the target div's display to none, otherwise we see it right off the bat
      document.getElementById( options.target ).style.display = "none";
      SN.ready(function() {
        var create = {
          "HOVERCARD": function() { SN.hovercards('#' + options.target); },
          "SUBSCRIBE": function() { SN.subscribeButton(options.target, options.username); },
          "CONNECT":   function() { SN.connectButton(options.target); }
        }
        create[options.type] && create[options.type]();
      });
    },
    
    /**
    * @member statusnet
    * The start function will be executed when the currentTime
    * of the video reaches the start time provided by the
    * options variable
    */
    start: function( event, options ){
      document.getElementById( options.target ).style.display = "";
    },
    /**
    * @member statusnet
    * The end function will be executed when the currentTime
    * of the video reaches the end time provided by the
    * options variable
    */
    end: function( event, options ){
      document.getElementById( options.target ).style.display = "none";
    },
    _teardown: function( options ){
      var target = document.getElementById( options.target );
      target && target.removeChild( options._container );
    }
  });
  
})(Popcorn);