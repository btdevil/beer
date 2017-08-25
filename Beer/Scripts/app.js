var ViewModel = function () {
    var self = this;
    self.recipes = ko.observableArray();
    self.error = ko.observable();

    var recipesUri = '/api/recipes/';

    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            accepts: "application/json",
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    function getAllRecipes() {
        ajaxHelper(recipesUri, 'GET').done(function (data) {
            self.recipes(data);
        });
    }

    // Fetch the initial data.
    getAllRecipes();

    self.detail = ko.observable();

    self.getRecipeDetail = function (item) {
        ajaxHelper(recipesUri + item.id, 'GET').done(function (data) {
            self.detail(data);
        });
    }
};

ko.applyBindings(new ViewModel());