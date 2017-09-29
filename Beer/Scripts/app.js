var BEER = window.BEER || {};
BEER.components = {};

BEER.utils = (function () {
    var process = {
        ajaxHelper: function (uri, method, data, self, type) {
            var dType = typeof type === 'undefined' ? 'json' : type;
            var cTypeAccepts = typeof type === 'undefined' ? 'application/json' : 'application/'+ type +', text/'+ type +', */*'
            self.error(''); // Clear error message
            return $.ajax({
                headers: {
                    Accept: cTypeAccepts
                },
                type: method,
                url: uri,
                dataType: dType,
                contentType: 'application/' + dType,
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

BEER.components.slideIn = (function () {
    var process = {
        init: function () { },
        slideIn: function () { },
        slideOut: function () { }
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
            self.groupResults = ko.observable('true');
            self.hasAdjuctsQuery = ko.observable('N');
            self.includeDryOrWetSubs = ko.observable(true);
            self.includeManufacturerSubs = ko.observable(false);
            self.includeSameManufacturerSubs = ko.observable(false);
            self.yeastQueryComplete = ko.observable(true);
            self.YeastSubs = ko.observableArray([]);
            self.fullYeastQuery = ko.observableArray([]);
            self.recipeQuery = ko.computed(function () {
                var rQuery = "?";
                var BU = BEER.utils;

                rQuery = rQuery + BU.multiSelectQueryBuilder(self.maltQuery, 'maltid');
                rQuery = rQuery + BU.multiSelectQueryBuilder(self.hopQuery, 'hopid');
                if (self.groupResults() === 'false') {
                    rQuery = rQuery + BU.multiSelectQueryBuilder(self.fullYeastQuery, 'yeastid');
                }

                rQuery = rQuery + BU.sliderQueryBuilder(self.abvSlider, 'abvmin', 'abvmax');
                rQuery = rQuery + BU.sliderQueryBuilder(self.ibuSlider, 'ibumin', 'ibumax');
                rQuery = rQuery + BU.sliderQueryBuilder(self.ebcSlider, 'ebcmin', 'ecbmax');
                rQuery = rQuery + BU.sliderQueryBuilder(self.fermentSlider, 'fermentmin', 'fermentmax');

                if (self.hasAdjuctsQuery() === 'N' || self.hasAdjuctsQuery() === 'Y') {
                    rQuery += 'hasAdjuncts=' + self.hasAdjuctsQuery();
                }

                return rQuery;
            });
            self.error =  ko.observableArray();

            self.getAllSubs = function () {
                if (self.includeDryOrWetSubs() === true || self.includeManufacturerSubs() === true || self.includeSameManufacturerSubs() === true) {
                    ko.utils.arrayForEach(self.yeastQuery(), function (yeast) {
                        self.yeastQueryComplete(false);
                        getSubYeasts(yeast);
                    });
                } else {
                    self.yeastQueryComplete(true);
                    populateFullYeastQuery();
                }
            };
            self.addPales = function () {
                self.maltQuery.push(1, 38, 44, 47, 70);
            };
            self.addExtraPales = function () {
                self.maltQuery.push(37,34,69);
            };
            self.addCrystal = function () {
                self.maltQuery.push(27,28,29,46,73)
            };
            self.addDarkCrystal = function () {
                self.maltQuery.push(32,68,83)
            };

            self.addMyIngredients = function () {
                self.addPales();
                self.addExtraPales();
                self.addCrystal();
                self.addDarkCrystal();

                self.maltQuery.push(19, 66, 64, 49, 18, 40, 41, 42);
                self.hopQuery.push(3, 20, 10, 43, 44, 59);
                self.yeastQuery.push(35);
            };

            self.reset = function () {
                self.maltQuery.removeAll();
                self.hopQuery.removeAll();
                self.yeastQuery.removeAll();
                self.groupResults('true');
                self.hasAdjuctsQuery('N');
                self.includeDryOrWetSubs(true);
                self.includeManufacturerSubs(false);
                self.includeSameManufacturerSubs(false);
                self.YeastSubs.removeAll();
                self.fullYeastQuery.removeAll();
                self.abvSlider.min(0);
                self.abvSlider.max(20);
                self.ibuSlider.min(0);
                self.ibuSlider.max(440);
                self.ebcSlider.min(0);
                self.ebcSlider.max(500);
                self.fermentSlider.min(0);
                self.fermentSlider.max(30);
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
                        self.yeastQueryComplete(true);
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
            self.ysq = parent.SearchQuery.fullYeastQuery;
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
            self.yeastSubMatched = ko.computed(function () {
                var isExactMatch = false;
                var isSubMatched = false;
                var isMatched = false;

                for (var i = 0, iLen = self.ysq().length; i < iLen; i++) {
                    if (self.ysq()[i] === self.yeastID()) {
                        isSubMatched = true;
                        break;
                    }
                }

                if (isSubMatched === true) {
                    for (var i = 0, iLen = self.yq().length; i < iLen; i++) {
                        if (self.yq()[i] === self.yeastID()) {
                            isExactMatch = true;
                            break;
                        }
                    }
                }

                if (isSubMatched === true && isExactMatch === false) {
                    isMatched = true;
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

                    result.reduce(function (res, value, ss, xx) {
                        if (!res[value.hopName()]) {
                            //create hop object if it doesn't exsist, so we can access the weight by hopNamr
                            res[value.hopName()] = {
                                weight: 0,
                                hopName: value.hopName()
                            };
                            //add hop to hopArray with a *pointer* to the hop object in the reduced array. The weight will update in hopArray as it's totalled as it's a pointer rather than a copy.
                            hopArray.push(res[value.hopName()])
                        }
                        res[value.hopName()].weight += value.weight()
                        return res;
                    }, {});
                }
                return hopArray;
            });
            self.yeastCss = ko.pureComputed(function () {
                var subCssClass = 'warning';
                var matchedClass = 'sucess';
                var notMatched = 'danger';
                var css = matchedClass;
                if (self.yeastSubMatched() === true) {
                    css = subCssClass;
                } else if (self.yeastMatched() === false) {
                    css = notMatched;
                }

                return css
            }, self);
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
    self.sort = ko.observable('');
    self.searchHasRun = ko.observable(false);
    self.queryTimeout = ko.observable();

    var recipesUri = '/api/recipes/';

    self.searchRecipes = function () {
        showLoading();
        self.sort('');
        self.SearchQuery.YeastSubs.removeAll();
        self.SearchQuery.getAllSubs();

        self.queryTimeout(setInterval(function () {

            if (self.SearchQuery.yeastQueryComplete() === true) {

                clearInterval(self.queryTimeout())

                if ($('.slidein-master').hasClass('slidingout') && $('.slidein-child').hasClass('slidingin ')) {
                    self.slideOut();
                }

                if (self.SearchQuery.groupResults() === 'true') {
                    recipeMatcher();
                } else {
                    basicSearchRecipes();
                }

                if ($('#resultsPanelCollapse').hasClass('in') === false) {
                    $('#resultsPanelCollapse').collapse('toggle');
                }

                if ($('#searchPanelCollapse').hasClass('in') === true) {
                    $('#searchPanelCollapse').collapse('toggle');
                }
            }

        }, 200));
    }

    self.slideIn = function () {
        $('.slidein-child').removeClass('slidingout');
        $('.slidein-master').removeClass('slidingin');
        $('.slidein-child').addClass('slidingin');
        $('.slidein-master').addClass('slidingout');
    };

    self.slideOut = function () {
        $('.slidein-child').removeClass('slidingin');
        $('.slidein-master').removeClass('slidingout');
        $('.slidein-child').addClass('slidingout');
        $('.slidein-master').addClass('slidingin');
    };

    self.getRecipeDetail = function (item) {

        BEER.utils.ajaxHelper(recipesUri + item.id(), 'GET', null, self).done(function (data) {
            console.log('did run');
            var formattedData = { 'SelectedRecipe': data };
            ko.mapping.fromJS(formattedData, BEER.Mappings.selectedRecipeMapping, self);
            self.slideIn();
        });

        return true;

    };

    self.doSort = function () {
        var selectValue = self.sort();

        switch (selectValue) {
            case 'AbvAsc':
                sortRecipesAbvAsc();
                break;
            case 'AbvDesc':
                sortRecipesAbvDesc();
                break;
            case 'NameAsc':
                sortRecipesNameAsc();
                break;
            default:
                sortDefault();
                break;
        }

        return true;
    }

    self.beerXml = function (item) {
        window.location = recipesUri + item.id() + '/BeerXml';
        //BEER.utils.ajaxHelper(recipesUri + item.id() + '/BeerXml', 'GET', null, self, 'xml').done(function (data) {
        //    console.log('did run xml');
        //    var formattedData = { 'SelectedRecipe': data };
        //    console.log(data);
        //     document.open('data:text/octet-stream,' + encodeURIComponent(data));
        //});
    };

    function findMatches() {
        var recipe = self.allRecipes();
        var queriedMalts = [];
        var queriedHops = [];
        var queriedYeasts = [];
        var malts = [];
        var hops = [];
        var yeasts = [];
        var maltNonMatchCounter = [];
        var maltIds = [];
        var hopNonMatchCounter = [];
        var hopIds = [];
        var yeastIds = [];
        var yeastNonMatchCounter = [];
        var totalCount = [];

        for (var i = 0, iLen = recipe.length; i < iLen; i++) {
            malts = recipe[i].recipe_Malts();
            hops = recipe[i].recipe_Hops();
            yeasts = recipe[i].yeastID();

            queriedMalts = self.SearchQuery.maltQuery();
            queriedHops = self.SearchQuery.hopQuery();
            queriedYeasts = self.SearchQuery.fullYeastQuery();
            maltNonMatchCounter = []
            maltIds = [];
            hopNonMatchCounter = [];
            hopIds = [];
            yeastNonMatchCounter = [];
            yeastIds = [];

            for (var j = 0, jLen = malts.length; j < jLen; j++) {
                maltIds.push(malts[j].maltGenericID());
            }

            for (var j = 0, jLen = hops.length; j < jLen; j++) {
                hopIds.push(hops[j].hopID());
            }

            hopIds = hopIds.filter(function (elem, index, self) {
                return index == self.indexOf(elem);
            });

            yeastIds.push(yeasts);

            if (queriedMalts.length > 0) {
                maltNonMatchCounter = $.grep(maltIds, function (el) { return $.inArray(el, queriedMalts) == -1; });
            } else {
                maltNonMatchCounter = maltIds;
            }

            if (queriedHops.length > 0) {
                hopNonMatchCounter = $.grep(hopIds, function (el) { return $.inArray(el, queriedHops) == -1; });
            } else {
                hopNonMatchCounter = hopIds;
            }

            if (queriedYeasts.length > 0) {
                yeastNonMatchCounter = $.grep(yeastIds, function (el) { return $.inArray(el, queriedYeasts) == -1; });
            } else {
                yeastNonMatchCounter = yeastIds
            }

            totalCount = maltNonMatchCounter.concat(hopNonMatchCounter);

            totalCount = totalCount.concat(yeastNonMatchCounter);

            if (totalCount.length === 0) {
                self.Recipes.push(recipe[i]);
            } else if (totalCount.length === 1) {
                self.recipeMatch1.push(recipe[i]);
            } else if (totalCount.length === 2) {
                self.recipeMatch2.push(recipe[i]);
            } else if (totalCount.length === 3) {
                self.recipeMatch3.push(recipe[i]);
            } else if (totalCount.length === 4) {
                self.recipeMatch4.push(recipe[i]);
            } else {
                self.recipeMatch5.push(recipe[i]);
            }
        }

    };

    function basicSearchRecipes(formElement) {
        //self.SearchQuery.buildSearchQuery();
        resetRecipeModels();

        var serviceUri = '/api/recipes' + self.SearchQuery.recipeQuery() + '&getFullRecipe=false';

        //console.log(serviceUri);

        BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
            //ko.mapping.fromJS(data, {}, self.Recipes.Recipe);
            self.searchHasRun(true);
            var formattedData = { 'Recipes': data };
            ko.mapping.fromJS(formattedData, BEER.Mappings.recipeMapping, self);
            hideLoading();
        });
    };

    function recipeMatcher() {
        resetRecipeModels();
        var fullRecipeUri = 'api/recipes' + self.SearchQuery.recipeQuery() + '&getFullRecipe=true';
        BEER.utils.ajaxHelper(fullRecipeUri, 'GET', null, self).done(function (data) {
            //ko.mapping.fromJS(data, {}, self.Recipes.Recipe);
            self.searchHasRun(true);
            var formattedData = { 'allRecipes': data };
            ko.mapping.fromJS(formattedData, BEER.Mappings.allRecipesMapping, self);
            findMatches();
            hideLoading();
        });

    };

    function resetRecipeModels() {

        self.Recipes.removeAll();
        self.recipeMatch1.removeAll();
        self.recipeMatch2.removeAll();
        self.recipeMatch3.removeAll();
        self.recipeMatch4.removeAll();
        self.recipeMatch5.removeAll();
        self.SelectedRecipe(null);
        self.allRecipes.removeAll();
    };

    function sortRecipesAbvDesc() {
        self.Recipes.sort(function (a, b) {
            return b.abv() - a.abv();
        });

        if (self.recipeMatch1().length > 0) {
            self.recipeMatch1.sort(function (a, b) {
                return b.abv() - a.abv();
            });
        }
        if (self.recipeMatch2().length > 0) {
            self.recipeMatch2.sort(function (a, b) {
                return b.abv() - a.abv();
            });
        }
        if (self.recipeMatch3().length > 0) {
            self.recipeMatch3.sort(function (a, b) {
                return b.abv() - a.abv();
            });
        }
        if (self.recipeMatch4().length > 0) {
            self.recipeMatch4.sort(function (a, b) {
                return b.abv() - a.abv();
            });
        }
        if (self.recipeMatch5().length > 0) {
            self.recipeMatch5.sort(function (a, b) {
                return b.abv() - a.abv();
            });
        }

    };

    function sortRecipesAbvAsc() {
        self.Recipes.sort(function (a, b) {
            return a.abv() - b.abv();
        });

        if (self.recipeMatch1().length > 0) {
            self.recipeMatch1.sort(function (a, b) {
                return a.abv() - b.abv();
            });
        }
        if (self.recipeMatch2().length > 0) {
            self.recipeMatch2.sort(function (a, b) {
                return a.abv() - b.abv();
            });
        }
        if (self.recipeMatch3().length > 0) {
            self.recipeMatch3.sort(function (a, b) {
                return a.abv() - b.abv();
            });
        }
        if (self.recipeMatch4().length > 0) {
            self.recipeMatch4.sort(function (a, b) {
                return a.abv() - b.abv();
            });
        }
        if (self.recipeMatch5().length > 0) {
            self.recipeMatch5.sort(function (a, b) {
                return a.abv() - b.abv();
            });
        }

    };

    function sortRecipesNameAsc() {
        self.Recipes.sort(function (a, b) {
            if (a.name() < b.name()) return -1;
            if (a.name() > b.name()) return 1;
            return 0;
        });

        if (self.recipeMatch1().length > 0) {
            self.recipeMatch1.sort(function (a, b) {
                if (a.name() < b.name()) return -1;
                if (a.name() > b.name()) return 1;
                return 0;
            });
        }
        if (self.recipeMatch2().length > 0) {
            self.recipeMatch2.sort(function (a, b) {
                if (a.name() < b.name()) return -1;
                if (a.name() > b.name()) return 1;
                return 0;
            });
        }
        if (self.recipeMatch3().length > 0) {
            self.recipeMatch3.sort(function (a, b) {
                if (a.name() < b.name()) return -1;
                if (a.name() > b.name()) return 1;
                return 0;
            });
        }
        if (self.recipeMatch4().length > 0) {
            self.recipeMatch4.sort(function (a, b) {
                if (a.name() < b.name()) return -1;
                if (a.name() > b.name()) return 1;
                return 0;
            });
        }
        if (self.recipeMatch5().length > 0) {
            self.recipeMatch5.sort(function (a, b) {
                if (a.name() < b.name()) return -1;
                if (a.name() > b.name()) return 1;
                return 0;
            });
        }

    };

    function sortDefault() {
        self.Recipes.sort(function (a, b) {
            return a.id() - b.id();
        });

        if (self.recipeMatch1().length > 0) {
            self.recipeMatch1.sort(function (a, b) {
                return a.id() - b.id();
            });
        }
        if (self.recipeMatch2().length > 0) {
            self.recipeMatch2.sort(function (a, b) {
                return a.id() - b.id();
            });
        }
        if (self.recipeMatch3().length > 0) {
            self.recipeMatch3.sort(function (a, b) {
                return a.id() - b.id();
            });
        }
        if (self.recipeMatch4().length > 0) {
            self.recipeMatch4.sort(function (a, b) {
                return a.id() - b.id();
            });
        }
        if (self.recipeMatch5().length > 0) {
            self.recipeMatch5.sort(function (a, b) {
                return a.id() - b.id();
            });
        }

    };

    function showLoading() {
        $('#spinner').show();
        $('#spinner').addClass('spinner');
        $('#recipeList').hide();
        $('#recipeDetail').hide();
    };

    function hideLoading() {
        $('#spinner').removeClass('spinner');
        $('#spinner').hide();
        $('#recipeList').show();
        $('#recipeDetail').show();
    }
}

ko.applyBindings(new BEER.MasterViewModel());


