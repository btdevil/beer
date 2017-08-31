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
        },
        sliderQueryBuilder: function (queryStr, model, txtMin, txtMax) {
            if (model.min() != model.minDefault) {
                queryStr += txtMin + '=' + model.min() + '&';
            }

            if (model.max() != model.maxDefault) {
                queryStr += txtMax + '=' + model.max() + '&';
            }
            return queryStr;
        },
        multiSelectQueryBuilder: function (queryStr, element, txt) {

            $(element.selectedOptions).each(function () {
                queryStr += txt + '=' + $(this).val() + '&';
            });

            return queryStr;
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
    self.minDefault = min;
    self.maxDefault = max;
}

ko.bindingHandlers.rangeSlider = {
    init: function (element, valueAccessor, allBindingsAccesor, viewModel, bindingContext) {
        var params = valueAccessor();

        $(element).noUiSlider({
            start: [params.minValue(), params.maxValue()],
            range: {
                'min': params.minSlider,
                'max': params.maxSlider
            },
            connect: true,
            step: params.step,
            format: wNumb({
                decimals: params.decimal
            })
        });

        $(element).noUiSlider_pips({
            mode: params.pipMode,
            values: params.pipValues,
            density: params.pipDensity,
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
    self.abvSlider = new BEER.sliderModel(0, 20);
    self.ibuSlider = new BEER.sliderModel(0, 440);
    self.ebcSlider = new BEER.sliderModel(0, 500);
    self.fermentSlider = new BEER.sliderModel(0, 30);
    self.error = ko.observableArray();

    self.searchRecipes = function (formElement) {
        var searchQuery = "?";
        var BU = BEER.utils;
        console.log("searching");

        searchQuery = BU.multiSelectQueryBuilder(searchQuery, formElement[0], 'maltid');
        searchQuery = BU.multiSelectQueryBuilder(searchQuery, formElement[1], 'hopid');
        searchQuery = BU.multiSelectQueryBuilder(searchQuery, formElement[2], 'yeastid');

        searchQuery = BU.sliderQueryBuilder(searchQuery, self.abvSlider, 'abvmin', 'abvmax');
        searchQuery = BU.sliderQueryBuilder(searchQuery, self.ibuSlider, 'ibumin', 'ibumax');
        searchQuery = BU.sliderQueryBuilder(searchQuery, self.ebcSlider, 'ebcmin', 'ecbmax');
        searchQuery = BU.sliderQueryBuilder(searchQuery, self.fermentSlider, 'fermentmin', 'fermentmax');

        if (formElement['hasAdjuncts'].value === 'N' || formElement['hasAdjuncts'].value === 'Y') {
            searchQuery += 'hasAdjuncts=' + formElement['hasAdjuncts'].value;
        }

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

    }
}


ko.applyBindings(new BEER.MasterViewModel());


