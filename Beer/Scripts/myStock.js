BEER.MyStockMasterViewModel = function (data) {
    var self = this;
    self.Yeasts = new BEER.ViewModels.Yeast();
    self.Malts = new BEER.ViewModels.Malt();
    self.Hops = new BEER.ViewModels.Hop();

    self.myMalts = new BEER.ViewModels.MyMalts();
    self.myHops = new BEER.ViewModels.MyHops();
    self.myYeasts = new BEER.ViewModels.MyYeasts();

    self.updateStock = function () {
        if (localStorage) {
            localStorage.setItem('myMalts', JSON.stringify(self.myMalts.malts()));
            localStorage.setItem('myHops', JSON.stringify(self.myHops.hops()));
            localStorage.setItem('myYeasts', JSON.stringify(self.myYeasts.yeasts()));
        }
    }

    self.myMalts.getMyMalts(self.Malts.queryLoaded);
    self.myHops.getMyHops(self.Hops.queryLoaded);
    self.myYeasts.getMyYeasts(self.Yeasts.queryLoaded);




    console.log('hello')
}

ko.applyBindings(new BEER.MyStockMasterViewModel());