$(function() {
  //alert(chrome.i18n.getMessage("extension_name"));
  // sends message to background script

  //var string =
  //console.log($);


  var jQuery = $;
  //$('#text').text("test");
  var updatetext = $('#text');

  chrome.storage.sync.get('post', function(items) {
      //updatetext.val( "saved: " + items.post );
      $('#text').val( items.post );
      console.log(items);
  });


  function tabcallback(tabs) {
    var currentTab = tabs[0];
    //alert( "test"+currentTab.url );
    $('#text').val( $('#text').val() + "\n\r" + currentTab.title + " via " + currentTab.url + "\n\r===\n\r");
    //console.log(jQuery);
    console.log(currentTab);
  }

  chrome.tabs.query({ active: true, currentWindow: true }, tabcallback);

  $('#text').on('keyup',function() {

    $('#loading').hide().html('<i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw"></i>').fadeIn();
    chrome.storage.sync.set({ post: $('#text').val() }, function() { });

    //hide loader
    setTimeout(function() {
      //alert("settimeout");
      $('#loading').fadeOut(250);
    },2000);
  });

  $('button').on('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      var message = {};
      message.post = $('#text').val();
      chrome.tabs.sendMessage(tabs[0].id, {post: message.post}, function(response) {
        //console.log(response.farewell);
      });
    });
  });


  chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    $('#text').val('');
    chrome.storage.sync.set({ post: '' }, function() { });
    //if (request.greeting == "hello")
      //sendResponse({farewell: "goodbye"});
  });


});
