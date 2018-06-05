BEER.MasterViewModel = function (data) {
    var self = this;
    self.newRecipe = new BEER.Models.BasicRecipe();
    self.Yeasts = new BEER.ViewModels.Yeast();
    self.Malts = new BEER.ViewModels.Malt();
    self.Hops = new BEER.ViewModels.Hop();
    self.Others = new BEER.ViewModels.Other();
    self.BeerStyle = new BEER.ViewModels.BeerStyle();
    self.HopSteps = new BEER.ViewModels.HopStep();
    self.recipeHops = ko.observableArray();
    self.recipeMalts = ko.observableArray();

    //self.recipeHops.push(new BEER.Models.Recipe_Hop());

    self.addRecipe = function (formElement) {

        console.log(formElement);

        //var newRec = {
        //    Name: self.newRecipe.Name()
        //}

        var newRec = ko.toJS(ko.utils.unwrapObservable(self.newRecipe));

        console.log(newRec);


    }

    self.addHop = function () {
        self.newRecipe.Recipe_Hops.push(new BEER.Models.Recipe_Hop());
    }

    self.addMalt = function () {
        self.newRecipe.Recipe_Malts.push(new BEER.Models.Recipe_Malt(null, self));
    }

     self.addOther = function () {
        self.newRecipe.Recipe_Others.push(new BEER.Models.Recipe_Other(null, self));
    }
};

ko.applyBindings(new BEER.MasterViewModel());