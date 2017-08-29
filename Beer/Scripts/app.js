var BEER = window.BEER || {};

BEER.utils = (function () {
    var process = {
    ajaxHelper: function(uri, method, data, self) {
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
    }};
    return process;
})()

BEER.ViewModel = function () {
    var self = this;
    self.recipes = ko.observableArray();
    self.malts = ko.observableArray();
    self.yeast = ko.observableArray();
    self.hops = ko.observableArray();
    self.error = ko.observable();

    var recipesUri = '/api/recipes/';

    function getAllRecipes() {
        BEER.utils.ajaxHelper(recipesUri, 'GET', null, self).done(function (data) {
            self.recipes(data);
        });
    }

    // Fetch the initial data.
    getAllRecipes();

    self.detail = ko.observable();

    self.getRecipeDetail = function (item) {
        BEER.utils.ajaxHelper(recipesUri + item.id, 'GET', null, self).done(function (data) {
            self.detail(data);
        });
    }
};

//ko.applyBindings(new BEER.ViewModel(), document.getElementById('recipes'));

BEER.maltViewModel = function () {
    var that = this;
    that.malts = ko.observableArray();
    that.error = ko.observableArray();

    var recipesUri = '/api/maltgenerics/';

    function getAllMalts() {
        BEER.utils.ajaxHelper(recipesUri, 'GET', null,that).done(function (data) {
            that.malts(data);
        });
    }

    // Fetch the initial data.
    getAllMalts();
}

ko.applyBindings(new BEER.maltViewModel(), document.getElementById('malts'));

BEER.hopViewModel = function () {
    var that = this;
    that.hops = ko.observableArray();
    that.error = ko.observableArray();

    var recipesUri = '/api/hops/';

    function getAllHops() {
        BEER.utils.ajaxHelper(recipesUri, 'GET', null,that).done(function (data) {
            that.hops(data);
        });
    }

    // Fetch the initial data.
    getAllHops();
}

ko.applyBindings(new BEER.hopViewModel(), document.getElementById('hops'));

BEER.yeastViewModel = function () {
    var that = this;
    that.yeast = ko.observableArray();
    that.error = ko.observableArray();

    var recipesUri = '/api/yeasts/';

    function getAllYeast() {
        BEER.utils.ajaxHelper(recipesUri, 'GET', null,that).done(function (data) {
            that.yeast(data);
        });
    }

    // Fetch the initial data.
    getAllYeast();
}

ko.applyBindings(new BEER.yeastViewModel(), document.getElementById('yeast'));
