/**
  *  Status.Net Popcorn.js plugin 
  * Places Status.Net widgets inside target div 
  *  Options parameter will need type, target, start and end time specified
  * Optional parameter is username
  *  
  * Type: the kind of Status.Net widget to be loaded - Status.Net currently supports Hovercards, Subscribe buttons, and Connect buttons
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
  
  function enableSNPlugin(mode, div, username) {
    SN.ready(function() {
      var create = {
        "HOVERCARD": function() { SN.hovercards('#' + div); },
        "SUBSCRIBE": function() { SN.subscribeButton(div, username); },
        "CONNECT":   function() { SN.connectButton(div); }
      }
      create[mode] && create[mode]();
    });
  }
  
  Popcorn.plugin( "statusnet", {
    manifest:{
      about:{
        name   : "Popcorn StatusNet Plugin",
        version: "0.1",
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
      
      targetDiv = document.getElementById( options.target );    
      
    },
    
    /**
    * @member statusnet
    * The start function will be executed when the currentTime
    * of the video reaches the start time provided by the
    * options variable
    */
    start: function( event, options ){
      enableSNPlugin(options.type, options.target, options.username || "");
    },
    /**
    * @member statusnet
    * The end function will be executed when the currentTime
    * of the video reaches the end time provided by the
    * options variable
    */
    end: function( event, options ){
      document.getElementById( options.target ).style.display = "none";
    }
    
  });
  
})(Popcorn);