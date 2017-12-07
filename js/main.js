document.addEventListener("DOMContentLoaded", function() {

  var application_ID = 'VJDTO4Y36O';
  var api_KEY = 'd8c4853d7f3df70f8973f35ad66c1ec8';
  var index_name = 'restaurants';
  

var client = algoliasearch(application_ID, api_KEY);
var helper = algoliasearchHelper(client, index_name);


helper.on('result', function(content) {
  renderHits(content);
});


function renderHits(content) {
  $('#container').html(JSON.stringify(content, null, 2));
}


helper.search();























  console.log("ready")
});