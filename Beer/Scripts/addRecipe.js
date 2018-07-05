BEER.MasterViewModel = function (data) {
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

        validateAndFixModel();

        var newRec = ko.toJS(ko.utils.unwrapObservable(self.newRecipe));

        var serviceUri = '/api/recipes/';

        if (self.isEdit()) {

            BEER.utils.ajaxHelper(serviceUri + self.selectedRecipe, 'PUT', newRec, self).done(function (data) {
                console.log('yay');
                var toastElem = $('<div class="alert alert-success toast" role="alert">Recipe saved</div>');
        $('body').append(toastElem);
        BEER.utils.toast(toastElem);
            });

        } else {

            BEER.utils.ajaxHelper(serviceUri, 'POST', newRec, self).done(function (data) {
                console.log('yay');
                var toastElem = $('<div class="alert alert-success toast" role="alert">Recipe saved</div>');
        $('body').append(toastElem);
        BEER.utils.toast(toastElem);
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
        self.newRecipe().Recipe_Malts.push(new BEER.Models.Recipe_Malt({recipeID: parseInt(self.selectedRecipe, 10), weight:null, maltGenericID :null, ID:0}, self));
    }

    self.deleteMalt = function (malt) {
        self.newRecipe().Recipe_Malts.remove(malt);
    }

    self.addOther = function () {
        self.newRecipe().Recipe_Others.push(new BEER.Models.Recipe_Other({recipeID: parseInt(self.selectedRecipe, 10), weight:null, stepID :null, otherID: null, ID:0}, self));
    }

    self.deleteOther = function (other) {
        self.newRecipe().Recipe_Others.remove(other);
    }

    self.test = function () {
        var toastElem = $('<div class="alert alert-success toast" role="alert">Recipe saved</div>');
        $('body').append(toastElem);
        BEER.utils.toast(toastElem);
    }

    self.scale = function () {

        BEER.utils.scale(self.newRecipe(), parseInt($('#scale').val(),10));

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
        if (self.selectedRecipe !== null && self.selectedRecipe !== '') {
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

    function validateAndFixModel() {
 

        if (self.newRecipe().ID() === null || typeof self.newRecipe().ID() === 'undefined') {
            self.newRecipe().ID(0);
        }

        for (var i = 0, iLen = self.newRecipe().Recipe_Hops().length; i < iLen; i++) {

            if (self.newRecipe().Recipe_Hops()[i].RecipeID() === null|| typeof self.newRecipe().Recipe_Hops()[i].RecipeID() === 'undefined' || isNaN(self.newRecipe().Recipe_Hops()[i].RecipeID())) {
                self.newRecipe().Recipe_Hops()[i].RecipeID(0);
            }

            if (self.newRecipe().Recipe_Hops()[i].ID() === null|| typeof self.newRecipe().Recipe_Hops()[i].ID() === 'undefined' || isNaN(self.newRecipe().Recipe_Hops()[i].ID())) {
                self.newRecipe().Recipe_Hops()[i].ID(0);
            }

            if (self.newRecipe().Recipe_Hops()[i].HopID() === null || typeof self.newRecipe().Recipe_Hops()[i].HopID() === 'undefined') {

                self.newRecipe().Recipe_Hops.remove(self.newRecipe().Recipe_Hops()[i]);
            }
        }

        for (var i = 0, iLen = self.newRecipe().Recipe_Malts().length; i < iLen; i++) {
            if (self.newRecipe().Recipe_Malts()[i].RecipeID() === null || typeof self.newRecipe().Recipe_Malts()[i].RecipeID() === 'undefined' || isNaN(self.newRecipe().Recipe_Malts()[i].RecipeID())) {
                self.newRecipe().Recipe_Malts()[i].RecipeID(0);
            }

            if (self.newRecipe().Recipe_Malts()[i].ID() === null|| typeof self.newRecipe().Recipe_Malts()[i].ID() === 'undefined' || isNaN(self.newRecipe().Recipe_Malts()[i].ID())) {
                self.newRecipe().Recipe_Malts()[i].ID(0);
            }

            if (self.newRecipe().Recipe_Malts()[i].MaltGenericID() === null || typeof self.newRecipe().Recipe_Malts()[i].MaltGenericID() === 'undefined') {

                self.newRecipe().Recipe_Malts.remove(self.newRecipe().Recipe_Malts()[i]);
            }

        }

        for (var i = 0, iLen = self.newRecipe().Recipe_Others().length; i < iLen; i++) {
            if (self.newRecipe().Recipe_Others()[i].RecipeID() === null|| typeof self.newRecipe().Recipe_Others()[i].RecipeID() === 'undefined' || isNaN(self.newRecipe().Recipe_Others()[i].RecipeID())) {
                self.newRecipe().Recipe_Others()[i].RecipeID(0);
            }

            if (self.newRecipe().Recipe_Others()[i].ID() === null|| typeof self.newRecipe().Recipe_Others()[i].ID() === 'undefined' || isNaN(self.newRecipe().Recipe_Others()[i].ID())) {
                self.newRecipe().Recipe_Others()[i].ID(0);
            }
            if (self.newRecipe().Recipe_Others()[i].OtherID() === null || typeof self.newRecipe().Recipe_Others()[i].OtherID() === 'undefined') {

                self.newRecipe().Recipe_Others.remove(self.newRecipe().Recipe_Others()[i]);
            }
        }

      
    }

    recipeEditor();
};

$.fn.select2.defaults.set( "theme", "bootstrap" );

ko.applyBindings(new BEER.MasterViewModel());