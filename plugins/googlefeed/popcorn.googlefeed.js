// PLUGIN: Google Feed
(function ( Popcorn ) {

  var i = 1,
      scriptLoaded  = false,

  dynamicFeedLoad = function() {
    var dontLoad = false,
        k = 0,
        links = document.getElementsByTagName( "link" ),
        len = links.length,
        head = document.head || document.getElementsByTagName( "head" )[ 0 ],
        css = document.createElement( "link" ),
        resource = "http://www.google.com/uds/solutions/dynamicfeed/gfdynamicfeedcontrol.";

    if ( !window.GFdynamicFeedControl ) {

      Popcorn.getScript( resource + "js", function() {
        scriptLoaded = true;
      });

    } else {
      scriptLoaded = true;
    }

    //  Checking if the css file is already included
    for ( ; k < len; k++ ){
      if ( links[ k ].href === resource + "css" ) {
        dontLoad = true;
      }
    }

    if ( !dontLoad ) {
      css.type = "text/css";
      css.rel = "stylesheet";
      css.href =  resource + "css";
      head.insertBefore( css, head.firstChild );
    }
  };

  /**
   * googlefeed popcorn plug-in
   * Adds a feed from the specified blog url at the target div
   * Options parameter will need a start, end, target, url and title
   * -Start is the time that you want this plug-in to execute
   * -End is the time that you want this plug-in to stop executing
   * -Target is the id of the DOM element that you want the map to appear in. This element must be in the DOM
   * -Url is the url of the blog's feed you are trying to access
   * -Title is the title of the blog you want displayed above the feed
   * -Orientation is the orientation of the blog, accepts either Horizontal or Vertical, defaults to Vertical
   * @param {Object} options
   *
   * Example:
    var p = Popcorn("#video")
      .googlefeed({
       start: 5, // seconds
       end: 15, // seconds
       target: "map",
       url: "http://zenit.senecac.on.ca/~chris.tyler/planet/rss20.xml",
       title: "Planet Feed"
    } )
  *
  */

  Popcorn.plugin( "googlefeed" , function( options ) {
    // create a new div and append it to the parent div so nothing
    // that already exists in the parent div gets overwritten
    var newdiv = document.createElement( "div" ),
        target = document.getElementById( options.target ),
    initialize = function() {
      //ensure that the script has been loaded
      if ( !scriptLoaded || !window.GFdynamicFeedControl ) {
        setTimeout( function () {
          initialize();
        }, 5 );
      } else {
        // Create the feed control using the user entered url and title
        options.feed = new GFdynamicFeedControl( options.url, newdiv, {
          vertical: options.orientation.toLowerCase() === "vertical" ? true : false,
          horizontal: options.orientation.toLowerCase() === "horizontal" ? true : false,
          title: options.title = options.title || "Blog"
        });
      }
    };

    // Default to vertical orientation if empty or incorrect input
    if( !options.orientation || ( options.orientation.toLowerCase() !== "vertical" &&
      options.orientation.toLowerCase() !== "horizontal" ) ) {
      options.orientation = "vertical";
    }

    newdiv.style.display = "none";
    newdiv.id = "_feed" + i;
    newdiv.style.width = "100%";
    newdiv.style.height = "100%";
    i++;

    if ( !target && Popcorn.plugin.debug ) {
      throw new Error( "target container doesn't exist" );
    }
    target && target.appendChild( newdiv );

    return {
      /**
       * @member webpage
       * The setup function will be executed when a googlefeed plugin is created.
       */
      _setup: function( options ) {

        if ( !window.google ) {

          Popcorn.getScript( "http://www.google.com/jsapi", function() {

            var readyCheck = function() {

      				if ( window.google ) {
      					google.load( "feeds", "1", {

									callback: function () {

										dynamicFeedLoad();

									}
	            	});
	          	} else {
	          		setTimeout( readyCheck, 10 );
	          	}
          	};
          	readyCheck();

          });

        }

        initialize();
      },
      /**
       * @member webpage
       * The start function will be executed when the currentTime
       * of the video reaches the start time provided by the
       * options variable
       */
      start: function( event, options ){
        newdiv.setAttribute( "style", "display:inline" );
      },
      /**
       * @member webpage
       * The end function will be executed when the currentTime
       * of the video reaches the end time provided by the
       * options variable
       */
      end: function( event, options ){
        newdiv.setAttribute( "style", "display:none" );
      },
      _teardown: function( options ) {
        document.getElementById( options.target ) && document.getElementById( options.target ).removeChild( newdiv );
        delete options.feed;
      }
    };
  },
  {
    about: {
      name:    "Popcorn Google Feed Plugin",
      version: "0.1",
      author:  "David Seifried",
      website: "dseifried.wordpress.com"
    },
    options: {
      start: {
        elem: "input",
        type: "text",
        label: "In"
      },
      end: {
        elem: "input",
        type: "text",
        label: "Out"
      },
      target: "feed-container",
      url: {
        elem: "input",
        type: "text",
        label: "url"
      },
      title: {
        elem: "input",
        type: "text",
        label: "title"
      },
      orientation: {
        elem: "select",
        options: [ "Vertical","Horizontal" ],
        label: "orientation"
      }
    }
  });

})( Popcorn );
