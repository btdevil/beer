var BEER = window.BEER || {};
BEER.components = {};

BEER.utils = (function () {
    var process = {
        ebcHexMax: 70,
        srmConvert: 1.97,
        beerStyle: {
            ebc: { min: 0, max: 78.8 },
            gravity: { min: 0.995, max: 1.120 },
            abv: { min: 0, max: 19 },
            ibu: { min: 0, max: 120 },
            ebcRange: function () {
                return this.ebc.max - this.ebc.min;
            },
            gravityRange: function () {
                return this.gravity.max - this.gravity.min;
            },
            abvRange: function () {
                return this.abv.max - this.abv.min;
            },
            ibuRange: function () {
                return this.ibu.max - this.ibu.min;
            }
        },
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
        },
        calculateTop: function (max, high, range) {
            if (high > max) {
                return '0%';
            } else {
                return (((max - high) / range) * 100) + '%';
            }
        },
        calculateHeight: function (high, low, range) {
            return (((high - low) / range) * 100) + '%';
        },
        toast: function (elem) {
                elem[0].className = elem[0].className + " show-toast";
            setTimeout(function () {
                elem[0].className = elem[0].className.replace("show-toast", "");
            }, 3000);
        },
        scale: function (recipeToScale, scaleSize) {
            var batchSize = typeof recipeToScale.BatchSize !== 'undefined' ? recipeToScale.BatchSize() : recipeToScale.batchSize();
            var hopArray = typeof recipeToScale.Recipe_Hops !== 'undefined' ? recipeToScale.Recipe_Hops() : recipeToScale.recipe_Hops();
            var maltArray = typeof recipeToScale.Recipe_Malts !== 'undefined' ? recipeToScale.Recipe_Malts() : recipeToScale.recipe_Malts();
            var otherArray = typeof recipeToScale.Recipe_Others !== 'undefined' ? recipeToScale.Recipe_Others() : recipeToScale.recipe_Others();
            var hopWeight = null;
            var maltWeight = null;
            var otherWeight = null;

            var ratioNo = scaleSize / batchSize;

            for (var i = 0, iLen = hopArray.length; i < iLen; i++) {
                hopWeight = typeof recipeToScale.Recipe_Hops !== 'undefined' ? recipeToScale.Recipe_Hops()[i].Weight : recipeToScale.recipe_Hops()[i].weight;
                hopWeight(parseFloat((parseFloat(hopWeight()) * ratioNo).toFixed(2)));
            }

            for (var i = 0, iLen = maltArray.length; i < iLen; i++) {
                maltWeight = typeof recipeToScale.Recipe_Malts !== 'undefined' ? recipeToScale.Recipe_Malts()[i].Weight : recipeToScale.recipe_Malts()[i].weight;
                maltWeight(parseFloat((maltWeight()) * ratioNo).toFixed(2));
            }

            for (var i = 0, iLen = otherArray.length; i < iLen; i++) {
                otherWeight = typeof recipeToScale.Recipe_Others !== 'undefined' ? recipeToScale.Recipe_Others()[i].Weight : recipeToScale.Recipe_Others()[i].weight;
                otherWeight(parseFloat((otherWeight()[i].Weight()) * ratioNo).toFixed(2));
            }

            console.log(recipeToScale);
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
            self.queryLoaded = ko.observable(false);
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
                    self.queryLoaded(true);
                });
            }

            // Fetch the initial data.
            getAllYeast();
        },
        Malt: function Malt() {
            var self = this;
            self.Malt = ko.observableArray();
            self.queryLoaded = ko.observable(false);
            self.error = ko.observableArray();

            var serviceUri = '/api/maltgenerics/';

            function getAllMalts() {
                BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
                    ko.mapping.fromJS(data, BEER.Mappings.maltMaping, self.Malt);
                    self.queryLoaded(true);
                });
            }

            // Fetch the initial data.
            getAllMalts();
        },
        Hop: function Hop() {
            var self = this;
            self.Hop = ko.observableArray();
            self.queryLoaded = ko.observable(false);
            self.error = ko.observableArray();

            var serviceUri = '/api/hops/';

            function getAllHops() {
                BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
                    ko.mapping.fromJS(data, BEER.Mappings.hopMaping, self.Hop);
                    self.queryLoaded(true);
                });
            }

            // Fetch the initial data.
            getAllHops();
        },
        HopStep: function Hop() {
            var self = this;
            self.HopStep = ko.observableArray();
            self.queryLoaded = ko.observable(false);
            self.error = ko.observableArray();

            var serviceUri = '/api/hopsteps/';

            function getAllHopSteps() {
                BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
                    ko.mapping.fromJS(data, BEER.Mappings.hopStepMaping, self.HopStep);
                    self.queryLoaded(true);
                });
            }

            // Fetch the initial data.
            getAllHopSteps();
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
            self.styleQuery = ko.observableArray([]);
            self.groupResults = ko.observable('true');
            self.hasAdjuctsQuery = ko.observable('N');
            self.includeDryOrWetSubs = ko.observable(true);
            self.includeManufacturerSubs = ko.observable(false);
            self.includeSameManufacturerSubs = ko.observable(false);
            self.yeastQueryComplete = ko.observable(true);
            self.YeastSubs = ko.observableArray([]);
            self.fullYeastQuery = ko.observableArray([]);
            self.recipeName = ko.observable('');
            self.recipeQuery = ko.computed(function () {
                var rQuery = "?";
                var BU = BEER.utils;

                rQuery = rQuery + BU.multiSelectQueryBuilder(self.maltQuery, 'maltid');
                rQuery = rQuery + BU.multiSelectQueryBuilder(self.hopQuery, 'hopid');
                if (self.groupResults() === 'false') {
                    rQuery = rQuery + BU.multiSelectQueryBuilder(self.fullYeastQuery, 'yeastid');
                }

                rQuery = rQuery + BU.multiSelectQueryBuilder(self.styleQuery, 'beerstyleid');

                rQuery = rQuery + BU.sliderQueryBuilder(self.abvSlider, 'abvmin', 'abvmax');
                rQuery = rQuery + BU.sliderQueryBuilder(self.ibuSlider, 'ibumin', 'ibumax');
                rQuery = rQuery + BU.sliderQueryBuilder(self.ebcSlider, 'ebcmin', 'ecbmax');
                rQuery = rQuery + BU.sliderQueryBuilder(self.fermentSlider, 'fermentmin', 'fermentmax');

                if (self.hasAdjuctsQuery() === 'N' || self.hasAdjuctsQuery() === 'Y') {
                    rQuery += 'hasAdjuncts=' + self.hasAdjuctsQuery();
                }

                if (self.recipeName() !== '') {
                    rQuery = rQuery + '&recipeName=' + self.recipeName();
                }

                return rQuery;
            });
            self.error = ko.observableArray();

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
                self.maltQuery.push(37, 34, 69);
            };
            self.addCrystal = function () {
                self.maltQuery.push(27, 28, 29, 46, 73)
            };
            self.addDarkCrystal = function () {
                self.maltQuery.push(32, 68, 83)
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
        },
        EbcColour: function EbcColour() {
            var self = this;
            self.EbcColour = ko.observableArray();
            self.error = ko.observableArray();

            var serviceUri = '/api/ebccolour/';

            function getAllEbcColours() {
                BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
                    ko.mapping.fromJS(data, BEER.Mappings.EbcColourMapping, self.EbcColour);
                });
            }

            // Fetch the initial data.
            getAllEbcColours();
        },
        MyMalts: function MyMalts() {
            var self = this;
            self.malts = ko.observableArray();
            self.error = ko.observableArray();

            self.getMyMalts = function (hasLoaded) {
                var loadedInt = null;
                loadedInt = setInterval(function () {
                    if (hasLoaded() === true) {
                        clearInterval(loadedInt);
                        if (localStorage) {
                            var data = JSON.parse(localStorage.getItem('myMalts'));
                            if (data !== null) {
                                ko.mapping.fromJS(data, {}, self.malts);
                            }
                        }

                    }
                }, 100);

            }
        },
        MyHops: function MyHops() {
            var self = this;
            self.hops = ko.observableArray();
            self.error = ko.observableArray();

            self.getMyHops = function (hasLoaded) {
                var loadedInt = null;
                loadedInt = setInterval(function () {
                    if (hasLoaded() === true) {
                        clearInterval(loadedInt);
                        if (localStorage) {
                            var data = JSON.parse(localStorage.getItem('myHops'));
                            if (data !== null) {
                                ko.mapping.fromJS(data, {}, self.hops);
                            }
                        }
                    }
                }, 100);
            }
        },
        MyYeasts: function MyYeasts() {
            var self = this;
            self.yeasts = ko.observableArray();
            self.error = ko.observableArray();

            self.getMyYeasts = function (hasLoaded) {
                var loadedInt = null;
                loadedInt = setInterval(function () {
                    if (hasLoaded() === true) {
                        clearInterval(loadedInt);
                        if (localStorage) {
                            var data = JSON.parse(localStorage.getItem('myYeasts'));
                            if (data !== null) {
                                ko.mapping.fromJS(data, {}, self.yeasts);
                            }
                        }
                    }
                }, 100);
            }
        },
        BeerStyle: function BeerStyles() {
            var self = this;
            self.BeerStyle = ko.observableArray();
            self.queryLoaded = ko.observable(false);
            self.error = ko.observableArray();

            var serviceUri = '/api/beerstyles/';

            function getAllBeerStyles() {
                BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
                    ko.mapping.fromJS(data, BEER.Mappings.BeerStyleMapping, self.BeerStyle);
                    self.queryLoaded(true);
                });
            }

            // Fetch the initial data.
            getAllBeerStyles();
        },
        Other: function Other() {
            var self = this;
            self.Other = ko.observableArray();
            self.queryLoaded = ko.observable(false);
            self.error = ko.observableArray();

            var serviceUri = '/api/others/';

            function getAllOthers() {
                BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
                    ko.mapping.fromJS(data, BEER.Mappings.OtherMapping, self.Other);
                    self.queryLoaded(true);
                });
            }

            // Fetch the initial data.
            getAllOthers();
        }
    };
    return process
})();

BEER.Models = (function () {
    var process = {
        BasicRecipe: function BasicRecipe(data, parent) {
            var self = this;

            var Source2 = null;
            var Number = null;
            var Name = null;
            var YeastID = null;
            var BeerStylesID = null;
            var ID = null;
            var ABV = null;
            var IBU = null;
            var OG = null;
            var FG = null;
            var EBC = null;
            var HasAdjucts = null;
            var MashTemp = null;
            var MashTime = null;
            var BoilTime = null;
            var BatchSize = null;
            var Fermentation = null;
            var Description = null;
            var Tips = null;

            if (data !== null) {
                Source2 = data[0].source2;
                Number = data[0].number;
                Name = data[0].name;
                YeastID = data[0].yeastID;
                BeerStylesID = data[0].beerStylesID;
                ID = data[0].id;
                ABV = data[0].abv;
                IBU = data[0].ibu;
                OG = data[0].og;
                FG = data[0].fg;
                EBC = data[0].ebc;
                HasAdjucts = data[0].hasAdjucts;
                MashTemp = data[0].mashTemp;
                MashTime = data[0].mashTime;
                Fermentation = data[0].fermentation;
                BoilTime = data[0].boilTime;
                BatchSize = data[0].batchSize;
                Description = data[0].description;
                Tips = data[0].tips;
            }


            self.Source2 = ko.observable(Source2);
            self.Number = ko.observable(Number);
            self.Name = ko.observable(Name);
            self.YeastID = ko.observable(YeastID);
            self.BeerStylesID = ko.observable(BeerStylesID);
            self.ID = ko.observable(ID);
            self.ABV = ko.observable(ABV);
            self.IBU = ko.observable(IBU);
            self.OG = ko.observable(OG);
            self.FG = ko.observable(FG);
            self.EBC = ko.observable(EBC);
            self.HasAdjucts = ko.observable(HasAdjucts);
            self.MashTemp = ko.observable(MashTemp);
            self.MashTime = ko.observable(MashTime);
            self.BoilTime = ko.observable(BoilTime);
            self.BatchSize = ko.observable(BatchSize);
            self.Fermentation = ko.observable(Fermentation);
            self.Description = ko.observable(Description);
            self.Tips = ko.observable(Tips);
            self.Recipe_Malts = ko.observableArray();
            self.Recipe_Hops = ko.observableArray();
            self.Recipe_Others = ko.observableArray();

            if (data !== null) {
                for (var i = 0, iLen = data[0].recipe_Hops.length; i < iLen; i++) {
                    self.Recipe_Hops.push(new BEER.Models.Recipe_Hop(data[0].recipe_Hops[i]));
                }

                for (var i = 0, iLen = data[0].recipe_Malts.length; i < iLen; i++) {
                    self.Recipe_Malts.push(new BEER.Models.Recipe_Malt(data[0].recipe_Malts[i], parent));
                }

                for (var i = 0, iLen = data[0].recipe_Others.length; i < iLen; i++) {
                    self.Recipe_Others.push(new BEER.Models.Recipe_Other(data[0].recipe_Others[i]));
                }
            }
            console.log(BeerStylesID);
        },
        Recipe: function Recipe(data, parent) {
            var self = this;
            self.mq = parent.SearchQuery.maltQuery;
            self.hq = parent.SearchQuery.hopQuery;
            self.yq = parent.SearchQuery.yeastQuery;
            self.ysq = parent.SearchQuery.fullYeastQuery;
            self.formattedABV = ko.pureComputed(function () {
                return self.abv().toFixed(1) + '%';
            }, self);
            self.yeastMatched = ko.pureComputed(function () {
                var isMatched = false;
                for (var i = 0, iLen = self.yq().length; i < iLen; i++) {
                    if (self.yq()[i] === self.yeastID()) {
                        isMatched = true;
                        break;
                    }
                }
                return isMatched;
            }, self);
            self.yeastSubMatched = ko.pureComputed(function () {
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
            self.recipe_Others = ko.observableArray([]);
            self.combinedHopsOther = ko.computed(function () {
                var allBoiled = ko.observableArray([]);
                ko.utils.arrayForEach(self.recipe_Hops(), function (item) {
                    allBoiled.push({
                        aa: item.aa,
                        hopID: item.hopID,
                        hopName: item.hopName,
                        id: item.id,
                        isMatched: item.isMatched,
                        recipeID: item.recipeID,
                        stepName: item.stepName,
                        stepID: item.stepID,
                        stepOrder: item.stepOrder,
                        weight: item.weight
                    });
                });

                ko.utils.arrayForEach(self.recipe_Others(), function (item) {
                    allBoiled.push({
                        aa: ko.observable(0),
                        hopID: item.otherID,
                        hopName: item.otherName,
                        id: item.id,
                        isMatched: ko.observable(false),
                        recipeID: item.recipeID,
                        stepName: item.stepName,
                        stepID: item.stepID,
                        stepOrder: item.stepOrder,
                        weight: item.weight
                    });
                });

                allBoiled.sort(function (a, b) {
                    return a.stepOrder() - b.stepOrder();
                });
                return allBoiled;
            });
            ko.mapping.fromJS(data, BEER.Mappings.hopMaltMapping, self);
            self.totalHopsBill = ko.pureComputed(function () {
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
            self.totalEachHop = ko.pureComputed(function () {
                var hopArray = [];
                var result = [];
                if (self.recipe_Hops() !== null) {
                    result = self.recipe_Hops.slice(0);

                    result.reduce(function (res, value, ss, xx) {
                        if (!res[value.hopName()]) {
                            //create hop object if it doesn't exsist, so we can access the weight by hopNamr
                            res[value.hopName()] = {
                                weight: 0,
                                hopName: value.hopName(),
                                isMatched: value.isMatched()
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
            self.colorHex = ko.pureComputed(function () {
                var hex = "";
                if (self.ebc() >= BEER.utils.ebcHexMax) {
                    hex = "#000000";
                } else {

                    var match = ko.utils.arrayFirst(parent.ebcColours.EbcColour(), function (item) {
                        return item.ebc() == self.ebc();
                    });

                    if (match === null) {
                        match = ko.utils.arrayFirst(parent.ebcColours.EbcColour(), function (item) {
                        return item.ebc() == self.ebc() + 1;
                    });
                    }

                    if (match !== null) {
                        hex = match.hex();
                    }
                }
                return hex;
            }, self);
            self.ebcTop = ko.pureComputed(function () {
                return BEER.utils.calculateTop(BEER.utils.beerStyle.ebc.max, self.ebc(), BEER.utils.beerStyle.ebcRange());
            }, self);
            self.fgTop = ko.pureComputed(function () {
                return BEER.utils.calculateTop(BEER.utils.beerStyle.gravity.max, self.fgDecimal(), BEER.utils.beerStyle.gravityRange());
            }, self);
            self.ogTop = ko.pureComputed(function () {
                return BEER.utils.calculateTop(BEER.utils.beerStyle.gravity.max, self.ogDecimal(), BEER.utils.beerStyle.gravityRange())
            }, self);
            self.ibuTop = ko.pureComputed(function () {
                return BEER.utils.calculateTop(BEER.utils.beerStyle.ibu.max, self.ibu(), BEER.utils.beerStyle.ibuRange())
            }, self);
            self.abvTop = ko.pureComputed(function () {
                return BEER.utils.calculateTop(BEER.utils.beerStyle.abv.max, self.abv(), BEER.utils.beerStyle.abvRange())
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
        Recipe_Malt: function Recipe_Malt(data, parent) {
            var self = this;
            var ID = null;
            var RecipeID = null;
            var Weight = null;
            var MaltGenericID = null;

            if (data !== null) {
                ID = data.id;
                RecipeID = data.recipeID;
                Weight = data.weight;
                MaltGenericID = data.maltGenericID;
            }

            self.ID = ko.observable(ID);
            self.RecipeID = ko.observable(RecipeID);
            self.Weight = ko.observable(Weight);
            self.MaltGenericID = ko.observable(MaltGenericID);
            self.MaltID = ko.computed(function () {
                var allMalts = parent.Malts.Malt();
                var defaultMalt = 0;
                for (var i = 0, iLen = allMalts.length; i < iLen; i++) {
                    if (allMalts[i].id() === self.MaltGenericID()) {
                        defaultMalt = allMalts[i].defaultMalt();
                    }
                }
                return defaultMalt;
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
        Recipe_Hop: function Recipe_Hop(data) {
            var self = this;
            var ID = null;
            var RecipeID = null;
            var Weight = null;
            var HopID = null;
            var StepID = null;
            var HopTypeID = null;
 
            if (data !== null) {
                ID = data.id;
                RecipeID = data.recipeID;
                Weight = data.weight;
                HopID = data.hopID;
                StepID = data.stepID;
            }

            self.ID = ko.observable(ID);
            self.RecipeID = ko.observable(RecipeID);
            self.Weight = ko.observable(Weight);
            self.HopID = ko.observable(HopID);
            self.StepID = ko.observable(StepID);
            self.HopTypeID = ko.observable(1);

        },
        Hop_Step: function Hop_Step(data) {
            var self = this;
            ko.mapping.fromJS(data, {}, self);
        },
        Other: function Other(data, parent) {
            var self = this;
            ko.mapping.fromJS(data, {}, self);
        },
        Recipe_Other: function Recipe_Other(data) {
            var self = this;
            var ID = null;
            var RecipeID = null;
            var Weight = null;
            var OtherID = null;
            var StepID = null;

            if (data !== null) {
                ID = data.id;
                RecipeID = data.recipeID;
                Weight = data.weight;
                OtherID = data.otherID;
                StepID = data.stepID;
            }

            self.ID = ko.observable(ID);
            self.RecipeID = ko.observable(RecipeID);
            self.Weight = ko.observable(Weight);
            self.OtherID = ko.observable(OtherID);
            self.StepID = ko.observable(StepID);
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
        },
        EbcColour: function (data) {
            var self = this;
            ko.mapping.fromJS(data, {}, self);
        },
        BeerStyle: function (data, parent) {
            var self = this;
            ko.mapping.fromJS(data, {}, self);
            self.ebcLow = ko.pureComputed(function () {
                return self.srmLow() * BEER.utils.srmConvert;
            }, self);
            self.ebcHigh = ko.pureComputed(function () {
                return self.srmHigh() * BEER.utils.srmConvert;
            }, self);
            self.ebcTop = ko.pureComputed(function () {
                return BEER.utils.calculateTop(BEER.utils.beerStyle.ebc.max, self.ebcHigh(), BEER.utils.beerStyle.ebcRange());
            }, self);
            self.ebcHeight = ko.pureComputed(function () {
                return BEER.utils.calculateHeight(self.ebcHigh(), self.ebcLow(), BEER.utils.beerStyle.ebcRange());
            }, self);
            self.fgTop = ko.pureComputed(function () {
                return BEER.utils.calculateTop(BEER.utils.beerStyle.gravity.max, self.fgHigh(), BEER.utils.beerStyle.gravityRange());
            }, self);
            self.fgHeight = ko.pureComputed(function () {
                return BEER.utils.calculateHeight(self.fgHigh(), self.fgLow(), BEER.utils.beerStyle.gravityRange());
            }, self);
            self.ogTop = ko.pureComputed(function () {
                return BEER.utils.calculateTop(BEER.utils.beerStyle.gravity.max, self.ogHigh(), BEER.utils.beerStyle.gravityRange())
            }, self);
            self.ogHeight = ko.pureComputed(function () {
                return BEER.utils.calculateHeight(self.ogHigh(), self.ogLow(), BEER.utils.beerStyle.gravityRange());
            }, self);
            self.ibuTop = ko.pureComputed(function () {
                return BEER.utils.calculateTop(BEER.utils.beerStyle.ibu.max, self.ibuHigh(), BEER.utils.beerStyle.ibuRange())
            }, self);
            self.ibuHeight = ko.pureComputed(function () {
                return BEER.utils.calculateHeight(self.ibuHigh(), self.ibuLow(), BEER.utils.beerStyle.ibuRange());
            }, self);
            self.abvTop = ko.pureComputed(function () {
                return BEER.utils.calculateTop(BEER.utils.beerStyle.abv.max, self.abvHigh(), BEER.utils.beerStyle.abvRange())
            }, self);
            self.abvHeight = ko.pureComputed(function () {
                return BEER.utils.calculateHeight(self.abvHigh(), self.abvLow(), BEER.utils.beerStyle.abvRange());
             }, self);

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
            },
            'recipe_Others': {
                create: function (options) {
                    return new BEER.Models.Other(options.data, options.parent);
                }
            },
            'beerStyles': {
                create: function (options) {
                    return new BEER.Models.BeerStyle(options.data, options.parent);
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
        hopStepMaping: {
             create: function (options) {
                 return new BEER.Models.Hop_Step(options.data);
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
        },
        EbcColourMaping: {
            create: function (options) {
                return new BEER.Models.EbcColour(options.data);
            }

        },
        BeerStyleMapping: {
            create: function (options) {
                return new BEER.Models.BeerStyle(options.data);
            }
        },
        OtherMapping: {
            create: function (options) {
                return new BEER.Models.Other(options.data);
            }
        },
        EditRecipe: {
            create: function (options) {
                return new BEER.Models.BasicRecipeFilled(options.data);
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
        var params = valueAccessor();
        $(element).select2({
            closeOnSelect: params.closeOnSelect
        });
    },
    update: function (element, valueAccessor, allBindingsAccesor, viewModel, bindingContext) {
        var params = valueAccessor();
        selection = params.selection();
        var select2 = $(element).data("select2");
        $(element).val(selection).trigger('change');
    }
}

ko.bindingHandlers.uniqueId = {
    init: function(element, valueAccessor) {
        var value = valueAccessor();
        value.id = value.id || ko.bindingHandlers.uniqueId.prefix + (++ko.bindingHandlers.uniqueId.counter);

        element.id = value.id;
    },
    counter: 0,
    prefix: "unique"
};

ko.bindingHandlers.uniqueFor = {
    init: function(element, valueAccessor) {
        var value = valueAccessor();
        value.id = value.id || ko.bindingHandlers.uniqueId.prefix + (++ko.bindingHandlers.uniqueId.counter);
        
        element.setAttribute("for", value.id);
    } 
};

jQuery(document).ready(function($) {
    var docBody = $(document.body);
    var shiftPressed = false;
    var clickedOutside = false;
    //var keyPressed = 0;

    docBody.on('keydown', function(e) {
        var keyCaptured = (e.keyCode ? e.keyCode : e.which);
        //shiftPressed = keyCaptured == 16 ? true : false;
        if (keyCaptured == 16) { shiftPressed = true; }
    });
    docBody.on('keyup', function(e) {
        var keyCaptured = (e.keyCode ? e.keyCode : e.which);
        //shiftPressed = keyCaptured == 16 ? true : false;
        if (keyCaptured == 16) { shiftPressed = false; }
    });

    docBody.on('mousedown', function(e){
        // remove other focused references
        clickedOutside = false;
        // record focus
        if ($(e.target).is('[class*="select2"]')!=true) {
            clickedOutside = true;
        }
    });

    docBody.on('select2:opening', function(e) {
        // this element has focus, remove other flags
        clickedOutside = false;
        // flag this Select2 as open
        $(e.target).attr('data-s2open', 1);
    });
    docBody.on('select2:closing', function(e) {
        // remove flag as Select2 is now closed
        $(e.target).removeAttr('data-s2open');
    });

    docBody.on('select2:close', function(e) {
        var elSelect = $(e.target);
        elSelect.removeAttr('data-s2open');
        var currentForm = elSelect.closest('form');
        var othersOpen = currentForm.has('[data-s2open]').length;
        if (othersOpen == 0 && clickedOutside==false) {
            /* Find all inputs on the current form that would normally not be focus`able:
             *  - includes hidden <select> elements whose parents are visible (Select2)
             *  - EXCLUDES hidden <input>, hidden <button>, and hidden <textarea> elements
             *  - EXCLUDES disabled inputs
             *  - EXCLUDES read-only inputs
             */
            var inputs = currentForm.find(':input:enabled:not([readonly], input:hidden, button:hidden, textarea:hidden)')
                .not(function () {   // do not include inputs with hidden parents
                    return $(this).parent().is(':hidden');
                });
            var elFocus = null;
            $.each(inputs, function (index) {
                var elInput = $(this);
                if (elInput.attr('id') == elSelect.attr('id')) {
                    if ( shiftPressed) { // Shift+Tab
                        elFocus = inputs.eq(index - 1);
                    } else {
                        elFocus = inputs.eq(index + 1);
                    }
                    return false;
                }
            });
            if (elFocus !== null) {
                // automatically move focus to the next field on the form
                var isSelect2 = elFocus.siblings('.select2').length > 0;
                if (isSelect2) {
                    elFocus.select2('open');
                } else {
                    elFocus.focus();
                }
            }
        }
    });

    docBody.on('focus', '.select2', function(e) {
        var elSelect = $(this).prev('select');
       if (elSelect.is('[disabled]')==false && elSelect.is('[data-s2open]')==false
           && $(this).has('.select2-selection--single').length>0) {
           elSelect.attr('data-s2open', 1);
           elSelect.select2('open');
       }
    });

});






