document.addEventListener("DOMContentLoaded", function() {
  
let application_ID = 'VJDTO4Y36O';
let api_KEY = 'd8c4853d7f3df70f8973f35ad66c1ec8';
let index_name = 'finalOutput';
  

let client = algoliasearch(application_ID, api_KEY);
var helper = algoliasearchHelper(client, index_name);
let algolia = algoliasearch(application_ID, api_KEY);


var helper = algoliasearchHelper(algolia, 'finalOutput', {
  facets: ['type','cuisine', 'rating'],
  hitsPerPage: 3,
  maxValuesPerFacet: 5,
  getRankingInfo: true,
});

helper.on("result", searchCallback);



let $inputfield = $("#search-box");
let $hits = $('#hits');
let $facets = $('#facets');


$inputfield.keyup(function(e) {
  helper.setQuery($inputfield.val()).search();
});

helper.search();


function searchCallback(content){
  if (content.hits.length === 0) {
    $hits.empty().html("No results :(");
    return;
  }

    /***********Data to be rendered **************/
  renderHits($hits, content);
  // renderFacets($facets, content);
}






const renderHits =($hits, results) =>{
  var hits = results.hits.map(function renderHit(hit){

    var highlighted = hit._highlightResult;
    console.log("What is :highlighted",highlighted)
   var attributes = $.map(highlighted, function renderAttributes(attribute, name) {
  return (
        '<div class="attribute">' +
           attribute.value +
        '<img src="'+ attribute.value+'">' +
        '</div>');
    }).join('');
    return '<div class="hit panel">' + attributes + '</div>';
  });
  $hits.html(hits);
}

// const renderFacet = ($facets, results) =>{
//  return ""
//    // Built out facet rendering     // 
//   //  for Cuisine/Food Type for    // 

// }



  console.log("ready")
});