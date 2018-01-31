app.controller('productController', ['$scope', 'dataService', function($scope, dataService){
    
    dataService.getProductById().success(function(data) {
        $scope.product = data.product;
    });
}]);

app.controller('productCategoryController', ['$scope', 'dataService', function($scope, dataService){
    
    $scope.price = undefined;
    
    $scope.handlePriceClick = function() {
        if($scope.price === undefined){
            $scope.price = -1;
        }else{
            $scope.price = 0 - $scope.price;
        }
        $scope.load();
    }; 
    
    $scope.load() {
        dataService.getProductsByCategoryId($scope.price).success(function(data){
        $scope.products = data.products;
    }); 
    };
    
    $scope.load();

}]);