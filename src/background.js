(function() {

  // http://stackoverflow.com/questions/23822170/getting-unique-clientid-from-chrome-extension
  function getRandomToken() {
      // E.g. 8 * 32 = 256 bits token
      var randomPool = new Uint8Array(32);
      crypto.getRandomValues(randomPool);
      var hex = '';
      for (var i = 0; i < randomPool.length; ++i) {
          hex += randomPool[i].toString(16);
      }
      // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
      return hex;
  }

    chrome.storage.sync.get('userid', function(items) {
        var userid = items.userid;
        if (userid) {
            useToken(userid);
        } else {
            userid = getRandomToken();
            chrome.storage.sync.set({userid: userid}, function() {
                useToken(userid);
            });
        }
        function useToken(userid) {
            // TODO: Use user id for authentication or whatever you want.
            return userid;
        }
    });

  // receives message from popup script
  chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if (request.opened == true) {
        alert("opened");
    }
  });

})();
