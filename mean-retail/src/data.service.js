app.factory('dataService', ['$routeParams','$http'], function($routeParams, $http){
    var id = encodeURIComponent($routeParams.id);
    var catId = encodeURIComponent($routeParams.category);
    
    return {
        getAllProducts: function() {
            return $http.get('/api/v1/product');
        },
        getAllProducts: function() {
            return $http.get('/api/v1/product/id/' + id);
        },
        getCategoryById: function() {
            return $http.get('/api/v1/category/id/' + catId);
        },
        getCategoryByParentId: function() {
            return $http.get('/api/v1/category/parent/' + catId);
        },
        getProductsByCategoryId: function(price) {
            return $http.get('/api/v1/product/categor/' + cateId, {price: price});
        }
    };
});