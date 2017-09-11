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
        sliderQueryBuilder: function (model, txtMin, txtMax) {
            var queryString = '';
            if (model.min() != model.minDefault) {
                queryString += txtMin + '=' + model.min() + '&';
            }

            if (model.max() != model.maxDefault) {
                queryString += txtMax + '=' + model.max() + '&';
            }

            return queryString;
        },
        multiSelectQueryBuilder: function (array, txt) {
            var queryStr = '';
            for (var i = 0, iLen = array().length; i < iLen; i++){
                queryStr += txt + '=' + array()[i] + '&';
            }

            return queryStr;

        },
        groupBy: function (xs, key) {
            return xs.reduce(function (rv, x) {
                (rv[x[key()]] = rv[x[key()]] || []).push(x);
                return rv;
            }, {});
        }
    };
    return process;
})();

BEER.ViewModels = (function () {

    var process = {
        Yeast: function Yeast() {
            var self = this;
            self.AllYeast = ko.observableArray();
            self.WetDryFilter = ko.observable('');
            self.error = ko.observableArray();
            self.Yeast = ko.computed(function () {
                var filter = self.WetDryFilter();

                if (filter === '') {
                    return self.AllYeast();
                } else {
                    var filtered = ko.utils.arrayFilter(self.Yeast(), function (item) {
                        return (item.isDry() === filter);
                    });

                    return filtered;
                }
            }, self);

            var serviceUri = '/api/yeasts/';

            function getAllYeast() {
                BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
                    ko.mapping.fromJS(data, BEER.Mappings.yeastMaping, self.AllYeast);
                });
            }

            // Fetch the initial data.
            getAllYeast();
        },
        Malt: function Malt() {
            var self = this;
            self.Malt = ko.observableArray();
            self.error = ko.observableArray();

            var serviceUri = '/api/maltgenerics/';

            function getAllMalts() {
                BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
                    ko.mapping.fromJS(data, BEER.Mappings.maltMaping, self.Malt);
                });
            }

            // Fetch the initial data.
            getAllMalts();
        },
        Hop: function Hop() {
            var self = this;
            self.Hop = ko.observableArray();
            self.error = ko.observableArray();

            var serviceUri = '/api/hops/';

            function getAllHops() {
                BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
                    ko.mapping.fromJS(data, BEER.Mappings.hopMaping, self.Hop);
                });
            }

            // Fetch the initial data.
            getAllHops();
        },
        SearchQuery: function SearchQuery() {
            var self = this;

            self.abvSlider = new BEER.Models.Slider(0, 20);
            self.ibuSlider = new BEER.Models.Slider(0, 440);
            self.ebcSlider = new BEER.Models.Slider(0, 500);
            self.fermentSlider = new BEER.Models.Slider(0, 30);
            self.maltQuery = ko.observableArray([]);
            self.hopQuery = ko.observableArray([]);
            self.yeastQuery = ko.observableArray([]);
            self.yeastMandatory = ko.observable('true');
            self.groupResults = ko.observable('false');
            self.hasAdjuctsQuery = ko.observable('');
            self.includeDryOrWetSubs = ko.observable(false);
            self.includeManufacturerSubs = ko.observable(false);
            self.includeSameManufacturerSubs = ko.observable(false);
            self.YeastSubs = ko.observableArray([]);
            self.fullYeastQuery = ko.observableArray([]);
            self.recipeQuery = ko.computed(function () {
                var rQuery = "?";
                var BU = BEER.utils;

                rQuery = rQuery + BU.multiSelectQueryBuilder(self.maltQuery, 'maltid');
                rQuery = rQuery + BU.multiSelectQueryBuilder(self.hopQuery, 'hopid');
                rQuery = rQuery + BU.multiSelectQueryBuilder(self.fullYeastQuery, 'yeastid');

                rQuery = rQuery + BU.sliderQueryBuilder(self.abvSlider, 'abvmin', 'abvmax');
                rQuery = rQuery + BU.sliderQueryBuilder(self.ibuSlider, 'ibumin', 'ibumax');
                rQuery = rQuery + BU.sliderQueryBuilder(self.ebcSlider, 'ebcmin', 'ecbmax');
                rQuery = rQuery + BU.sliderQueryBuilder(self.fermentSlider, 'fermentmin', 'fermentmax');

                if (self.hasAdjuctsQuery() === 'N' || self.hasAdjuctsQuery() === 'Y') {
                    rQuery += 'hasAdjuncts=' + self.hasAdjuctsQuery();
                }

                return rQuery;
            });
            self.recipeMandatoryQuery = ko.computed(function () {
                var rQuery = '?';
                var BU = BEER.utils;
                if (self.yeastMandatory === 'true') {
                    rQuery = rQuery + BU.multiSelectQueryBuilder(self.yeastQuery, 'yeastid');
                }
                rQuery = rQuery + BU.sliderQueryBuilder(self.abvSlider, 'abvmin', 'abvmax');
                rQuery = rQuery + BU.sliderQueryBuilder(self.ibuSlider, 'ibumin', 'ibumax');
                rQuery = rQuery + BU.sliderQueryBuilder(self.ebcSlider, 'ebcmin', 'ecbmax');
                rQuery = rQuery + BU.sliderQueryBuilder(self.fermentSlider, 'fermentmin', 'fermentmax');

                if (self.hasAdjuctsQuery() === 'N' || self.hasAdjuctsQuery() === 'Y') {
                    rQuery += 'hasAdjuncts=' + self.hasAdjuctsQuery();
                }

                rQuery += '&getfullrecipe=true';
                return rQuery;
            });
            self.error =  ko.observableArray();

            self.getAllSubs = function () {
                if (self.includeDryOrWetSubs() === true || self.includeManufacturerSubs() === true || self.includeSameManufacturerSubs() === true) {
                    ko.utils.arrayForEach(self.yeastQuery(), function (yeast) {
                        getSubYeasts(yeast);
                    });
                } else {
                    populateFullYeastQuery();
                }
            };
            self.addPales = function () {
                self.maltQuery.push(1, 38, 44, 47, 70);
            };
            self.addExtraPales = function () {
                self.maltQuery.push(37,34,69);
            };


            function populateFullYeastQuery() {
                self.fullYeastQuery.removeAll();

                ko.utils.arrayForEach(self.yeastQuery(), function (yeast) {
                    self.fullYeastQuery.push(yeast);
                });

                if (self.includeDryOrWetSubs() || self.includeManufacturerSubs() || self.includeSameManufacturerSubs()) {
                    ko.utils.arrayForEach(self.YeastSubs(), function (yeastSub) {
                        if (self.includeDryOrWetSubs() && yeastSub.isWetDry() === 'Y') {
                             self.fullYeastQuery.push(yeastSub.yeastSubID());
                        }

                        if (self.includeManufacturerSubs() && yeastSub.isManuSub() === 'Y') {
                             self.fullYeastQuery.push(yeastSub.yeastSubID());
                        }

                        if (self.includeSameManufacturerSubs() && yeastSub.isSameManu() === 'Y') {
                             self.fullYeastQuery.push(yeastSub.yeastSubID());
                        }
                    })
                }
            };
            
            function getSubYeasts(id) {
                var serviceUri = '/api/YeastSubstitutes/';
                BEER.utils.ajaxHelper(serviceUri + id, 'GET', null, self).done(function (data) {
                    //console.log('did run');
                    //var formattedData = { 'SelectedRecipe': data };
                    //self.Users.push(ko.mapping.fromJS(data, mapping));
                    ko.utils.arrayForEach(data, function (item) {
                        self.YeastSubs.push(ko.mapping.fromJS(item, BEER.Mappings.YeastSubMapping));
                    });

                    populateFullYeastQuery();
                    
                });
            }
        }
    };

    return process
})();

BEER.Models = (function () {
    var process = {
        Recipe: function Recipe(data, parent) {
            var self = this;
            self.mq = parent.SearchQuery.maltQuery;
            self.hq = parent.SearchQuery.hopQuery;
            self.yq = parent.SearchQuery.yeastQuery;
            self.formattedABV = ko.computed(function () {
                return self.abv().toFixed(1) + '%';
            }, self);
            self.yeastMatched = ko.computed(function () {
                var isMatched = false;
                for (var i = 0, iLen = self.yq().length; i < iLen; i++) {
                    if (self.yq()[i] === self.yeastID()) {
                        isMatched = true;
                        break;
                    }
                }
                return isMatched;
            }, self);
            self.recipe_Hops = ko.observableArray([]);
            self.recipe_Malts = ko.observableArray([]);
            ko.mapping.fromJS(data, BEER.Mappings.hopMaltMapping, self);
            self.totalHopsBill = ko.computed(function () {
                var totalWeight = 0;
                if (self.recipe_Hops() !== null) {
                    self.recipe_Hops().forEach(function (element) {
                        if (element.hopName().indexOf('*') === -1) {
                            totalWeight += element.weight();
                        }
                    });
                }
                return totalWeight;
            });
            self.totalEachHop = ko.computed(function () {
                var hopArray = [];
                var result = [];
                if (self.recipe_Hops() !== null) {
                    result = self.recipe_Hops.slice(0);

                    result.reduce(function (res, value) {
                        if (!res[value.hopName()]) {
                            res[value.hopName()] = {
                                weight: 0,
                                hopName: value.hopName()
                            };
                            hopArray.push(res[value.hopName()])
                        }
                        res[value.hopName()].weight += value.weight()
                        return res;
                    }, {});
                }
                return hopArray;
            });
        },
        Slider: function Slider(min, max) {
            var self = this;

            self.min = ko.observable(min);
            self.max = ko.observable(max);
            self.minDefault = min;
            self.maxDefault = max
        },
       
        Malt: function Malt(data, parent) {
            var self = this;
            ko.mapping.fromJS(data, {}, self);
            self.mq = typeof parent !== 'undefined' ? parent.mq : ko.observableArray([]);
            self.isMatched = ko.computed(function () {
                var isMatched = false;
                for (var i = 0, iLen = self.mq().length; i < iLen; i++) {
                    if (self.mq()[i] === self.maltGenericID()) {
                        isMatched = true;
                        break;
                    }
                }
                return isMatched;
            }, self);
        },
        Hop: function Hop(data, parent) {
            var self = this;
            ko.mapping.fromJS(data, {}, self);
            self.hq = typeof parent !== 'undefined' ? parent.hq : ko.observableArray([]);
            self.isMatched = ko.computed(function () {
                var isMatched = false;
                for (var i = 0, iLen = self.hq().length; i < iLen; i++) {
                    if (self.hq()[i] === self.hopID()) {
                        isMatched = true;
                        break;
                    }
                }
                return isMatched;
            }, self);
        },
        Yeast: function Yeast(data) {
            var self = this;
            ko.mapping.fromJS(data, {}, self);

        },
        YeastSubs: function (data) {
            var self = this;
            ko.mapping.fromJS(data, {}, self);
        },
        TotalHopWeight: function (data) {
            var self = this;
            self.name = data.hopName;
            self.totalWeight = data.weight;
        }
    };
    return process;
})();

BEER.Mappings = (function () {
    var process = {
        recipeMapping: {
            'Recipes': {
                create: function (options) {
                    return new BEER.Models.Recipe(options.data, options.parent);
                }
            }
        },
        allRecipesMapping: {
            'allRecipes': {
                create: function (options) {
                    return new BEER.Models.Recipe(options.data, options.parent);
                }
            }
        },
        selectedRecipeMapping: {
            'SelectedRecipe': {
                create: function (options) {
                    return new BEER.Models.Recipe(options.data, options.parent);
                }
            }
        },
        hopMaltMapping: {
            'recipe_Hops': {
                create: function (options) {
                    return new BEER.Models.Hop(options.data, options.parent);
                }
            },
            'recipe_Malts': {
                create: function (options) {
                    return new BEER.Models.Malt(options.data, options.parent);
                }
            }
        },
        maltMaping: {
            create: function (options) {
                return new BEER.Models.Malt(options.data);
            }
        },
        hopMaping: {
            create: function (options) {
                return new BEER.Models.Hop(options.data);
            }
        },
        YeastMaping: {
            create: function (options) {
                return new BEER.Models.Yeast(options.data);
            }

        },
        YeastSubMapping: {
            create: function (options) {
                return new BEER.Models.YeastSubs(options.data);
            }
        }
    };
    return process;
})()

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

ko.bindingHandlers.select2 = {
    init: function (element, valueAccessor, allBindingsAccesor, viewModel, bindingContext) {
        $(element).select2({
            closeOnSelect: false
        });
    },
    update: function (element, valueAccessor, allBindingsAccesor, viewModel, bindingContext) {
        var params = valueAccessor();
        var selection = params.selection();
        var select2 = $(element).data("select2");
        $(element).val(selection).trigger('change');
    }
}

BEER.MasterViewModel = function (data) {
    var self = this;
    ko.mapping.fromJS(data, BEER.Mappings.recipe1Mapping, self);
    ko.mapping.fromJS(data, BEER.Mappings.recipe2Mapping, self);
    self.Yeasts = new BEER.ViewModels.Yeast();
    self.Malts = new BEER.ViewModels.Malt();
    self.Hops = new BEER.ViewModels.Hop();
    self.Recipes = ko.observableArray();
    self.SelectedRecipe = ko.observable();
    self.error = ko.observableArray();
    self.allRecipes = ko.observableArray([]);
    self.recipeMatch1 = ko.observableArray([]);
    self.recipeMatch2 = ko.observableArray([]);
    self.recipeMatch3 = ko.observableArray([]);
    self.recipeMatch4 = ko.observableArray([]);
    self.recipeMatch5 = ko.observableArray([]);
    self.SearchQuery = new BEER.ViewModels.SearchQuery();

    var recipesUri = '/api/recipes/';

    self.searchRecipes = function () {
        self.SearchQuery.YeastSubs.removeAll();
        self.SearchQuery.getAllSubs();

        if (self.SearchQuery.groupResults() === 'true') {
            self.recipeMatcher();
        } else {
            self.basicSearchRecipes();
        }

        if ($('#resultsPanelCollapse').hasClass('in') === false) {
            $('#resultsPanelCollapse').collapse('toggle');
        }
    }

    self.basicSearchRecipes = function (formElement) {
        //self.SearchQuery.buildSearchQuery();
        self.resetRecipeModels();

        var serviceUri = '/api/recipes' + self.SearchQuery.recipeQuery() + '&getFullRecipe=false';

        BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
            //ko.mapping.fromJS(data, {}, self.Recipes.Recipe);
            var formattedData = { 'Recipes': data };
            ko.mapping.fromJS(formattedData, BEER.Mappings.recipeMapping, self);
        });
    }

    self.getRecipeDetail = function (item) {

        BEER.utils.ajaxHelper(recipesUri + item.id(), 'GET', null, self).done(function (data) {
            console.log('did run');
            var formattedData = { 'SelectedRecipe': data };
            ko.mapping.fromJS(formattedData, BEER.Mappings.selectedRecipeMapping, self);
        });
    }

    self.sortRecipes = function () {
        self.Recipes.sort(function (a, b) {
            return b.abv() - a.abv();
        });
    }

    self.findMatches = function () {
        var recipe = self.allRecipes();
        var queriedMalts = [];
        var queriedHops = [];
        var malts = [];
        var hops = [];
        var yeasts = [];
        var maltNonMatchCounter = [];
        var maltIds = [];
        var hopNonMatchCounter = [];
        var hopIds = [];
        var totalCount = [];

        for (var i = 0, iLen = recipe.length; i < iLen; i++) {
            malts = recipe[i].recipe_Malts();
            hops = recipe[i].recipe_Hops();

            queriedMalts = self.SearchQuery.maltQuery();
            queriedHops = self.SearchQuery.hopQuery();
            maltNonMatchCounter = []
            maltIds = [];
            hopNonMatchCounter = [];
            hopIds = [];

            for (var j = 0, jLen = malts.length; j < jLen; j++) {
                maltIds.push(malts[j].maltGenericID());
            }

            for (var j = 0, jLen = hops.length; j < jLen; j++) {
                hopIds.push(hops[j].hopID());
            }

            hopIds = hopIds.filter(function (elem, index, self) {
                return index == self.indexOf(elem);
            });

            if (queriedMalts.length > 0) {
                maltNonMatchCounter = $.grep(maltIds, function (el) { return $.inArray(el, queriedMalts) == -1; });
            }

            if (queriedHops.length > 0) {
                hopNonMatchCounter = $.grep(hopIds, function (el) { return $.inArray(el, queriedHops) == -1; });
            }

            totalCount = maltNonMatchCounter.concat(hopNonMatchCounter);

            if (totalCount.length === 0) {
                self.Recipes.push(recipe[i]);
            } else if (totalCount.length === 1) {
                self.recipeMatch1.push(recipe[i]);
            } else if (totalCount.length === 2) {
                self.recipeMatch2.push(recipe[i]);
            }else if (totalCount.length === 3) {
                self.recipeMatch3.push(recipe[i]);
            }else if (totalCount.length === 4) {
                self.recipeMatch4.push(recipe[i]);
            }else {
                self.recipeMatch5.push(recipe[i]);
            }
        }

    };

    self.recipeMatcher = function () {
        self.resetRecipeModels();
        var fullRecipeUri = 'api/recipes' + self.SearchQuery.recipeMandatoryQuery();
        BEER.utils.ajaxHelper(fullRecipeUri, 'GET', null, self).done(function (data) {
            //ko.mapping.fromJS(data, {}, self.Recipes.Recipe);
            var formattedData = { 'allRecipes': data };
            ko.mapping.fromJS(formattedData, BEER.Mappings.allRecipesMapping, self);
            self.findMatches();
        });

    };

    self.resetRecipeModels = function () {

        self.Recipes.removeAll();
        self.recipeMatch1.removeAll();
        self.recipeMatch2.removeAll();
        self.recipeMatch3.removeAll();
        self.recipeMatch4.removeAll();
        self.recipeMatch5.removeAll();
        self.SelectedRecipe(null);
        self.allRecipes.removeAll();
    };
}

ko.applyBindings(new BEER.MasterViewModel());


