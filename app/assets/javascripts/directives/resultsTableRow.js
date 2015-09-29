foodTrucks.directive('resultsTable', function(){

  return {
    templateUrl: 'templates/directives/resultsTableRow.html',
    restrict: 'A',
    scope: {
      marker: '='
    }
  };

});