document.addEventListener("DOMContentLoaded", function() {

  var application_ID = 'VJDTO4Y36O';
  var api_KEY = 'd8c4853d7f3df70f8973f35ad66c1ec8';
  var index_name = 'restaurants';
  

var client = algoliasearch(application_ID, api_KEY);
var helper = algoliasearchHelper(client, index_name);

// var PARAMS = {
//     hitsPerPage: 3,
//     facets: ['type'],
//  }
    

helper.on('result', function(content) {
  renderHits(content);
});


function renderHits(content) {
  $('#container').html(function() {
    return $.map(content.hits, function(hit) {
      return '<li>' + hit._highlightResult.name.value + '</li>';
    });
  });
}

$('#search-box').on('keyup', function() {
  helper.setQuery($(this).val())
        .search();
});


helper.search();



  console.log("ready")
});