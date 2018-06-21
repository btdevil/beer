﻿BEER.MasterViewModel = function (data) {
    var self = this;
    self.newRecipe = ko.observable(new BEER.Models.BasicRecipe(null, self));
    self.Yeasts = new BEER.ViewModels.Yeast();
    self.Malts = new BEER.ViewModels.Malt();
    self.Hops = new BEER.ViewModels.Hop();
    self.Others = new BEER.ViewModels.Other();
    self.BeerStyle = new BEER.ViewModels.BeerStyle();
    self.HopSteps = new BEER.ViewModels.HopStep();
    self.recipeHops = ko.observableArray();
    self.recipeMalts = ko.observableArray();
    self.error = ko.observableArray();
    self.isEdit = ko.observable(false);
    self.queryLoaded = false;
    self.Test = ko.observable();
    self.selectedRecipe = selectedRecipe;

    self.newRecipe().Recipe_Hops.push(new BEER.Models.Recipe_Hop(null));
    self.newRecipe().Recipe_Malts.push(new BEER.Models.Recipe_Malt(null, self));
    self.newRecipe().Recipe_Others.push(new BEER.Models.Recipe_Other(null));

    self.addEditRecipe = function (formElement) {

        console.log(formElement);

        var newRec = ko.toJS(ko.utils.unwrapObservable(self.newRecipe));

        var serviceUri = '/api/recipes/';

        if (self.isEdit) {

            BEER.utils.ajaxHelper(serviceUri + self.selectedRecipe, 'PUT', newRec, self).done(function (data) {
                console.log('yay')
            });

        } else {

            BEER.utils.ajaxHelper(serviceUri, 'POST', newRec, self).done(function (data) {
                console.log('yay')
            });
        }

        console.log(newRec);


    }

    self.addHop = function () {
        self.newRecipe().Recipe_Hops.push(new BEER.Models.Recipe_Hop({recipeID: parseInt(self.selectedRecipe, 10), weight:null, hopID :null, stepID:null, ID:0}, self));
    }

    self.deleteHop = function (hop) {
        self.newRecipe().Recipe_Hops.remove(hop);
    }

    self.addMalt = function () {
        self.newRecipe().Recipe_Malts.push(new BEER.Models.Recipe_Malt({recipeID: parseInt(self.selectedRecipe, 10), weight:null, maltGenericID :null}, self));
    }

    self.deleteMalt = function (malt) {
        self.newRecipe().Recipe_Malts.remove(malt);
    }

    self.addOther = function () {
        self.newRecipe().Recipe_Others.push(new BEER.Models.Recipe_Other({recipeID: parseInt(self.selectedRecipe, 10), weight:null, stepID :null, otherID: null}, self));
    }

    self.deleteOther = function (other) {
        self.newRecipe().Recipe_Others.remove(other);
    }

    self.test = function () {
        console.log(self.newRecipe());
    }

    function areListsLoaded() {
        var areLoaded = false;

        if (self.Yeasts.queryLoaded() === true && self.Malts.queryLoaded() === true && self.Hops.queryLoaded() === true && self.Others.queryLoaded() === true && self.BeerStyle.queryLoaded() === true && self.HopSteps.queryLoaded() === true) {
            areLoaded = true;
        }

        return areLoaded;
    }

    function recipeEditor() {
        var listsLoadedInt = null;
        if (self.selectedRecipe !== null) {
            self.isEdit(true);
            var serviceUri = '/api/recipes/'+ self.selectedRecipe;

            listsLoadedInt = setInterval(function () { 

                

                if (areListsLoaded() === true) {
                    clearInterval(listsLoadedInt);
                    BEER.utils.ajaxHelper(serviceUri, 'GET', null, self).done(function (data) {
                        self.newRecipe(new BEER.Models.BasicRecipe(data, self));
                        console.log(data);
                    });
                }
                },
             30);
        }
    }

    recipeEditor();
};

$.fn.select2.defaults.set( "theme", "bootstrap" );

ko.applyBindings(new BEER.MasterViewModel());