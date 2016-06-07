var texteditor = document.getElementById('wp-content-editor-container');

if(texteditor) {
  texteditor = texteditor.getElementsByClassName("wp-editor-area")[0];
} 

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //console.log(":" +request.post);
    texteditor.value = texteditor.value + request.post;

    chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
      console.log("huhu");
    });

    //sendResponse( texteditor );
    /*
    if (request.greeting == "hello")

    */
  });

//function sendResponse( element ) {
  //alert("x");
//  document.contains( element );
//}
