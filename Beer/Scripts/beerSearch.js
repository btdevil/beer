BEER.MasterViewModel = function (data) {
    var self = this;
    ko.mapping.fromJS(data, BEER.Mappings.recipe1Mapping, self);
    ko.mapping.fromJS(data, BEER.Mappings.recipe2Mapping, self);
    self.Yeasts = new BEER.ViewModels.Yeast();
    self.Malts = new BEER.ViewModels.Malt();
    self.Hops = new BEER.ViewModels.Hop();
    self.ebcColours = new BEER.ViewModels.EbcColour();
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
    self.myMalts = new BEER.ViewModels.MyMalts();
    self.myHops = new BEER.ViewModels.MyHops();
    self.myYeasts = new BEER.ViewModels.MyYeasts();

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

    self.toggle = function () {
        $('.slidein-child').toggleClass('slideshow');
        $('.slidein-master').toggleClass('slidehide');
        $('.slidein').toggleClass('show-overflow');
    }

    self.getRecipeDetail = function (item) {

        BEER.utils.ajaxHelper(recipesUri + item.id(), 'GET', null, self).done(function (data) {
            console.log('did run');
            var formattedData = { 'SelectedRecipe': data };
            ko.mapping.fromJS(formattedData, BEER.Mappings.selectedRecipeMapping, self);
            self.toggle();
        });

        return true;

    };

    self.doSort = function (e) {
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

        return false;
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

    self.stopCollapse = function (data, e) {
        e.stopPropagation();
    };

    self.addMyIngredients = function () {
        self.myMalts.getMyMalts(self.Malts.queryLoaded);
        self.myHops.getMyHops(self.Hops.queryLoaded);
        self.myYeasts.getMyYeasts(self.Yeasts.queryLoaded);
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

        //changed to true to handle recipe searching on yeast only
        var serviceUri = '/api/recipes' + self.SearchQuery.recipeQuery() + '&getFullRecipe=true';

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
        $('#recipeList').addClass('hidden');
        $('#recipeDetail').addClass('hidden');
    };

    function hideLoading() {
        $('#spinner').removeClass('spinner');
        $('#spinner').hide();
        $('#recipeList').removeClass('hidden');
        $('#recipeDetail').removeClass('hidden');
    }
}

ko.applyBindings(new BEER.MasterViewModel());