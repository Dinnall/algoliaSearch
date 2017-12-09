document.addEventListener("DOMContentLoaded", function() {
  
  var application_ID = 'VJDTO4Y36O';
  var api_KEY = 'd8c4853d7f3df70f8973f35ad66c1ec8';
  var index_name = 'restaurants';
  

var client = algoliasearch(application_ID, api_KEY);
var helper = algoliasearchHelper(client, index_name);



var algolia = algoliasearch(application_ID, api_KEY);


var helper = algoliasearchHelper(algolia, 'restaurants', {
  facets: ['type', 'cuisine', 'rating'],
  hitsPerPage: 3,
  maxValuesPerFacet: 5,
  getRankingInfo: true
});

helper.on("result", searchCallback);



var $inputfield = $("#search-box");
var $hits = $('#hits');


$inputfield.keyup(function(e) {
  helper.setQuery($inputfield.val()).search();
});

// Trigger a first search, so that we have a page with results
// from the start.
helper.search();


function searchCallback(content) {
  if (content.hits.length === 0) {
    // If there is no result we display a friendly message
    // instead of an empty page.
    $hits.empty().html("No results :(");
    return;
  }

    // Hits/results rendering
  renderHits($hits, content);
}

function renderHits($hits, results) {
  // Scan all hits and display them
  var hits = results.hits.map(function renderHit(hit) {
    // We rely on the highlighted attributes to know which attribute to display
    // This way our end-user will know where the results come from
    // This is configured in our index settings
    var highlighted = hit._highlightResult;
    var attributes = $.map(highlighted, function renderAttributes(attribute, name) {
      return (
        '<div class="attribute">' +
        '<strong>' + name + ': </strong>' + attribute.value +
        '</div>');
    }).join('');
    return '<div class="hit panel">' + attributes + '</div>';
  });
  $hits.html(hits);
}


  console.log("ready")
});