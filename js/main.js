var self,
    settings,
    client,
    helper,
    RestaurantSearch = {

  settings: {

    applicationID: 'VJDTO4Y36O',
    apiKey: 'd8c4853d7f3df70f8973f35ad66c1ec8',
    indexName: 'finalOutput',
    facetNames: {
      'food_type': 'Cuisine/Food Type',
      'stars_count': 'rating',
      'payment_options': 'Payment Options'
    }
  },

  events: function() {

    client = algoliasearch(settings.applicationID, settings.apiKey);

    helper = algoliasearchHelper(client, settings.indexName,{
      hitsPerPage: 3,
      maxValuesPerFacet: 10,
      disjunctiveFacets: ['food_type', 'stars_count', 'payment_options'],
      aroundLatLngViaIP: true,
      getRankingInfo: true
    });

    var $facets = $('#facets-list'),
        $input = $('#search-input'),
        $loadMoreBtn = $('#load-more-btn');

    // Bind events
    helper.on('result', self.searchCallback);
    $facets.on('click', self.handleFacetClick);
    $loadMoreBtn.on('click', self.loadMoreRecords);

    $input.on('keyup', function() {
      helper.setQuery($(this).val()).search();
    });

    helper.search();
  },


searchCallback: function(results) {
   var $hits = $('#results-list'),
        $facets = $('#facets-list'),
        $loadMoreBtn = $('#load-more-btn');

    if (results.hits.length === 0) {
      $hits.empty();
      self.updateProcessInfo(0, results.processingTimeMS);
      return;
    }

    self.renderHits($hits, results);
    self.renderFacets($facets, results);

   

    if (results.page >= (results.nbPages-1)) {
      $loadMoreBtn.addClass('hidden');
    } else {
      $loadMoreBtn.removeClass('hidden');
    }
  },


handleFacetClick: function(e) {
    e.preventDefault();
       var target = e.target,
        attribute = target.dataset.attribute,
            value = target.dataset.value;

    helper.toggleRefine(attribute, value).search();
  },



loadMoreRecords: function(e) {
    e.preventDefault();
    self.appendingRecords = true;
    helper.setPage(helper.getPage()).nextPage().getPage();
    helper.search();
  },


renderHits: function($hits, results) {
    self.updateProcessInfo(results.nbHits, results.processingTimeMS);



// //    // Built out facet rendering     // 
// //   //  for Cuisine/Food Type for    // 
//             Render  records


var $template = $('#result-item-template');
var hits = results.hits.map(function renderHit(hit) {
    var starRound = hit.stars_count * 10;

      return $template.html()
          .replace(/{{ name }}/ig, hit.name)
          .replace(/{{ image }}/ig, hit.image_url)
          .replace(/{{ rating }}/ig, hit.stars_count)
          .replace(/{{ star }}/ig, starRound)
          .replace(/{{ reviews }}/ig, hit.reviews_count)
          .replace(/{{ type }}/ig, hit.food_type)
          .replace(/{{ price }}/ig, hit.price_range)
          .replace(/{{ neighborhood }}/ig, hit.neighborhood);
    }).join('');

    // loading more records
    if (self.appendingRecords === true) {
      $hits.append(hits);
    } else {
      $hits.html(hits);
    }
    self.appendingRecords = false;
  },


  renderFacets: function($facets, content) {
    var $facetTemplate = $('#facet-item-template');

    //  double check Algolia index for facets
    var facets = content.disjunctiveFacets.map(function(facet) {
    var name = facet.name,
      header = '<h4 class="facet-name">' + settings.facetNames[name] + '</h4>',
          facetValues = content.getFacetValues(name);

if (name === 'food_type' || name === 'payment_options') {
        var facetsValuesList = $.map(facetValues, function(facetValue) {

          var facetValueClass = facetValue.isRefined ? 'refined'  : '';


          return $facetTemplate.html()
              .replace(/{{ class }}/ig, facetValueClass)
              .replace(/{{ attribute }}/ig, name)
              .replace(/{{ value }}/ig, facetValue.name)
              .replace(/{{ count }}/ig, facetValue.count);
        })
        return header + '<ul>' + facetsValuesList.join('') + '</ul>';
      } else {


        var $ratingTemplate = $('#temp-rating-template').html();
        return $ratingTemplate;
      }
    });

    $facets.html(facets.join(''));
  },


  updateProcessInfo: function(total, time) {
    $('#total-records').text(total + '  found ');
    $('#processing-time').text('in ' + (time / 1000) + ' seconds');
  },


  init: function () {
    self = this;
    settings = this.settings;
    this.events();
  }

};


$(function () {
  console.log('Final App');
  RestaurantSearch.init();
});