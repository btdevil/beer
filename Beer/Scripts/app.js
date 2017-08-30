var BEER = window.BEER || {};

BEER.utils = (function () {
    var process = {
        ajaxHelper: function (uri, method, data, self) {
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
    };
    return process;
})();

BEER.YeastModel = function (Yeast) {
    var self = this;
    self.Yeast = ko.observableArray(Yeast);
    self.error = ko.observableArray();

    var serviceUri = '/api/yeasts/';
    
    function getAllYeast() {
        BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
            ko.mapping.fromJS(data, {}, self.Yeast);
        });
    }
    
    // Fetch the initial data.
    getAllYeast();
}

BEER.MaltModel = function (Malt) {
    var self = this;
    self.Malt = ko.observableArray(Malt);
    self.error = ko.observableArray();

    var serviceUri = '/api/maltgenerics/';
    
    function getAllMalts() {
        BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
            ko.mapping.fromJS(data, {}, self.Malt);
        });
    }
    
    // Fetch the initial data.
    getAllMalts();
}

BEER.HopModel = function (Hop) {
    var self = this;
    self.Hop = ko.observableArray(Hop);
    self.error = ko.observableArray();

    var serviceUri = '/api/hops/';
    
    function getAllHops() {
        BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
            ko.mapping.fromJS(data, {}, self.Hop);
        });
    }
    
    // Fetch the initial data.
    getAllHops();
}

BEER.RecipeModel = function (Recipe) {
    var self = this;
    self.Recipe = ko.observableArray(Recipe);
    self.error = ko.observableArray();
    self.detail = ko.observable();

    var recipesUri = '/api/recipes/';
    
    self.getRecipeDetail = function (item) {
        BEER.utils.ajaxHelper(recipesUri + item.id(), 'GET', null, self).done(function (data) {
            self.detail(data);
        });
    }
}

BEER.sliderModel = function (min, max) {
    var self = this;

    self.min = ko.observable(min);
    self.max = ko.observable(max);
}

ko.bindingHandlers.rangeSlider = {
    init: function (element, valueAccessor, allBindingsAccesor, viewModel, bindingContext) {
        var params = valueAccessor();
        
        $(element).noUiSlider({
            start: [params.minSlider, params.maxSlider],
            range: {
                'min': params.minValue(),
                'max': params.maxValue()
            },
            pips: {
                mode: 'range',
                density: 3
            },
            step: params.step,
            format: wNumb({
                decimals: params.decimal,
                postfix: params.suffix
            })
        });

        $(element).on({
            set: function (event, ui) {
                params.minValue(ui[0]);
                params.maxValue(ui[1]);
            }
        });

    },
    update: function (element, valueAccessor, allBindingsAccesor, viewModel, bindingContext) {
        var params = valueAccessor();
        var range = [params.minValue(), params.maxValue()];
        $(element).val(range);
    }
}

BEER.MasterViewModel = function () {
    var self = this;
    self.Yeasts = new BEER.YeastModel();
    self.Malts = new BEER.MaltModel();
    self.Hops = new BEER.HopModel();
    self.Recipes = new BEER.RecipeModel();
    self.abvSlider = new BEER.sliderModel(0, 50);
    self.ibuSlider = new BEER.sliderModel(0, 441);
    self.error = ko.observableArray();

    self.searchRecipes = function (formElement) {
        var searchQuery = "?";
        console.log("searching");

        $(formElement[0].selectedOptions).each(function () {
            searchQuery += 'maltid=' + $(this).val() + '&';
        });

        $(formElement[1].selectedOptions).each(function () {
            searchQuery += 'hopid=' + $(this).val() + '&';
        });

        $(formElement[2].selectedOptions).each(function () {
            searchQuery += 'yeastid=' + $(this).val() + '&';
        });

        console.log(searchQuery);

        var serviceUri = '/api/recipes' + searchQuery;

        BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
            ko.mapping.fromJS(data, {}, self.Recipes.Recipe);
        });

        if ($('#searchPanelCollapse').hasClass('in')) {
            $('#searchPanelCollapse').collapse('toggle');
        }

        if ($('#resultsPanelCollapse').hasClass('in') === false) {
            $('#resultsPanelCollapse').collapse('toggle');
        }

        console.log(self.Recipes);
    }
}


ko.applyBindings(new BEER.MasterViewModel());


//BEER.ViewModel = function () {
//    var self = this;
//    self.recipes = ko.observableArray();
//    self.malts = ko.observableArray();
//    self.yeast = ko.observableArray();
//    self.hops = ko.observableArray();
//    self.error = ko.observable();

//    var recipesUri = '/api/recipes/';

//    function getAllRecipes() {
//        BEER.utils.ajaxHelper(recipesUri, 'GET', null, self).done(function (data) {
//            self.recipes(data);
//        });
//    }

//    // Fetch the initial data.
//    getAllRecipes();

//    self.detail = ko.observable();

//    self.getRecipeDetail = function (item) {
//        BEER.utils.ajaxHelper(recipesUri + item.id, 'GET', null, self).done(function (data) {
//            self.detail(data);
//        });
//    }
//};

////ko.applyBindings(new BEER.ViewModel(), document.getElementById('recipes'));

//BEER.maltViewModel = function () {
//    var that = this;
//    that.malts = ko.observableArray();
//    that.error = ko.observableArray();

//    var recipesUri = '/api/maltgenerics/';

//    function getAllMalts() {
//        BEER.utils.ajaxHelper(recipesUri, 'GET', null,that).done(function (data) {
//            that.malts(data);
//        });
//    }

//    // Fetch the initial data.
//    getAllMalts();
//}

//ko.applyBindings(new BEER.maltViewModel(), document.getElementById('malts'));

//BEER.hopViewModel = function () {
//    var that = this;
//    that.hops = ko.observableArray();
//    that.error = ko.observableArray();

//    var recipesUri = '/api/hops/';

//    function getAllHops() {
//        BEER.utils.ajaxHelper(recipesUri, 'GET', null,that).done(function (data) {
//            that.hops(data);
//        });
//    }

//    // Fetch the initial data.
//    getAllHops();
//}

//ko.applyBindings(new BEER.hopViewModel(), document.getElementById('hops'));

//BEER.yeastViewModel = function () {
//    var that = this;
//    that.yeast = ko.observableArray();
//    that.error = ko.observableArray();

//    var recipesUri = '/api/yeasts/';

//    function getAllYeast() {
//        BEER.utils.ajaxHelper(recipesUri, 'GET', null,that).done(function (data) {
//            that.yeast(data);
//        });
//    }

//    // Fetch the initial data.
//    getAllYeast();
//}

//ko.applyBindings(new BEER.yeastViewModel(), document.getElementById('yeast'));
